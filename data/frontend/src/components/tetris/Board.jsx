import { Square } from './Square.jsx';
import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';

export const rows = 20;
export const cols = 10;

export const Board = ({ player, className = '', ...rest }) => {
  const board = useSelector((state) => state.game.board);
  const [mode, setMode] = useState('player');

  const renderBoard = useMemo(() => {
    const map = [];
    let index = 0;

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
    <div className='bg-board p-1 rounded'>
      <div
        {...rest}
        className={`${className} board bg-black rounded grid grid-cols-10 gap-[1px]`}>
        {renderBoard}
        {player && (
          <Typography className='col-span-full text-white mx-auto'>
            {player}
          </Typography>
        )}
      </div>
    </div>
  );
};
