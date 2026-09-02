const CACHE='travel-app-v20-4';
const STATIC=["./", "./index.html", "./alberobello.jpg", "./altamura.jpg", "./bari.jpg", "./barletta-trani.jpg", "./brindisi.jpg", "./departure.jpg", "./galatina.jpg", "./gallipoli.jpg", "./lecce.jpg", "./locorotondo.jpg", "./maglie.jpg", "./matera.jpg", "./monopoli-polignano.jpg", "./open-flexible.jpg", "./otranto.jpg", "./porto-cesareo.jpg", "./rest-day.jpg", "./transfer.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname.includes('googleapis.com')||u.hostname.includes('firebaseapp.com')||u.hostname.includes('gstatic.com'))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return;}
 e.respondWith(caches.match(r).then(c=>c||fetch(r)));
});