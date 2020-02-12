import React from 'react';

interface WeatherFormProps {
  content: string;
}
const WeatherForm = (props: WeatherFormProps) => {

  return (<div className="flex my-2 bg-white max-w-sm rounded overflow-scroll shadow-lg">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">The Weather</div>
      <p className="text-gray-700 text-base">
        {props.content}
      </p>
    </div>
  </div>);
}
export default WeatherForm;