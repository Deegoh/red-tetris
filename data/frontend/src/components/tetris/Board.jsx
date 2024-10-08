import { Square } from './Square.jsx';
import { Typography } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import { rows, cols } from './const.jsx';
import { formatNumber } from './formatNumber.jsx';

export const Board = ({ board, player, score, className = '', ...rest }) => {
  const [mode, setMode] = useState('player');

  const renderBoard = useMemo(() => {
    const map = [];
    let index = 0;

    if (board === undefined) {
      return;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let colorId = board[row][col];
        let ghost = false;

        if (colorId.includes('#')) {
          colorId = colorId.replace('#', '');
          ghost = true;
        }

        map.push(
          <Square
            ghost={ghost}
            mode={mode}
            position={index}
            key={index++}
            color={colorId}
          />
        );
      }
    }
    return map;
  }, [board, mode]);

  useEffect(() => {
    if (player) {
      setMode('view');
    }
  }, [player]);

  return (
    board !== undefined && (
      <div className='bg-board flex flex-col p-1 rounded'>
        <div
          {...rest}
          className={`${className} board bg-black rounded inline-grid grid-cols-[repeat(10,_0fr)] gap-[1px]`}>
          {renderBoard}
          {player !== undefined && score !== undefined && (
            <div className='col-span-full'>
              <Typography
                title={player}
                className='truncate text-center text-white mx-auto'>
                {player}
              </Typography>
              <Typography
                title={score}
                className='truncate text-center text-white mx-auto'>
                {formatNumber(score)}
              </Typography>
            </div>
          )}
        </div>
      </div>
    )
  );
};
