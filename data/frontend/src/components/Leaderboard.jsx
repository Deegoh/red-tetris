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
    <div className='m-auto p-6 flex flex-col max-h-[60%] min-w-[60%] max-w-[80%] bg-gradient-107 from-dark-red from-10% to-light-red to-90%'>
      <div className='flex justify-between'>
        <Typography variant='h3'>Leaderboard</Typography>

        <Btn
          onClick={() => {
            navigate('/');
          }}>
          Back
        </Btn>
      </div>

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

      <div className='overflow-y-scroll h-auto'>
        {(leaderboard &&
          leaderboard.map((v) => {
            return (
              <div key={v.pseudo}>
                <div className='grid grid-cols-3' data-testid='scoreLine'>
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
          })) || (
          <div className='py-4 items-center'>
            <Spinner className='m-auto w-12 h-12' />
          </div>
        )}
      </div>
    </div>
  );
};
