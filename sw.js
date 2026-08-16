const CACHE='puglia-travel-v11';
const STATIC=['./','./index.html','./manifest.json','./icons/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname.includes('googleapis.com')||u.hostname.includes('firebaseapp.com')||u.hostname.includes('gstatic.com'))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(resp=>{const cp=resp.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return resp;}).catch(()=>caches.match('./index.html')));return;}
 e.respondWith(caches.match(r).then(c=>c||fetch(r)));
});