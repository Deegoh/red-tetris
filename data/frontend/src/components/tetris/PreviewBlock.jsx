import { Square } from './Square.jsx';
import { useSelector } from 'react-redux';

const parseAndFormatTetromino = (shape) => {
  const size = 16;
  const tetromino = [];

  if (shape === undefined) {
    return;
  }

  for (let index = 0; index < size; index++) {
    let colorId = shape[Math.floor(index / 4)][index % 4];
    tetromino.push(
      <Square mode={'player'} position={index} key={index} color={colorId} />
    );
  }
  return tetromino;
};

export const PreviewTetrominoes = () => {
  const previewTermino = useSelector((state) => state.game.previewTermino);
  const previewBlock = parseAndFormatTetromino(previewTermino);

  return (
    <div className='bg-board p-1 rounded shrink-1 preview-block grid grid-cols-4 gap-[1px] content-start'>
      {previewBlock}
    </div>
  );
};
