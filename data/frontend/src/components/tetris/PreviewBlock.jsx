import { Square } from './Square.jsx';
import { emptyColor, tetrominoes, tetrominoesBlocks } from './tetrominoes.js';
import { useSelector } from 'react-redux';

export const randomTetromino = () => {
  return tetrominoes.charAt(Math.floor(Math.random() * tetrominoes.length));
};

const parseAndFormatTetromino = (shape, rotation) => {
  const size = 16;
  const tetromino = [];

  if (!shape) {
    shape = 'default';
  }

  for (let index = 0; index < size; index++) {
    let colorId =
      tetrominoesBlocks[shape][rotation][Math.floor(index / 4)][index % 4];
    let color = colorId !== emptyColor ? 'bg-tile-' + colorId : 'bg-tile';
    tetromino.push(<Square position={index} key={index} color={color} />);
  }
  return tetromino;
};

export const PreviewTetrominoes = () => {
  const { previewTermino, rotation } = useSelector((state) => state.game);
  const previewBlock = parseAndFormatTetromino(previewTermino, rotation);
  return (
    <div className='preview-block grid grid-cols-4 gap-0 content-start'>
      {previewBlock}
    </div>
  );
};
