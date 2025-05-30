import React, { useState } from 'react';
import './style.css';

const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherInfo = async () => {
    if (searchValue) {
      const apiKey = 'be0a8c6f7be0248d0894d8792284a572';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          setWeatherData(null);
          alert('City not found!');
        }
      } catch (error) {
        console.error('Error fetching the weather data', error);
      }
    }
  };

  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input
            type='search'
            placeholder='search...'
            autoFocus
            id='search'
            className='searchterm'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className='searchButton' type='button' onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      <article className='widget'>
        <div className='WeatherIcon'>
          <i className={`fa-solid fa-cloud-sun-rain`}></i>
        </div>

        <div className='weatherInfo'>
          <div className='Tempreature'>
            <span>{weatherData ? weatherData.main.temp : 'N/A'}&deg;C</span>
          </div>

          <div className='description'>
            <div className='weatherCondition'>{weatherData ? weatherData.weather[0].description : 'N/A'}</div>
            <div className='place'>{weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : 'N/A'}</div>
          </div>
        </div>

        <div className='date'>{new Date().toLocaleString()}</div>

        <div className='extra-temp'>
          <div className='temp-info-minmax'>
            <div className='two-sided-section'>
              <p>
                <i className="fa-solid fa-cloud-sun"></i>
              </p>
              <p className='extra-info-leftside'>
                {weatherData ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : 'N/A'} <br />
                Sunset
              </p>
            </div>

            <div className='two-sided-section'>
              <p>
                <i className="fa-solid fa-wind"></i>
              </p>
              <p className='extra-info-leftside'>
                {weatherData ? weatherData.wind.speed : 'N/A'} m/s <br />
                Wind
              </p>
            </div>
          </div>

          <div className='weather-extra-info'>
            <div className='two-sided-section'>
              <p>
                <i className="fa-solid fa-cloud-rain"></i>
              </p>
              <p className='extra-info-leftside'>
                {weatherData ? weatherData.main.pressure : 'N/A'} hPa <br />
                Pressure
              </p>
            </div>

            <div className='two-sided-section'>
              <p>
                <i className="fa-solid fa-cloud-arrow-up"></i>
              </p>
              <p className='extra-info-leftside'>
                {weatherData ? weatherData.main.humidity : 'N/A'}% <br />
                Humidity
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default Temp;
