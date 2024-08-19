import { useSelector } from 'react-redux';
import { Spinner, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useSocket } from 'src/app/socket.jsx';
import { Header } from './Header.jsx';
import { useNavigate } from 'react-router-dom';

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
    <>
      <Header
        callbackPrev={() => {
          navigate('/');
        }}
      />
      <div className='rounded m-auto p-6 flex flex-col w-auto bg-gradient-107 from-dark-red from-10% to-light-red to-90%'>
        <div className='flex justify-between mb-4'>
          <Typography variant='h3'>Leaderboard</Typography>
        </div>

        <div className='grid grid-cols-3'>
          <Typography
            className={'text-bold border-b border-dark-red py-2'}
            variant='lead'>
            Pseudo
          </Typography>
          <div className={'text-bold border-b border-dark-red py-2'}></div>
          <Typography
            className={'text-bold border-b border-dark-red py-2'}
            variant='lead'>
            Score
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
                    key={v.id}
                    className={'contents'}
                    data-testid='scoreLine'>
                    <Typography className={classes}>{v.pseudo}</Typography>
                    <div className={classes} />
                    <Typography className={classes}>{v.score}</Typography>
                  </div>
                );
              })) || (
              <div className='py-4 items-center col-start-2'>
                <Spinner className='m-auto w-12 h-12' />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
