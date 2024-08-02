import { Board } from './tetris/Board.jsx';
import { PreviewTetrominoes } from './tetris/PreviewBlock.jsx';
import { Score } from './tetris/Score.jsx';
import { ControlsStore } from './tetris/ControlsStore.jsx';
import { Btn } from './Btn.jsx';
import { useDispatch } from 'react-redux';
import { gameRestarted, gameStarted } from '../features/game/gameSlice.js';

export const Game = () => {
  const dispatch = useDispatch();

  return (
    <div className='flex mx-auto gap-4'>
      <div className='flex flex-col gap-4'>
        <Score />
        <Btn
          onClick={() => {
            dispatch(gameStarted());
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
