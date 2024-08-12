import { Board } from './tetris/Board.jsx';
import { PreviewTetrominoes } from './tetris/PreviewBlock.jsx';
import { Score } from './tetris/Score.jsx';
import { ControlsStore } from './tetris/ControlsStore.jsx';
import { Btn } from './Btn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { gameRestarted } from '../features/game/gameSlice.js';
import { PreviewBoard } from './tetris/PreviewBoard.jsx';
import useBreakpoint from './tetris/useBreakpoint.jsx';
import { useSocket } from 'src/app/socket.jsx';
import { useEffect, useState } from 'react';
import { useNotification } from 'src/app/notifications.jsx';
import { GarbageBar } from './tetris/GarbageBar.jsx';

export const Game = () => {
  const screen = useBreakpoint();
  const [pseudo, setPseudo] = useState(undefined);
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { addNotif } = useNotification();
  const owner = useSelector((state) => state.game.gameState?.owner);
  const gameStatus = useSelector((state) => state.game.gameState?.status);
  const previewMode = useSelector((state) => state.game.previewTetromino);
  const holdMode = useSelector((state) => state.game.holdTetromino);

  useEffect(() => {
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
      setPseudo(user);
    } else {
      addNotif('Socket not loaded (yet?)', 'error');
    }
  }, [addNotif, socket]);

  return (
    <>
      <ControlsStore />

      <div className={'flex flex-col items-center justify-center gap-4'}>
        <div className={'mx-auto flex gap-4'}>
          <div className='flex flex-col gap-4 justify-between'>
            <PreviewTetrominoes tetromino={holdMode}>Hold</PreviewTetrominoes>
            <GarbageBar />
          </div>

          <Board />

          <div className='flex flex-col gap-4 justify-between'>
            <PreviewTetrominoes tetromino={previewMode}>
              Preview
            </PreviewTetrominoes>
            <Score justify='left' />
          </div>
        </div>
        {/*{screen !== 'xs' && <PreviewBoard />}*/}

        <div className='flex flex-row gap-4 mx-auto'>
          {owner === pseudo && gameStatus === 'waiting' && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
