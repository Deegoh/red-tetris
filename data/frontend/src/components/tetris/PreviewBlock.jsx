import { Square } from './Square.jsx';
import { useMemo } from 'react';
import { Typography } from '@material-tailwind/react';

export const PreviewBlock = ({ tetromino, children }) => {
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
          <div className='inline-grid grid-cols-[repeat(4,_0fr)] bg-board p-1 rounded shrink-1 preview-block gap-px content-start'>
            {previewBlock}
            {children && (
              <Typography
                className={'font-bold col-span-full mx-auto'}
                variant='lead'>
                {children}
              </Typography>
            )}
          </div>
        </div>
      )}
    </>
  );
};
