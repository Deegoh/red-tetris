import { Board } from './tetris/Board.jsx';
import { PreviewBlock } from './tetris/PreviewBlock.jsx';
import { Score } from './tetris/Score.jsx';
import { ControlsStore } from './tetris/ControlsStore.jsx';
import { Btn } from './Btn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { gameRestarted } from '../features/game/gameSlice.js';
import { useSocket } from 'src/app/socket.jsx';
import { GarbageBar } from './tetris/GarbageBar.jsx';
import { PreviewBoard } from './tetris/PreviewBoard.jsx';
import useBreakpoint from './tetris/useBreakpoint.jsx';
import { useNavigate } from 'react-router-dom';

export const Game = ({ pseudo }) => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const screen = useBreakpoint();
  const owner = useSelector((state) => state.game.gameState?.owner);
  const gameStatus = useSelector((state) => state.game.gameState?.status);
  const previewMode = useSelector((state) => state.game.previewTetromino);
  const holdMode = useSelector((state) => state.game.holdTetromino);
  const board = useSelector((state) => state.game.board);
  const navigate = useNavigate();

  return (
    <>
      <ControlsStore />
      <div className={'flex'}>
        <Btn onClick={() => navigate('/')}>Back</Btn>
      </div>

      <div className={'m-auto flex flex-col gap-4'}>
        <div className={'mx-auto flex gap-4'}>
          <div className='flex flex-col gap-4 justify-between'>
            <PreviewBlock tetromino={holdMode}>Hold</PreviewBlock>
            <GarbageBar />
          </div>

          <Board board={board} />

          <div className='flex flex-col gap-4 justify-between'>
            <PreviewBlock tetromino={previewMode}>Preview</PreviewBlock>
            <Score justify='left' />
          </div>
          {!['xs', 'sm'].includes(screen) && <PreviewBoard />}
        </div>

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
