import { Typography } from '@material-tailwind/react';
import { DialogDefault } from './DialogDefault.jsx';
import { RoomList } from './RoomList.jsx';
import { RoomCreation } from './RoomCreation.jsx';
import { useState } from 'react';

export const Home = () => {
  const [pseudo, setPseudo] = useState('');

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
          <Typography variant='h3'>Room</Typography>
          <label className='mx-auto text-left' htmlFor='pseudo'>
            Pseudo:
            <input
              className='ml-1'
              id='pseudo'
              data-testid='pseudo'
              type='text'
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </label>
          <RoomCreation pseudo={pseudo} />
          <hr className={'border-dark-red'} />
          <RoomList pseudo={pseudo} />
        </div>
      </DialogDefault>
    </div>
  );
};
