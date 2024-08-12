import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useSocket } from 'src/app/socket.jsx';

export const Leaderboard = () => {
  const leaderboard = useSelector((state) => state.common.leaderboard);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket !== undefined) {
      socket.emit('getLeaderboard');
    }
  }, [socket]);

  return (
    <div className='bg-red-400 m-auto p-6 grid min-w-[60%] max-w-[80%]'>
      <Typography variant='h3'>Leaderboard</Typography>

      <div className='grid grid-cols-3'>
        <div>
          <Typography variant='h5'>Pseudo</Typography>
        </div>
        <div>
          <Typography variant='h5'>Score</Typography>
        </div>
        <div>
          <Typography variant='h5'>Settings</Typography>
        </div>
      </div>
      <hr />

      <div className='overflow-y'>
        {leaderboard.map((v) => {
          return (
            <div key={v.pseudo}>
              <div className='grid grid-cols-3'>
                <div>
                  <Typography>{v.pseudo}</Typography>
                </div>
                <div>
                  <Typography>{v.score}</Typography>
                </div>
                <div>
                  <Typography>{v.settings}</Typography>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
