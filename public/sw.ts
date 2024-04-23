self.addEventListener('install', (event) => {
  console.log('sw install event : ))');
});

self.addEventListener('activate', (event) => {
  console.log('sw activate event : ))');
});

self.addEventListener('fetch', (event: any) => {
  console.log(event.request.url);
});
