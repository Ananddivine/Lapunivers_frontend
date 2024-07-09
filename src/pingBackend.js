import axios from 'axios';

const pingBackend = () => {
  const backendUrl = 'https://backend-1-la1d.onrender.com';
  axios.get(`${backendUrl}/ping`)
    .then(response => {
      if (response && response.status === 200) {
        console.log('Ping successful:', response.data);
        // Handle the response data here
      } else {
        console.error('Invalid response:', response);
        // Handle unexpected responses or errors
      }
    })
    .catch(error => {
      console.error('Ping failed:', error);
      // Handle errors here
    });
};


export default pingBackend;
