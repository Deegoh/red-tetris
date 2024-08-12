import { Btn } from './Btn.jsx';
import { useCallback } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { useNotification } from 'src/app/notifications.jsx';
import { Typography } from '@material-tailwind/react';
import { GameMode } from './tetris/GameMode.jsx';

export const RoomCreation = ({ pseudo, className }) => {
  const { socket } = useSocket();

  const { addNotif } = useNotification();

  const createRoom = useCallback(() => {
    if (socket !== undefined) {
      socket.emit('createRoom', { pseudo: pseudo });
    } else {
      addNotif('Socket not loaded (yet?)', 'error');
    }
  }, [addNotif, pseudo, socket]);

  return (
    <div className={className}>
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
