// api/ping.js

export default function handler(req, res) {
  const backendUrl = 'https://backend-1-la1d.onrender.com';

  fetch(`${backendUrl}/ping`)
    .then(response => response.json())
    .then(data => {
      console.log('Ping successful:', data);
      res.status(200).send('Ping successful');
    })
    .catch(error => {
      console.error('Ping failed:', error);
      res.status(500).send('Ping failed');
    });
}
