const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;
const api_key='131973507d214a0d4802dadb36f6bdc5';

app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.post('/getWeather', async (req, res) => {
  try {

   
    const { cities } = req.body;

    
    const weatherData = {};

    for (const city of cities) {
      const weatherResponse = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`);
      
      let temperature ;
      if(weatherResponse.data.success===false)
      {
        temperature  = "NA";
      }

      else
      {
        temperature = weatherResponse.data.current.temperature;
     
       
      }
      weatherData[city] = `${temperature}C`;

      

      
      

      
    }

    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});