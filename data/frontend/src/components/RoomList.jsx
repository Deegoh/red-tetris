import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { Btn } from './Btn.jsx';
import { useCallback } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { useNotification } from 'src/app/notifications.jsx';

export const RoomList = ({ pseudo }) => {
  const rooms = useSelector((state) => state.common.rooms);
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

  const TABLE_HEAD = ['Id', 'Owner', 'Players', ''];

  return (
    <div>
      <Typography variant='h3'>List</Typography>

      <div className='overflow-y-auto max-h-56'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-b border-dark-red p-4'>
                  <Typography variant='h4'>{head}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map(({ id, owner, actives }, index) => {
              const isLast = index === rooms.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-dark-red';

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography>{id}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography>{owner}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography>{actives}</Typography>
                  </td>
                  <td className={classes + ' text-center'}>
                    <Btn
                      onClick={() => {
                        joinRoom(id);
                      }}>
                      Join
                    </Btn>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
