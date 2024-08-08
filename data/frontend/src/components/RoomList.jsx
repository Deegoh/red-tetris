import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { Btn } from './Btn.jsx';
import { useCallback } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { useNotification } from 'src/app/notifications.jsx';

export const RoomList = ({ pseudo }) => {
  const rooms = useSelector((state) => state.rooms.value);
  const { socket } = useSocket();

  const { addNotif } = useNotification();

  const joinRoom = useCallback(
    (room) => {
      if (socket !== undefined) {
        socket.emit('joinRoom', { pseudo: pseudo, room: room });
      } else {
        addNotif('Socket not loaded (yet?)', 'error');
      }
    },
    [addNotif, pseudo, socket]
  );

  return (
    <div>
      <Typography variant='h3'>List</Typography>
      <div
        className='flex flex-col gap-2 overflow-y-auto max-h-56'
        data-testid='rooms'>
        {rooms.map((element) => {
          // TODO add name room, nbr player, owner, options
          return (
            <div
              key={element}
              className='flex justify-around items-baseline mr-3'>
              <span className='grow'>{element}</span>
              <Btn
                onClick={() => {
                  joinRoom(element);
                }}>
                Join
              </Btn>
            </div>
          );
        })}
      </div>
    </div>
  );
};
