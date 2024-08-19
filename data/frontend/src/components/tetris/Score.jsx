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
        <Typography variant='h4'>Score</Typography>
        <Typography variant='h5'>{formatNumber(score)}</Typography>
      </div>
      <div>
        <Typography variant='h4'>Rows</Typography>
        <Typography variant='h5'>{rows}</Typography>
      </div>
      <div>
        <Typography variant='h4'>Level</Typography>
        <Typography variant='h5'>{level}</Typography>
      </div>
    </div>
  );
};
