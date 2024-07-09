// src/customServiceWorker.js

self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
  });
  
  const pingBackend = () => {
    const backendUrl = 'https://backend-1-la1d.onrender.com';
    fetch(`${backendUrl}/ping`)
      .then(response => response.json())
      .then(data => {
        console.log('Ping successful:', data);
      })
      .catch(error => {
        console.error('Ping failed:', error);
      });
  };
  
  // Ping the backend server every 5 minutes (300000 ms)
  setInterval(pingBackend, 300000);
  
  self.addEventListener('fetch', event => {
    // You can intercept network requests here if needed
  });
  