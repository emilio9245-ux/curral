const CACHE='curral-nielt';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const guardada=()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./'));
  const rede=fetch(e.request).then(r=>{ if(r.ok){ const c=r.clone(); caches.open(CACHE).then(k=>k.put(e.request,c)); } return r; });
  const espera=new Promise(res=>setTimeout(()=>res(null),4000));
  e.respondWith(Promise.race([rede.catch(()=>null),espera]).then(r=>r||guardada().then(g=>g||rede)));
});
