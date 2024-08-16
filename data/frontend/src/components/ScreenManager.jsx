import { Typography } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { Btn } from './Btn.jsx';
import { PseudoInput } from './PseudoInput.jsx';
import { useSocket } from 'src/app/socket.jsx';
import { Game } from './Game.jsx';
import { ConnectionScreen } from './ConnectionScreen.jsx';
import { useNavigate } from 'react-router-dom';

export const ScreenManager = () => {
  const [pseudo, setPseudo] = useState('');
  const [displayRooms, setDisplayRooms] = useState(false);

  const hash =
    window?.location?.hash?.length > 0 ? window.location.hash : undefined;

  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash === '' || hash === undefined) {
      return;
    }

    const value = hash.slice(1);
    const firstBracket = value.indexOf('[');
    const lastBracket = value.lastIndexOf(']');

    if (firstBracket === -1 || lastBracket === -1) {
      return;
    }

    const room = value.slice(0, firstBracket);
    const user = value.slice(firstBracket + 1, lastBracket);

    if (socket !== undefined) {
      socket.emit('connectRoom', { pseudo: user, room: room });
      setPseudo(user);
    }
  }, [hash, socket]);

  return (
    <>
      {(hash === undefined &&
        ((displayRooms === true && (
          <ConnectionScreen pseudo={pseudo} setPseudo={setPseudo} />
        )) || (
          <div className='m-auto w-fit flex flex-col gap-4 p-8 shadow-xl rounded text-center bg-gradient-107 from-dark-red from-10% to-light-red to-90%'>
            <Typography variant='h1' className='font-[Tetris] py-4'>
              Red Tetris
            </Typography>
            <Typography variant='h2' className='pb-8'>
              New way to play Tetris
            </Typography>
            <PseudoInput pseudo={pseudo} setPseudo={setPseudo}>
              <Btn
                onClick={() => {
                  setDisplayRooms(true);
                }}>
                Play
              </Btn>
              <Btn
                className={'mt-4'}
                onClick={() => {
                  navigate('/leaderboard');
                }}>
                Leaderboard
              </Btn>
            </PseudoInput>

            <></>
          </div>
        ))) || <Game pseudo={pseudo} />}
    </>
  );
};
