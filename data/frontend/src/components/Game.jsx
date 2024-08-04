import { Board } from './tetris/Board.jsx';
import { PreviewTetrominoes } from './tetris/PreviewBlock.jsx';
import { Score } from './tetris/Score.jsx';
import { ControlsStore } from './tetris/ControlsStore.jsx';
import { Btn } from './Btn.jsx';
import { useDispatch } from 'react-redux';
import { gameRestarted, gameStarted } from '../features/game/gameSlice.js';
import { useSocket } from 'src/app/socket.jsx';
import { useEffect } from 'react';
import { useNotification } from 'src/app/notifications.jsx';

export const Game = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { addNotif } = useNotification();

  useEffect(() => {
    addNotif('in', 'info');

    const hash = window.location.hash;
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
    } else {
      addNotif('Socket not loaded (yet?)', 'error');
    }
  }, [addNotif, socket]);

  return (
    <div className='flex mx-auto gap-4'>
      <div className='flex flex-col gap-4'>
        <Score />
        <Btn
          onClick={() => {
            socket.emit('startGame');
          }}>
          Play
        </Btn>
        <Btn
          onClick={() => {
            dispatch(gameRestarted());
          }}>
          Restart
        </Btn>
      </div>
      <Board />
      <PreviewTetrominoes />
      <ControlsStore />
      {/* TODO: add message alert like countdown or whatever*/}
    </div>
  );
};
