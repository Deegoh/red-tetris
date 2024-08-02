import { DialogPlay } from './DialogPlay.jsx';
import { Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { DialogDefault } from './DialogDefault.jsx';
import { RoomList } from './RoomList.jsx';
import { RoomCreation } from './RoomCreation.jsx';
import { NotificationsContainer } from './NotificationsContainer.jsx';
import React from 'react';

export const Home = () => {
  return (
    <div className='p-8 shadow-xl bg-gray-300 rounded text-center'>
      <Typography variant='h1' className='py-4'>
        Red Tetris
      </Typography>
      <Typography variant='h2' className='pb-12'>
        New way to play Tetris
      </Typography>
      <DialogDefault btnText='Play'>
        <div className='mx-auto w-full flex flex-col p-12 text-center text-black bg-gray-300 gap-4 rounded'>
          <RoomCreation />
          <hr />
          <RoomList />
        </div>
      </DialogDefault>
    </div>
  );
};
