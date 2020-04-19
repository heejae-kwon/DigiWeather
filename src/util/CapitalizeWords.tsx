/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export function capitalizeWords(str: string) {
  return str.replace(/\w\S*/g, (txt: string) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}