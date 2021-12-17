import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Spinner from '../Spinner/Spinner';
import './Weather.css';

const Weather = ({date, setWeatherDate}) => {
  const weatherURL = `https://weather.rambler.ru/api/v3/detailed/?all_data=0&url_path=v-ekaterinburge&date=${date}-may`;

  const startWeatherData = {
    temperature: 0,
    date: 0,
    pressure: 0,
    wind_speed: 0,
    wind_direction: ''
  }
  const [weatherData, setWeatherData] = useState(startWeatherData)
  const [loading, setLoading] = useState(true)

  const clearWeatherData = (data) => {
    return ({
      temperature: data.date_weather.temperature,
      date: data.date_weather.date,
      pressure: data.date_weather.pressure_mm,
      wind_speed: data.date_weather.wind_speed,
      wind_direction: data.date_weather.wind_direction
    })
  }
   
  useEffect(()=>{
    axios.get(weatherURL)
    .then((res)=> {
      setWeatherData(clearWeatherData(res.data))
      setLoading(false)
    })
  }, [weatherURL])

  return (
    <div className="weather">
      {loading
      ? <Spinner />
      :  <div>
        <h2 className='mgb-50'>Погода в Екатеринбурге на {weatherData.date}:</h2>
        <h4 className='mgb-30'>Температура: {weatherData.temperature} °C.</h4>
        <h4 className='mgb-30'>Давление: {weatherData.pressure} мм.</h4>
        <h4>Скорость ветра: {weatherData.wind_speed} м/с.</h4>
      </div>}

      <svg className='weather-close' viewBox="0 0 24 24"
        onClick={() => setWeatherDate(0)}
      >
        <path fill="#fff" d="M13.41406,12l3.293-3.293A.99989.99989,0,0,0,15.293,7.293L12,10.58594,8.707,7.293A.99989.99989,0,0,0,7.293,8.707L10.58594,12,7.293,15.293A.99989.99989,0,0,0,8.707,16.707L12,13.41406l3.293,3.293A.99989.99989,0,0,0,16.707,15.293Z" />
        <path fill="#7fb3fd" d="M19.0708,4.9292A9.99962,9.99962,0,1,0,4.9292,19.0708,9.99962,9.99962,0,1,0,19.0708,4.9292ZM16.707,15.293A.99989.99989,0,1,1,15.293,16.707L12,13.41406,8.707,16.707A.99989.99989,0,0,1,7.293,15.293L10.58594,12,7.293,8.707A.99989.99989,0,0,1,8.707,7.293L12,10.58594l3.293-3.293A.99989.99989,0,0,1,16.707,8.707L13.41406,12Z" />
      </svg>
    </div>
  )
}

export default Weather;

