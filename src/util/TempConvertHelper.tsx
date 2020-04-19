
import React from 'react';

export function kelvinToFahrenheit(kelvin: number) {

  return ((1.8) * (kelvin - 273.15) + 32).toFixed(0);
}

export function kelvinToCelsius(kelvin: number) {

  return (kelvin - 273.15).toFixed(0);
}