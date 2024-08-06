import { Typography } from '@material-tailwind/react';
import { Btn } from './Btn.jsx';
import { useCallback, useState } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { useNotification } from 'src/app/notifications.jsx';

export const RoomCreation = () => {
  const [pseudo, setPseudo] = useState('');

  const { socket } = useSocket();
  // const {socketRef: { current: socket }} = useSocket();

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
      <Typography variant='h3'>Room</Typography>
      <label className='mx-auto text-left' htmlFor='pseudo'>
        Pseudo:
        <input
          className='ml-1'
          id='pseudo'
          data-testid='pseudo'
          type='text'
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
      </label>

      <Btn
        className='mx-auto max-w-fit'
        onClick={createRoom}
        data-testid='createroom'>
        Create
      </Btn>
    </>
  );
};
