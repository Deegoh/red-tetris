import { Typography } from '@material-tailwind/react';
import { DialogDefault } from './DialogDefault.jsx';
import { RoomList } from './RoomList.jsx';
import { RoomCreation } from './RoomCreation.jsx';

export const Home = () => {
  return (
    <div className='p-8 shadow-xl bg-gray-300 rounded text-center bg-gradient-107 from-dark-red from-10% to-light-red to-90%'>
      <Typography variant='h1' className='font-[Tetris] py-4'>
        Red Tetris
      </Typography>
      <Typography variant='h2' className='pb-12'>
        New way to play Tetris
      </Typography>
      <DialogDefault btnText='Play'>
        <div className='bg-gradient-107 from-dark-red from-10% to-light-red to-90% mx-auto w-full flex flex-col p-12 text-center text-black bg-gray-300 gap-4 rounded'>
          <RoomCreation />
          <hr />
          <RoomList />
        </div>
      </DialogDefault>
    </div>
  );
};
