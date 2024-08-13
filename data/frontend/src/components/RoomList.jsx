import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { Btn } from './Btn.jsx';
import { useCallback } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { useNotification } from 'src/app/notifications.jsx';

export const RoomList = ({ className, pseudo }) => {
  const rooms = useSelector((state) => state.common.rooms);
  const { socket } = useSocket();
  const TABLE_HEAD = ['Id', 'Owner', 'Players', ''];

  const joinRoom = useCallback(
    (room) => {
      if (socket !== undefined) {
        socket.emit('joinRoom', { pseudo: pseudo, room: room });
      }
    },
    [pseudo, socket]
  );

  return (
    <div className={className}>
      <Typography variant='h3'>Room List</Typography>

      <div className='overflow-y-auto mx-auto w-[80%]'>
        <div className='grid grid-cols-4 auto-cols-max'>
          {TABLE_HEAD.map((head) => (
            <Typography
              key={head}
              variant={'lead'}
              className={'text-bold border-b border-dark-red py-2'}>
              {head}
            </Typography>
          ))}
          {rooms.map(({ id, owner, actives }, index) => {
            const isLast = index === rooms.length - 1;
            const classes = isLast
              ? 'py-2 break-all'
              : 'py-2 break-all border-b border-dark-red';

            return (
              <div key={id} className='contents' data-testid='room'>
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
