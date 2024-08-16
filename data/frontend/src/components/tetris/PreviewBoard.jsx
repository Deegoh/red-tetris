import { useSelector } from 'react-redux';
import { Board } from './Board.jsx';

export const PreviewBoard = () => {
  const { pseudo, board, score } = useSelector((state) => state.game.preview);

  return (
    <div className='grid grid-flow-row auto-rows-max'>
      <Board board={board} mode='view' player={`${pseudo} - ${score}`} />
    </div>
  );
};
