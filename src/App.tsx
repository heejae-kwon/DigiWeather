/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { SearchForm, SearchMethod } from './components/SearchForm';
import WeatherForm from './components/WeatherForm';

const App = () => {

  const devUrl = "http://localhost:5000/api/weather/zipcode/";
  const buildUrl = "https://ts-weather-server.herokuapp.com/api/weather/zipcode/";
  const [weather, setWeather] = useState(Object);
  const [forecast, setForecast] = useState(Object);
  const [isWeatherActive, setIsWeatherActive] = useState(false);
  const getWeather = async (content: string, searchMethod: SearchMethod) => {
    if (isWeatherActive === false) {
      setIsWeatherActive(true);
    }
    try {
      let response: any = null;
      switch (searchMethod) {
        case SearchMethod.ZIPCODE: {
          response = await axios.get(buildUrl + content);

          break;
        }
        case SearchMethod.Geographic: {
          // const reg:RegExp = content.
          // response = await axios.get('http://localhost:5000/api/weather/geographic_coordinates/' + content);
          break;
        }
      }
      setWeather(response.data.weather);
      setForecast(response.data.forecast);
    } catch (error) {
      console.error(error);
    }

  };
  const showWeather = () => {
    if (isWeatherActive === false || !weather) {
      return;
    }
    if (Object.keys(weather).length === 0) {
      return;
    }

    return <WeatherForm main={weather.weather[0].main}
      description={weather.weather[0].description}
      temp={weather.main.temp}
      temp_max={weather.main.temp_max}
      temp_min={weather.main.temp_min}
      humidity={weather.main.humidity}
      wind_speed={weather.wind.speed}
      dt={weather.dt}
      name={weather.name}
      icon={weather.weather[0].icon}
    />
  };
  const showForecast = () => {
    if (isWeatherActive === false || !forecast) {
      return;
    }
    if (Object.keys(forecast).length === 0) {
      return;
    }

    const listOfForecast: Array<any> = forecast.list;
    const res = listOfForecast.map((fc, index) => {
      return (<div className="mx-2">
        <WeatherForm key={index} main={fc.weather[0].main}
          description={fc.weather[0].description}
          temp={fc.main.temp}
          temp_max={fc.main.temp_max}
          temp_min={fc.main.temp_min}
          humidity={fc.main.humidity}
          wind_speed={fc.wind.speed}
          dt={fc.dt}
          name={""}
          icon={fc.weather[0].icon}
        />
      </div>);
    });
    return (<div className="flex flex-col bg-blue-400 w-screen">
      <div>
        <p>
          3hours forecast
        </p>
      </div>
      <div className="flex flex-row">
        {res}
      </div>
    </div>);
  };

  return (
    <div className="bg-blue-400 h-screen w-screen">
      <div className="flex flex-col items-center py-4">
        <SearchForm getWeather={getWeather} />
        {showWeather()}
        {showForecast()}
      </div>
    </div>
  );
}

export default App;
