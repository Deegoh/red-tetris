import { Square } from './Square.jsx';
import { tetrominoesBlocks } from './tetrominoes.js';
import { useSelector } from 'react-redux';

const parseAndFormatTetromino = (shape, rotation) => {
  const size = 16;
  const tetromino = [];

  if (!shape) {
    shape = 'default';
  }

  for (let index = 0; index < size; index++) {
    let colorId =
      tetrominoesBlocks[shape][rotation][Math.floor(index / 4)][index % 4];
    tetromino.push(
      <Square mode={'player'} position={index} key={index} color={colorId} />
    );
  }
  return tetromino;
};

export const PreviewTetrominoes = () => {
  const { previewTermino, rotation } = useSelector((state) => state.game);
  const previewBlock = parseAndFormatTetromino(previewTermino, rotation);

  return (
    <div className='bg-board p-1 rounded shrink-1 preview-block grid grid-cols-4 gap-[1px] content-start'>
      {previewBlock}
    </div>
  );
};
