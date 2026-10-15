'use strict';
(function(){
const $=id=>document.getElementById(id);
document.title='Your website helper | '+ClientConfig.client.companyName;
$('clientBrand').textContent=ClientConfig.client.companyName;
document.querySelectorAll('[data-client-link]').forEach(link=>{link.href=ClientConfig.client[link.dataset.clientLink];});
const state={photos:[],busy:false,step:1,nextId:1,skipWords:false,lastAutoCaption:''};
const status=(text,error=false)=>{$('status').textContent=text;$('status').classList.toggle('error',error);};
function showStep(number){state.step=number;[1,2,3].forEach(n=>{$('step'+n).hidden=n!==number;if(n===number)$('progress'+n).setAttribute('aria-current','step');else $('progress'+n).removeAttribute('aria-current');});$('heading'+number).focus();status('');}
function lock(busy){state.busy=busy;$('photos').disabled=busy;$('toWords').disabled=busy||!state.photos.length;}
function makeImage(blob){return new Promise((resolve,reject)=>{const url=URL.createObjectURL(blob);const image=new Image();image.onload=()=>{URL.revokeObjectURL(url);resolve(image);};image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('This photo could not be opened. Try a JPEG or PNG copy, or choose a different photo.'));};image.src=url;});}
function asBlob(canvas){return new Promise((resolve,reject)=>{canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not prepare this photo. Please try a different photo.')),'image/jpeg',0.87);});}
async function prepare(file){
 if(file.size>50*1024*1024)throw new Error('This photo is too large to open safely here. Please choose a smaller copy.');
 const image=await makeImage(file);const size=PhotoLogic.fitImage(image.naturalWidth,image.naturalHeight);
 const canvas=document.createElement('canvas');canvas.width=size.width;canvas.height=size.height;
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Photo editing is not available in this browser. Please try Safari, Edge or Chrome.');
 ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
 const blob=await asBlob(canvas);return {id:state.nextId++,canvas,blob,url:URL.createObjectURL(blob)};
}
function imageCard(photo,index,ready){
 const card=document.createElement('article');card.className='photo-card';
 const image=document.createElement('img');image.src=photo.url;image.alt='Your chosen job photo '+(index+1);image.width=photo.canvas.width;image.height=photo.canvas.height;card.append(image);
 const info=document.createElement('p');info.textContent='Photo '+(index+1)+(ready?' · JPEG copy':'');card.append(info);
 const actions=document.createElement('div');actions.className='photo-actions';
 if(ready){
 const save=document.createElement('a');save.className='button secondary';save.textContent='Save photo '+(index+1);save.href=photo.url;save.download=PhotoLogic.outputName(index);save.addEventListener('click',()=>status('If your browser opens the photo instead of saving it, use its Share or Save option. On iPhone you can also touch and hold the open photo.'));
 const open=document.createElement('a');open.className='button secondary';open.textContent='Open photo';open.href=photo.url;open.target='_blank';open.rel='noopener';actions.append(save,open);
 }else{
 const rotate=document.createElement('button');rotate.className='secondary';rotate.textContent='Rotate';rotate.setAttribute('aria-label','Rotate photo '+(index+1)+' right');rotate.disabled=state.busy;rotate.addEventListener('click',()=>rotatePhoto(photo.id));
 const remove=document.createElement('button');remove.className='secondary';remove.textContent='Remove';remove.setAttribute('aria-label','Remove photo '+(index+1));remove.disabled=state.busy;remove.addEventListener('click',()=>{const found=state.photos.find(p=>p.id===photo.id);if(found)URL.revokeObjectURL(found.url);state.photos=state.photos.filter(p=>p.id!==photo.id);render();status('Photo removed from this helper. Your original is unchanged.');});actions.append(rotate,remove);
 }
 card.append(actions);return card;
}
function render(){
 $('photoList').replaceChildren(...state.photos.map((p,i)=>imageCard(p,i,false)));
 $('readyPhotos').replaceChildren(...state.photos.map((p,i)=>imageCard(p,i,true)));
 $('photoCount').textContent=state.photos.length?state.photos.length+' of 6 photos chosen.':'No photos chosen yet.';
 $('toWords').disabled=state.busy||!state.photos.length;
 const files=state.photos.map((p,i)=>new File([p.blob],PhotoLogic.outputName(i),{type:'image/jpeg'}));
 let canShare=false;try{canShare=!!(navigator.canShare&&navigator.canShare({files}));}catch(_){}
 $('sharePhotos').hidden=!canShare;
}
async function rotatePhoto(id){if(state.busy)return;lock(true);const photo=state.photos.find(p=>p.id===id);if(!photo){lock(false);return;}
 try{const canvas=document.createElement('canvas');canvas.width=photo.canvas.height;canvas.height=photo.canvas.width;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Rotation is not available here.');ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate(Math.PI/2);ctx.drawImage(photo.canvas,-photo.canvas.width/2,-photo.canvas.height/2);const blob=await asBlob(canvas);URL.revokeObjectURL(photo.url);photo.canvas=canvas;photo.blob=blob;photo.url=URL.createObjectURL(blob);status('Photo turned right.');}catch(error){status(error.message,true);}finally{lock(false);render();}}
$('photos').addEventListener('change',async event=>{if(state.busy)return;const selected=Array.from(event.target.files||[]);if(!selected.length)return;const room=6-state.photos.length;if(room<=0){status('You already have 6 photos. Remove one before adding another.',true);event.target.value='';return;}lock(true);render();let added=0;const errors=[];try{for(const file of selected.slice(0,room)){status('Preparing photo '+(added+1)+' of '+Math.min(selected.length,room)+'…');try{state.photos.push(await prepare(file));added++;}catch(error){errors.push(file.name+': '+error.message);}}}finally{lock(false);render();event.target.value='';status((added?added+' photo'+(added===1?'':'s')+' ready. ':'')+(selected.length>room?'Only the first '+room+' selected photos fit. ':'')+errors.join('\n'),errors.length>0);}});
$('toWords').addEventListener('click',()=>{if(state.photos.length&&!state.busy)showStep(2);});
$('backPhotos').addEventListener('click',()=>showStep(1));
function ready(skip){state.skipWords=skip;$('captionArea').hidden=skip;if(!skip){const fresh=PhotoLogic.buildCaption($('job').value,$('town').value,$('note').value);if(!$('caption').value||$('caption').value===state.lastAutoCaption)$('caption').value=fresh;state.lastAutoCaption=fresh;}render();showStep(3);}
$('toReady').addEventListener('click',()=>ready(false));$('skipWords').addEventListener('click',()=>ready(true));$('backWords').addEventListener('click',()=>showStep(2));
$('copyCaption').addEventListener('click',async()=>{const field=$('caption');try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('Use selection');await navigator.clipboard.writeText(field.value);status('Words copied. Paste them into your post.');}catch(_){field.focus();field.select();field.setSelectionRange(0,field.value.length);status('The words are selected. Choose Copy from your phone or computer’s menu.');}});
$('sharePhotos').addEventListener('click',async()=>{const files=state.photos.map((p,i)=>new File([p.blob],PhotoLogic.outputName(i),{type:'image/jpeg'}));try{await navigator.share({files});status('The share menu closed. Check the app or saved photos yourself; this helper cannot confirm that a post was published.');}catch(error){status(error.name==='AbortError'?'Sharing cancelled. Your prepared photos are still here.':'Sharing is not available right now. Use Save photo below instead.',error.name!=='AbortError');}});
$('startAgain').addEventListener('click',()=>{if(!window.confirm('Start another job? Save these copies first if you want to keep them. Your original photos are unchanged.'))return;state.photos.forEach(p=>URL.revokeObjectURL(p.url));state.photos=[];$('note').value='';$('town').value='';$('caption').value='';state.lastAutoCaption='';$('job').value='other';render();showStep(1);});
window.addEventListener('beforeunload',event=>{if(state.photos.length){event.preventDefault();event.returnValue='';}});
render();
})();
