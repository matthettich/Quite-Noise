const CACHE='quite-noise-v8';
const FILES=['./','index.html','manifest.webmanifest?v=4','icon-maskable-512.png','icon.svg','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  // The page itself skips the browser cache, so an update shows up as soon as it's on the server.
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request.url,{cache:'no-cache',credentials:'same-origin'})
    .then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c)).catch(()=>{})}return r}).catch(()=>caches.match(e.request)));return}
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request)))});
