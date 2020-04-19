/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */

import React from 'react';

export function dayToString(dayNum: number) {
  let res: string = "";
  switch (dayNum) {
    case 0: {
      res = "Sunday";
    } break;
    case 1: {
      res = "Monday";
    } break;
    case 2: {
      res = "Tuesday";
    } break;
    case 3: {
      res = "Wednesday";
    } break;
    case 4: {
      res = "Thursday";
    } break;
    case 5: {
      res = "Friday";
    } break;
    case 6: {
      res = "Saturday";
    } break;
    default: {
    } break;
  }

  return res;
}

export function hourTo12HourPeriodString(hour: number) {
  const letter = (hour < 12 || hour === 24) ? "AM" : "PM";
  const number = hour % 12 || 12;;

  return number.toString() + " " + letter;
}

