import React from 'react';


export const Square = ({color, position}) => {
  const classes = `border size-tile ${color}`;
  return (
    <div data-position={position} className={classes}></div>
  );
};