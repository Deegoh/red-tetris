import { Square } from './Square.jsx';
import { useMemo } from 'react';
import { Typography } from '@material-tailwind/react';

export const PreviewTetrominoes = ({ tetromino, children }) => {
  const previewBlock = useMemo(() => {
    const size = 16;
    const map = [];

    if (tetromino === undefined) {
      return;
    }

    for (let index = 0; index < size; index++) {
      let colorId =
        tetromino.length !== 0
          ? tetromino[Math.floor(index / 4)][index % 4]
          : '.';
      map.push(
        <Square mode={'player'} position={index} key={index} color={colorId} />
      );
    }
    return map;
  }, [tetromino]);

  return (
    <>
      {previewBlock && (
        <div className={'w-max bg-board rounded text-white flex flex-col'}>
          <div className='bg-board p-1 rounded shrink-1 preview-block grid grid-cols-4 gap-[1px] content-start'>
            {previewBlock}
          </div>
          {children && (
            <Typography className={'mx-auto'} variant='h4'>
              {children}
            </Typography>
          )}
        </div>
      )}
    </>
  );
};
