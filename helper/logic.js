(function(root){
'use strict';
const client=(typeof module==='object'&&module.exports?require('./client-config.js'):root.ClientConfig).client;
const JOBS = { bathroom:'Bathroom work', kitchen:'Kitchen work', deck:'Deck work', dock:'Dock work', fence:'Fence work', repair:'Home repair', other:'A look at our work' };
function fitImage(width,height,max=1600){
 if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0||!Number.isFinite(max)||max<1) throw new Error('Invalid image size');
 const scale=Math.min(1,max/Math.max(width,height));
 return {width:Math.max(1,Math.round(width*scale)),height:Math.max(1,Math.round(height*scale))};
}
function clean(value,max){return String(value||'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max);}
function buildCaption(job,town,note){
 const heading=JOBS[job]||JOBS.other;
 const place=clean(town,70); const detail=clean(note,350);
 return heading+(place?' in '+place:'')+'.'+(detail?'\n\n'+detail:'')+'\n\n'+client.companyName+'\nCall or text '+client.phoneDisplay+'\n'+client.licenseLabel;
}
function outputName(position){return client.slug+'-photo-'+String(position+1).padStart(2,'0')+'.jpg';}
const api={fitImage,buildCaption,outputName,JOBS};
if(typeof module==='object'&&module.exports)module.exports=api;else root.PhotoLogic=api;
})(typeof globalThis!=='undefined'?globalThis:this);
