'use strict';
(function(root){
const scriptUrl=document.currentScript.src;
async function isHeic(file){const header=new Uint8Array(await file.slice(0,12).arrayBuffer());if(header.length<12)return false;const text=String.fromCharCode(...header);return text.slice(4,8)==='ftyp'&&['mif1','msf1','heic','heix','hevc','hevx'].includes(text.slice(8,12));}
async function decode(file){
 const buffer=await file.arrayBuffer();
 return new Promise((resolve,reject)=>{
  let worker;let timer;
  const finish=(error,data)=>{clearTimeout(timer);if(worker)worker.terminate();if(error)reject(error);else resolve(data);};
  try{worker=new Worker(new URL('vendor/heic-worker-1.5.2.js',scriptUrl));}
  catch(_){finish(new Error('The iPhone photo reader could not start. Please keep this page open and try again.'));return;}
  timer=setTimeout(()=>finish(new Error('This iPhone photo took too long to open. Your other photos are still here.')),45000);
  worker.onmessage=event=>{if(event.data.id!=='photo')return;if(event.data.error)finish(new Error(String(event.data.error)));else finish(null,event.data.imageData);};
  worker.onerror=()=>finish(new Error('This iPhone photo could not be read. Your other photos are still here.'));
  worker.postMessage({id:'photo',buffer},[buffer]);
 });
}
root.PhotoHeic={isHeic,decode};
})(globalThis);
