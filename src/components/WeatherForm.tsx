import React from 'react';

interface WeatherFormProps {
  main: string,
  description: string,
  temp: string,
  temp_max: string,
  temp_min: string,
  humidity: string,
  wind_speed: string,
  dt: string,
  name: string,
  icon: string
}
const WeatherForm = (props: WeatherFormProps) => {

  const imgSrc: string = "http://openweathermap.org/img/wn/" + props.icon + "@2x.png";
  const time = new Date(parseInt(props.dt)*1000);

  return (<div className="flex my-2 bg-white max-w-sm rounded shadow-lg">
    <div className="flex flex-col items-center px-6 py-4">
      <div className="flex flex-row font-bold text-2xl mb-2">
        {props.name}
      </div>
      <div>
        <img alt="weather img" src={imgSrc} />
      </div>
      <div>
        <div className="flex flex-row justify-between font-bold text-lg mb-2">
          <div className="mr-2">
            {props.main}
          </div>
          <div className="ml-2">
            {props.temp}
          </div>
        </div>
        <p className="text-gray-700 text-base">
          {time.toLocaleString()}
        </p>
        <div className="justify-between">
          <p className="text-gray-700 text-base">
            {"H: " + props.temp_max}
          </p>
          <p className="text-gray-700 text-base">
            {"L: " + props.temp_min}
          </p>
        </div>
        <p className="text-gray-700 text-base">
          {"Humadity: " + props.humidity + "%"}
        </p>
        <p className="text-gray-700 text-base">
          {"Wind: " + props.wind_speed}
        </p>



      </div>
    </div>

  </div>);
}
export default WeatherForm;