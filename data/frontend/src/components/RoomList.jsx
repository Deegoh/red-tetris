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
  const TABLE_HEAD = ['Id', 'Owner', 'Players', ''];

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

      <div className='overflow-y-auto max-h-56'>
        <div className='grid grid-cols-4 auto-cols-max'>
          {TABLE_HEAD.map((head) => (
            <Typography
              key={head}
              className={'border-b border-dark-red p-1 md:p-4'}
              variant='h4'>
              {head}
            </Typography>
          ))}
          {rooms.map(({ id, owner, actives }, index) => {
            const isLast = index === rooms.length - 1;
            const classes = isLast
              ? 'p-1 md:p-4'
              : 'p-1 md:p-4 border-b border-dark-red';

            return (
              <div key={id} className='contents'>
                <Typography className={classes}>{id}</Typography>
                <Typography className={classes}>{owner}</Typography>
                <Typography className={classes}>{actives}</Typography>
                <div className={classes + ' text-center'}>
                  <Btn
                    className='!px-1 !py-0'
                    onClick={() => {
                      joinRoom(id);
                    }}>
                    Join
                  </Btn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
