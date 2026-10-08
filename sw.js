const C='cust-v7',F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin||u.pathname.endsWith('.apk'))return;
const j=u.pathname.endsWith('prices.json'),key=j?new Request('./prices.json'):r;
e.respondWith((j?fetch(r.url,{cache:'no-store'}):fetch(r)).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(key,c))}return res}).catch(()=>caches.match(key).then(m=>m||caches.match('./index.html'))))});
