import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SearchForm, SearchMethod } from './components/SearchForm';
import WeatherForm from './components/WeatherForm';
import Axios from 'axios';

const App = () => {

  const [weather, setWeather] = useState({});
  const [isWeatherActive, setIsWeatherActive] = useState(false);
  const getWeather = async (content: string, searchMethod: SearchMethod) => {
    if (isWeatherActive === false) {
      setIsWeatherActive(true);
    }
    try {
      let response: any = null;
      switch (searchMethod) {
        case SearchMethod.ZIPCODE: {
          response = await axios.get('http://localhost:5000/api/weather/zipcode/' + content);
          break;
        }
        case SearchMethod.Geographic: {
         // const reg:RegExp = content.
         // response = await axios.get('http://localhost:5000/api/weather/geographic_coordinates/' + content);
          break;
        }
      }
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  };
  const showWeather = () => {
    if (isWeatherActive === false) {
      return;
    }
    let content: string = '';
    if (weather !== null) {
      content = JSON.stringify(weather);
    }

    return <WeatherForm content={content} />;

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
