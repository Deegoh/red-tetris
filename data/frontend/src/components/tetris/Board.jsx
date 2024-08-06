import { Square } from './Square.jsx';
import { emptyColor } from './tetrominoes.js';
import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';

export const rows = 20;
export const cols = 10;

export const generateDefaultMap = () => {
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(emptyColor));
};

const renderBoard = (board, mode) => {
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
};

export const Board = ({
  player = '',
  mode = 'player',
  className = '',
  ...rest
}) => {
  const board = useSelector((state) => state.game.board);

  return (
    <div className='bg-board p-1 rounded'>
      <div
        {...rest}
        className={`${className} board bg-black rounded grid grid-cols-10 gap-[1px]`}>
        {renderBoard(board, mode)}

        <Typography className='col-span-full text-white mx-auto'>
          {player}
        </Typography>
      </div>
    </div>
  );
};
