
import React, { useState } from 'react';
import { WeatherInfo } from './WeatherInfo';
import { dayToString, hourTo12HourPeriodString } from '../util/DateHelper'
import { capitalizeWords } from '../util/CapitalizeWords'
import { kelvinToCelsius, kelvinToFahrenheit } from '../util/TempConvertHelper'

interface WeatherFormProps {
  weathers: Array<WeatherInfo>
}
enum Unit {
  CELSIUS,
  FAHRENHEIT
}

const WeatherForm = (props: WeatherFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultBgList = Array<string>(8).fill("bg-transparent");
  const [index, setIndex] = useState(0);
  const [bgList, setBgList] = useState(defaultBgList);
  const [unit, setUnit] = useState(Unit.FAHRENHEIT);
  const unitConversion = (kelvin: number) => {
    if (unit === Unit.FAHRENHEIT) {
      return kelvinToFahrenheit(kelvin);
    }
    return kelvinToCelsius(kelvin);
  };
  let celsiusItalic: string = "underline";
  let fahrenheitItalic = "";
  if (unit === Unit.FAHRENHEIT) {
    celsiusItalic = "";
    fahrenheitItalic = "underline";
  }
  const imgSrc: string = "http://openweathermap.org/img/wn/" + props.weathers[index].icon + "@2x.png";
  const time = new Date(parseInt(props.weathers[index].dt) * 1000);
  const handleMouseOver = (i: number) => { const copy = Array.from(defaultBgList); copy[i] = "bg-gray-200"; setBgList(copy) };
  const handleMouseLeave = () => { const copy = Array.from(defaultBgList); setBgList(copy); };

  bgList[index] = "bg-gray-200";

  const renderForecast = props.weathers.map((fc, fcIndex) => {
    const fcTime = new Date(parseInt(fc.dt) * 1000);
    const fcImgSrc: string = "http://openweathermap.org/img/wn/" + fc.icon + "@2x.png";
    const fcDay = dayToString(fcTime.getDay());
    return (
      <td onClick={() => { setIndex(fcIndex); handleMouseLeave() }} onMouseEnter={() => { handleMouseOver(fcIndex) }} onMouseLeave={() => { handleMouseLeave() }} key={fcIndex} className={bgList[fcIndex].toString() + " cursor-pointer border font-bold justify-center py-2"}>
        <p className="text-center">
          {fcDay[0] + fcDay[1] + fcDay[2] + " " + hourTo12HourPeriodString(fcTime.getHours())}
        </p>
        <img alt="weather img" src={fcImgSrc} />
        <p className="text-center text-xl">
          {unitConversion(parseFloat(fc.temp)).toString() + "°"}
        </p>
        <p className="text-center">
          {unitConversion(parseFloat(fc.temp_min)).toString() + "°"}
        </p>
      </td>
    );
  });

  return (<div className="flex my-2 bg-white rounded shadow-lg">
    <div className="flex flex-col px-6 py-4">
      <div className="flex flex-col font-bold mb-2">
        <div className="text-2xl">
          {props.weathers[0].name}
        </div>
        <div className="mr-2">
          {dayToString(time.getDay())}
          {" "}
          {hourTo12HourPeriodString(time.getHours())}
          {" • "}
          {capitalizeWords(props.weathers[index].description)}
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-row justify-around">
          <img alt="weather img" src={imgSrc} width="200" height="200" />
        </div>
        <div className="font-bold">
          <div className="flex flex-row">
            <p className='text-gray-800 font-bold text-6xl'>
              {unitConversion(parseFloat(props.weathers[index].temp)).toString() + "°"}
            </p>
            <div className="flex flex-row">
              <p onClick={() => { setUnit(Unit.FAHRENHEIT) }} className={"text-gray-800 text-2xl ml-2 mt-5 font-extrabold cursor-pointer " + fahrenheitItalic.toString()}>
                F
            </p>
              <p className="text-gray-800 text-2xl ml-2 mt-5 font-extrabold">
                /
            </p>
              <p onClick={() => { setUnit(Unit.CELSIUS) }} className={"text-gray-800 text-2xl ml-2 mt-5 font-extrabold cursor-pointer " + celsiusItalic.toString()}>
                C
            </p>
            </div>
          </div>
          <p className="text-gray-700 text-base">
            {"Humidity: " + props.weathers[index].humidity + "%"}
          </p>
          <p className="text-gray-700 text-base">
            {"Wind: " + props.weathers[index].wind_speed}
          </p>
        </div>
      </div>
      <div>
        <table className="table-auto">
          <tbody>
            <tr>
              {renderForecast}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>);
}
export default WeatherForm;