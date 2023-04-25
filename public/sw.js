const imgCache = 'imgCache'

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    console.log('强制更新sw')
    self.skipWaiting()
  }
})

self.addEventListener('install', function (event) {
  console.log('installed')
})

self.addEventListener('activate', event => {
  console.log('activate')
})

self.addEventListener('fetch', function (event) {
  if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(event.request.url)) {
    event.respondWith(
      caches.match(event.request.url).then(function (response) {
        if (response) {
          return response
        }
        const request = event.request.clone()
        return fetch(request).then(function (response) {
          if (
            !response ||
            response.status !== 200 ||
            !response.headers.get('Content-type').match(/image/)
          ) {
            return response
          }
          const responseClone = response.clone()
          caches.open(imgCache).then(function (cache) {
            cache.put(event.request, responseClone)
          })
          return response
        })
      })
    )
  }
})
