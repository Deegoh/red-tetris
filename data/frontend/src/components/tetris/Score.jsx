import { Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';

export const Score = () => {
  const score = useSelector((state) => state.game.score);
  return (
    <div className='flex flex-col items-end'>
      <Typography variant='h4'>Score</Typography>
      <Typography variant='h5'>{score}</Typography>
    </div>
  );
};
