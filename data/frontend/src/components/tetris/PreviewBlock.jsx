import { Square } from './Square.jsx';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const PreviewTetrominoes = () => {
  const previewTetromino = useSelector((state) => state.game.previewTetromino);
  const previewBlock = useMemo(() => {
    const size = 16;
    const tetromino = [];

    if (previewTetromino === undefined) {
      return;
    }

    for (let index = 0; index < size; index++) {
      let colorId = previewTetromino[Math.floor(index / 4)][index % 4];
      tetromino.push(
        <Square mode={'player'} position={index} key={index} color={colorId} />
      );
    }
    return tetromino;
  }, [previewTetromino]);

  return (
    <div className='bg-board p-1 rounded shrink-1 preview-block grid grid-cols-4 gap-[1px] content-start'>
      {previewBlock}
    </div>
  );
};
