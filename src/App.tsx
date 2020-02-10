import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './components/searchForm';

const App = () => {

  const [weather, setWeather] = useState(null);
  const [isWeatherActive, setIsWeatherActive] = useState(false);
  const getWeather = async (/*userInput*/) => {
    if (isWeatherActive === false) {
      setIsWeatherActive(true);
    }
    try {
      const response = await axios.get('http://localhost:5000/api/weather/location/44418');
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
    let content = ' ';
    if(weather !== null){
      content = JSON.stringify(weather);
    }

    return (<div className="flex my-2 bg-white max-w-sm rounded overflow-scroll shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Weather</div>
        <p className="text-gray-700 text-base">
          {content}
        </p>
      </div>
    </div>);

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
