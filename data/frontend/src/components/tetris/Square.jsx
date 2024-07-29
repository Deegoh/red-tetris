import React from 'react';


export const Square = ({color}) => {
  const classes = `size-tile ${color}`;

  return (
    <div className={classes}></div>
  );
};