import { Typography } from '@material-tailwind/react';

export const Credits = () => {
  return (
    <div
      className={
        'flex flex-col gap-4 p-8 shadow-xl rounded text-center bg-gradient-107 from-dark-red from-10% to-light-red to-90%'
      }>
      <Typography className={'text-white'} color={'black'} data-testid='footer'>
        Made with ❤️ by{' '}
        <a
          className='w-fit mx-auto text-blue-100 underline rounded p-2 hover:bg-teal-500 hover:text-white hover:no-underline'
          href='https://profile.intra.42.fr/users/jjaqueme'>
          jjaqueme
        </a>{' '}
        &&{' '}
        <a
          className='w-fit mx-auto text-blue-100 underline rounded p-2 hover:bg-teal-500 hover:text-white hover:no-underline'
          href='https://profile.intra.42.fr/users/tpinto-m'>
          tpinto-m
        </a>
      </Typography>
      <a
        className='w-fit mx-auto text-blue-100 underline rounded p-2 hover:bg-teal-500 hover:text-white hover:no-underline'
        href='https://github.com/Deegoh/red-tetris'>
        Github Project
      </a>
    </div>
  );
};
