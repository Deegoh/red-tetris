import { useSelector } from 'react-redux';
import { Spinner, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { useNavigate } from 'react-router-dom';
import { Btn } from './Btn';

export const Leaderboard = () => {
  const leaderboard = useSelector((state) => state.common.leaderboard);
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket !== undefined) {
      socket.emit('getLeaderboard');
    }
  }, [socket]);

  return (
    <div className='rounded m-auto p-6 flex flex-col max-h-[60%] min-w-[60%] max-w-[80%] bg-gradient-107 from-dark-red from-10% to-light-red to-90%'>
      <div className='flex justify-between mb-4'>
        <Typography variant='h3'>Leaderboard</Typography>
        <Btn
          onClick={() => {
            navigate('/');
          }}>
          Back
        </Btn>
      </div>

      <div className='grid grid-cols-3'>
        <Typography
          className={'text-bold border-b border-dark-red py-2'}
          variant='lead'>
          Pseudo
        </Typography>
        <Typography
          className={'text-bold border-b border-dark-red py-2'}
          variant='lead'>
          Score
        </Typography>
        <Typography
          className={'text-bold border-b border-dark-red py-2'}
          variant='lead'>
          Settings
        </Typography>

        <div className='overflow-y-scroll h-auto contents'>
          {(leaderboard &&
            leaderboard.map((v, index) => {
              const isLast = index === leaderboard.length - 1;
              const classes = isLast
                ? 'py-2 break-all'
                : 'py-2 break-all border-b border-dark-red';

              return (
                <div
                  key={v.pseudo}
                  className={'contents'}
                  data-testid='scoreLine'>
                  <Typography className={classes}>{v.pseudo}</Typography>
                  <Typography className={classes}>{v.score}</Typography>
                  <Typography className={classes}>{v.settings}</Typography>
                </div>
              );
            })) || (
            <div className='py-4 items-center'>
              <Spinner className='m-auto w-12 h-12' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
