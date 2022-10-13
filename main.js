if('serviceWorker' in navigator){
    console.log('Puedes usar los service worker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
                            .then(res=>console.log('serviceWorker cargado correctamente',res))
                            .catch(err => console.log('serviceWorker no se ha podido registrar', err))
            
}else{
    console.log('No puedes usar los service worker en tu navegador');
}