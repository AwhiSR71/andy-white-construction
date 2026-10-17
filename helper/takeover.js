'use strict';
(function(){
const tasks=ClientConfig.tasks;
document.getElementById('preparationNote').textContent='Preparation snapshot: '+new Date(ClientConfig.preparedAt).toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})+'. The account, domain and payment statements below describe the preparation snapshot. They are not live provider status; check actual replies, accounts and receipts for changes.';
const storageKey=ClientConfig.reminderStorageKey;let notes={};let canRemember=true;
try{notes=JSON.parse(localStorage.getItem(storageKey)||'{}');if(!notes||typeof notes!=='object'||Array.isArray(notes))notes={};}catch(_){notes={};canRemember=false;}
const parent=document.getElementById('takeoverTasks');
function emailUrl(email,body){return 'mailto:'+email.to+'?'+(email.cc?'cc='+encodeURIComponent(email.cc)+'&':'')+'subject='+encodeURIComponent(email.subject)+'&body='+encodeURIComponent(body);}
function makeLink(text,url){const link=document.createElement('a');link.textContent=text;link.href=url;link.className='button secondary';link.target='_blank';link.rel='noopener noreferrer';return link;}
async function copyText(field){try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('select');await navigator.clipboard.writeText(field.value);document.getElementById('takeoverStatus').textContent='Message copied. Paste it into your email, check the address and press Send.';}catch(_){field.focus();field.select();field.setSelectionRange(0,field.value.length);document.getElementById('takeoverStatus').textContent='The message is selected. Choose Copy, then paste it into your email.';}}
tasks.forEach((task,index)=>{
 const detail=document.createElement('details');detail.className='task';detail.open=index===0;
 const summary=document.createElement('summary');summary.textContent=task.title;detail.append(summary);
 const content=document.createElement('div');content.className='task-content';const paragraph=document.createElement('p');paragraph.textContent=task.body;content.append(paragraph);
 if(task.email){
 const field=document.createElement('textarea');field.id='draft-'+task.id;field.value=task.email.body;field.setAttribute('aria-label','Message to '+task.email.to);field.rows=8;
 const recipient=document.createElement('p');recipient.textContent='To: '+task.email.to+(task.email.cc?' · Cc: '+task.email.cc:'');recipient.className='quiet';content.append(recipient,field);
 const actions=document.createElement('div');actions.className='actions';const email=makeLink('Open email draft',emailUrl(task.email,task.email.body));email.removeAttribute('target');email.className='button primary';email.addEventListener('click',()=>{email.href=emailUrl(task.email,field.value);document.getElementById('takeoverStatus').textContent='If an email draft did not open, copy the message and paste it into your usual email app. Nothing has been sent by this helper.';});
 const copy=document.createElement('button');copy.className='secondary';copy.textContent='Copy this message';copy.addEventListener('click',()=>copyText(field));actions.append(email,copy);content.append(actions);
 }
 if(task.links){const links=document.createElement('div');links.className='actions';task.links.forEach(([text,url])=>links.append(makeLink(text,url)));content.append(links);}
 const extra=document.createElement('p');extra.className='quiet';extra.textContent=task.extra;content.append(extra);
 const label=document.createElement('label');label.className='check-note';const check=document.createElement('input');check.type='checkbox';check.checked=notes[task.id]===true;const words=document.createElement('span');words.textContent='I have done my part for this step';label.append(check,words);content.append(label);
 const note=document.createElement('p');note.className='record-note';note.textContent=canRemember?'Your own reminder only. Saved in this browser; not checked with any provider.':'Your own reminder only. This browser cannot save it after closing.';content.append(note);
 check.addEventListener('change',()=>{notes[task.id]=check.checked;try{localStorage.setItem(storageKey,JSON.stringify(notes));}catch(_){note.textContent='Your reminder is checked here, but this browser could not save it after closing.';}});
 const next=document.createElement('button');next.className='primary';next.textContent=index===tasks.length-1?'Get photos ready':'Next step';next.addEventListener('click',()=>{if(index===tasks.length-1){document.getElementById('openPhotos').click();return;}detail.open=false;const nextDetail=parent.children[index+1];nextDetail.open=true;nextDetail.querySelector('summary').focus();nextDetail.scrollIntoView({block:'start'});});content.append(next);detail.append(content);parent.append(detail);
});
document.getElementById('startHere').addEventListener('click',()=>{const first=parent.children[0];first.open=true;first.querySelector('summary').focus();first.scrollIntoView({block:'start'});});
document.getElementById('openPhotos').addEventListener('click',()=>{document.getElementById('takeover').hidden=true;document.getElementById('photoHelper').hidden=false;document.getElementById('heading1').focus();});
document.getElementById('backHome').addEventListener('click',()=>{document.getElementById('photoHelper').hidden=true;document.getElementById('takeover').hidden=false;document.getElementById('openPhotos').focus();});
})();
