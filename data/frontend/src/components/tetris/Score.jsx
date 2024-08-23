import { Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { formatNumber } from './formatNumber.jsx';

export const Score = ({ justify = 'left' }) => {
  // https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
  const { score, rows, level } = useSelector((state) => state.game);

  let classes = ' items-start';
  if (justify === 'left') {
    classes = ' items-start';
  }
  if (justify === 'right') {
    classes = ' items-end';
  }

  return (
    <div
      className={
        'bg-board rounded p-2 text-white flex flex-col gap-4' + classes
      }>
      <div>
        <Typography className='font-bold' variant='lead'>
          Score
        </Typography>
        <Typography variant='lead'>{formatNumber(score)}</Typography>
      </div>
      <div>
        <Typography className='font-bold' variant='lead'>
          Rows
        </Typography>
        <Typography variant='lead'>{rows}</Typography>
      </div>
      <div>
        <Typography className='font-bold' variant='lead'>
          Level
        </Typography>
        <Typography variant='lead'>{level}</Typography>
      </div>
    </div>
  );
};
