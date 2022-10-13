const CACHE_NAME='V1_CACHE_AWP';

var urlToCache=[
    './',
    './css/style.css',
    './images/1.png',
    './images/2.png',
    //Poner cada imagen de la pagina //
]

self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlToCache)
            then(()=>{
                self.skipWaiting();
            })
        })
        .catch (err=>{
            console.log('No se ha registrado el cache', err);
        })
    )
});

self.addEventListener('activate', e =>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1){

                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() =>{
            self.clients.claim();
        })
    );
});

self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
})