import React from 'react';
import { useState } from 'react';

interface SearchFormProps {
  getWeather: (arg0: string) => Promise<void>;
}
const SearchForm = (props: SearchFormProps) => {
  const [input, setInput] = useState('');
  const enterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.getWeather(input);
    }
  }
  return (
    <div className="bg-white my-2">
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            onKeyDown={enterKeyDown} onInput={(e: React.FormEvent<HTMLInputElement>) => setInput(e.currentTarget.value)} type="text" placeholder="Enter.." aria-label="Full name" />
          <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option>ZIP code</option>
            <option>Name</option>
          </select>
        </div>
      </form>
    </div>);
}

export default SearchForm;