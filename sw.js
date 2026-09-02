const CACHE='travel-app-v18-1';
const STATIC=["./", "./index.html", "./images/alberobello.jpg", "./images/altamura.jpg", "./images/bari.jpg", "./images/barletta-trani.jpg", "./images/brindisi.jpg", "./images/departure.jpg", "./images/galatina.jpg", "./images/gallipoli.jpg", "./images/lecce.jpg", "./images/locorotondo.jpg", "./images/maglie.jpg", "./images/matera.jpg", "./images/monopoli-polignano.jpg", "./images/open-flexible.jpg", "./images/otranto.jpg", "./images/porto-cesareo.jpg", "./images/rest-day.jpg", "./images/transfer.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname.includes('googleapis.com')||u.hostname.includes('firebaseapp.com')||u.hostname.includes('gstatic.com'))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return;}
 e.respondWith(caches.match(r).then(c=>c||fetch(r)));
});