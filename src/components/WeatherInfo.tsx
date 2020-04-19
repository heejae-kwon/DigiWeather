/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export interface IWeatherInfo {
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
export class WeatherInfo implements IWeatherInfo {
  main: string = "";
  description: string = "";
  temp: string = "";
  temp_max: string = "";
  temp_min: string = "";
  humidity: string = "";
  wind_speed: string = "";
  dt: string = "";
  name: string = "";
  icon: string = "";
}