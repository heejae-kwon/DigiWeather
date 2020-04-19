import React from 'react';
import { useState } from 'react';

interface SearchFormProps {
  getWeather: (input: string, method: SearchMethod) => Promise<void>;
}
export enum SearchMethod {
  ZIPCODE, Geographic
}
export const SearchForm = (props: SearchFormProps) => {
  const [input, setInput] = useState('');
  const [method, setMethod] = useState(SearchMethod.ZIPCODE);
  const [placeholder, setPlaceholder] = useState("Enter the ZIP code");
  const enterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === '') {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      props.getWeather(input, method);
    }
  }
  const searchMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target: SearchMethod = parseInt(e.currentTarget.value);
    setInput("");
    switch (target) {
      case SearchMethod.ZIPCODE: {
        setMethod(SearchMethod.ZIPCODE);
        setPlaceholder("Enter the ZIP code");
        break;
      }
      case SearchMethod.Geographic: {
        setMethod(SearchMethod.Geographic);
        setPlaceholder("Latitude, Longitude");

        if (!navigator.geolocation) {
          setInput('Geolocation is not supported by your browser');
        } else {
          //       status.textContent = 'Locating…';
          const success = (position: any) => {
            const latitude: string = position.coords.latitude;
            const longitude: string = position.coords.longitude;
            setInput(latitude + ", " + longitude);
          };
          const error = () => { setInput("Unable to retrieve your location") }
          navigator.geolocation.getCurrentPosition(success, error);
        }
        break;
      }
      default: {

      }
    }
  }
  return (
    <div className="bg-white my-2 rounded">
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
           defaultValue={input} onKeyDown={enterKeyDown} onInput={(e: React.FormEvent<HTMLInputElement>) => setInput(e.currentTarget.value)} type="text" placeholder={placeholder.toString()} aria-label="Full name" />
          <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 mx-2 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={searchMethodChange} id="grid-state" defaultValue={method.toString()}>
            <option value={SearchMethod.ZIPCODE}>ZIP code</option>
            <option value={SearchMethod.Geographic}>Geographic Coordinates</option>
          </select>
        </div>
      </form>
    </div>);
}
