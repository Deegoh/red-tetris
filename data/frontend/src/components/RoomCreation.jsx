import { Btn } from './Btn.jsx';
import { useCallback } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { useNotification } from 'src/app/notifications.jsx';

export const RoomCreation = ({ pseudo }) => {
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
    <>
      <Btn
        className='mx-auto max-w-fit'
        onClick={createRoom}
        data-testid='createroom'>
        Create
      </Btn>
    </>
  );
};
