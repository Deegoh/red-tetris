import { Dialog, Typography } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { Btn } from './Btn.jsx';
import { useSocket } from 'src/app/socket.jsx';
import { Game } from './Game.jsx';
import { Lobby } from './Lobby.jsx';
import { useNavigate } from 'react-router-dom';
import { setPseudo } from '../features/common/commonSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Credits } from './Credits.jsx';
import { Header } from './Header.jsx';
import { useNotification } from 'src/app/notifications.jsx';
import { resetPreviews } from '../features/game/gameSlice.js';

export const ScreenManager = () => {
  const [displayLobby, setDisplayLobby] = useState(false);
  const pseudo = useSelector((state) => state.common.pseudo);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { addNotif } = useNotification();

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
    dispatch(setPseudo(user));

    if (socket !== undefined) {
      dispatch(resetPreviews());
      socket.emit('connectRoom', { pseudo: user, room: room });
    }
  }, [hash, socket]);

  return (
    <>
      {(hash === undefined &&
        ((displayLobby === true && (
          <>
            <Header callbackPrev={() => setDisplayLobby(false)} />
            <Lobby />
          </>
        )) || (
          <>
            <Header
              className={'invisible'}
              callbackPrev={() => {
                navigate('/');
              }}
            />
            <div className='container min-h-[75vh] justify-center m-auto flex flex-col gap-4 shadow-xl rounded text-center bg-gradient-107 from-dark-red from-10% to-light-red to-90%'>
              <Typography variant='h1' className='font-[Tetris] py-4'>
                Red Tetris
              </Typography>
              <Typography variant='h2' className='pb-8'>
                New way to play Tetris
              </Typography>

              <div className='flex flex-col mx-auto text-left pb-4'>
                <label htmlFor='pseudoHome'>
                  <Typography variant={'lead'}>Pseudo</Typography>
                  <input
                    className='rounded mb-4'
                    id='pseudoHome'
                    data-testid='pseudo'
                    type='text'
                    defaultValue={pseudo}
                    onChange={(e) => dispatch(setPseudo(e.target.value))}
                    required={true}
                  />
                </label>
                <Btn
                  onClick={() => {
                    if (pseudo !== undefined && pseudo.length > 0) {
                      setDisplayLobby(true);
                    } //
                    else {
                      addNotif('Pseudo required', 'error');
                    }
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
                <Btn className={'mt-4'} onClick={handleOpen}>
                  Credits
                </Btn>
                <Dialog
                  className={'contents'}
                  open={open}
                  handler={handleOpen}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                  }}>
                  <Credits />
                </Dialog>
              </div>
            </div>
          </>
        ))) || <Game />}
    </>
  );
};
