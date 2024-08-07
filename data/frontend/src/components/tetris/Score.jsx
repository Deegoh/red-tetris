import { Typography } from '@material-tailwind/react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const Score = ({ justify = 'left' }) => {
  // https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
  const selectGameState = (state) => state.game;

  // Then, create a selector for the score data
  const selectScoreData = createSelector(
    [selectGameState],
    (gameState) => gameState.score
  );

  // Finally, create a selector that derives the individual score components
  const selectScoreComponents = createSelector(
    [selectScoreData],
    (scoreData) => {
      const [score, rows, level] = scoreData.split(' ');
      return { score, rows, level };
    }
  );

  // In your component, you can now use it like this:
  const { score, rows, level } = useSelector(selectScoreComponents);

  let classes = ' items-start';
  if (justify === 'left') {
    classes = ' items-start';
  }
  if (justify === 'right') {
    classes = ' items-end';
  }

  const formatNumber = (num) => {
    const absNum = Math.abs(num);
    if (absNum >= 1e9) {
      return (num / 1e9).toFixed(1).replace(/\.0$/, '') + ' B';
    }
    if (absNum >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, '') + ' M';
    }
    if (absNum >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, '') + ' K';
    }
    return num.toString();
  };

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
