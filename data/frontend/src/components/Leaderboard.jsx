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
      <div className='container min-h-[70vh] rounded m-auto p-6 flex flex-col bg-gradient-107 from-dark-red from-10% to-light-red to-90%'>
        <Typography className={'text-center'} variant='h3'>
          Leaderboard
        </Typography>

        <div className='text-center grid grid-cols-2 overflow-y-auto max-h-[70vh] pr-4'>
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

          {(leaderboard &&
            leaderboard.map((v, index) => {
              const isLast = index === leaderboard.length - 1;
              const classes = isLast
                ? 'py-2 break-all'
                : 'py-2 break-all border-b border-dark-red';

              return (
                <div key={v.id} className={'contents'} data-testid='scoreLine'>
                  <Typography className={classes}>{v.pseudo}</Typography>
                  <Typography className={classes}>{v.score}</Typography>
                </div>
              );
            })) || (
            <div className='py-4 col-span-2 mx-auto'>
              <Spinner className='m-auto w-12 h-12' />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
