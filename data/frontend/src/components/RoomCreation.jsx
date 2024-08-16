import { Btn } from './Btn.jsx';
import { useCallback } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { Typography } from '@material-tailwind/react';
import { GameMode } from './tetris/GameMode.jsx';
import { useSelector } from 'react-redux';

export const RoomCreation = ({ pseudo, className }) => {
  const { socket } = useSocket();
  const { garbageType, bagType, difficulty, hold, preview } = useSelector(
    (state) => state.common.gameSettings
  );

  const createRoom = useCallback(() => {
    if (socket !== undefined) {
      socket.emit('createRoom', {
        pseudo: pseudo,
        gameSettings: {
          garbageType,
          bagType,
          difficulty: Math.round((100 - difficulty) / 4),
          hold,
          preview,
        },
      });
    }
  }, [bagType, difficulty, garbageType, hold, preview, pseudo, socket]);

  return (
    <div className={className} data-testid='roomcreationpage'>
      <Typography variant='h3'>Host Room</Typography>
      <GameMode className={'text-left w-[80%] mx-auto flex flex-col gap-4'} />
      <Btn
        className={'mx-auto max-w-fit mt-4'}
        onClick={createRoom}
        data-testid='createroom'>
        Create
      </Btn>
    </div>
  );
};
