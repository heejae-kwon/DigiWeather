/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { SearchForm, SearchMethod } from './components/SearchForm';
import WeatherForm from './components/WeatherForm';
import {  WeatherInfo } from './components/WeatherInfo';

const App = () => {

  const devUrl = "http://localhost:5000/api/weather/zipcode/";
  const buildUrl = "https://ts-weather-server.herokuapp.com/api/weather/zipcode/";
  const buildUrlGeo = "https://ts-weather-server.herokuapp.com/api/weather/geographic_coordinates?";
  const devUrlGeo = "http://localhost:5000/api/weather/geographic_coordinates?";
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
          const reg: RegExp = /(^[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)),\s*([-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?))$/;
          const match = reg.exec(content);
          console.log(match);
          if (match) {
            response = await axios.get(devUrlGeo + "lat=" + match[1] + "&lon=" + match[2]);
          }
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
    if (isWeatherActive === false || !weather || !forecast) {
      return;
    }
    if (Object.keys(weather).length === 0 || Object.keys(forecast).length === 0) {
      return;
    }

    const listOfForecast: Array<WeatherInfo> = new Array<WeatherInfo>();
    const fcList: Array<any> = forecast.list;
    for (let i = 0; i < 8; ++i) {
      const newWeather = new WeatherInfo();
      let element = weather;
      if (i !== 0) {
        element = fcList[i - 1];
      }
      newWeather.main = element.weather[0].main;
      newWeather.name = element.name;
      newWeather.description = element.weather[0].description;
      newWeather.temp = element.main.temp;
      newWeather.temp_max = element.main.temp_max;
      newWeather.temp_min = element.main.temp_min;
      newWeather.humidity = element.main.humidity;
      newWeather.wind_speed = element.wind.speed;
      newWeather.dt = element.dt;
      newWeather.icon = element.weather[0].icon;
      listOfForecast.push(newWeather);
    }

    return <WeatherForm weathers={listOfForecast} />
  };


  return (
    <div className="bg-blue-400 h-screen w-screen">
      <div className="flex flex-col items-center py-4">
        <SearchForm getWeather={getWeather} />
        {showWeather()}
      </div>
    </div>
  );
}

export default App;
