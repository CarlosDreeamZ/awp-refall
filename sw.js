self.addEventListener('install', e =>{
    const cacheProm = caches.open('cache-v1')
        .then(cache => {
            return cache.addAll([
                'index.html',
                'style.css',
                'assets/slide.jpg',
                'main.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
                'manifest.json'
                
            ])
        });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e => { 

    const respuesta = caches.match( e.request)
    .then ( res => {
        if ( res ) return res;

        console.log('No existe', e.request.url);
        return fetch( e.request ).then ( newResp => {
            caches.open('cache-v1')
                .then( cache => {
                    cache.put( e.request, newResp);
                }

            )
            return newResp.clone;
        });
    });
     e.respondWith(respuesta);
});