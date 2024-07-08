import axios from 'axios';

const pingBackend = () => {
  const backendUrl = 'https://backend-1-la1d.onrender.com';
  axios.get(`${backendUrl}/ping`)
    .then(response => {
      console.log('Ping successful:', response.data);
    })
    .catch(error => {
      console.error('Ping failed:', error);
    });
};

export default pingBackend;
