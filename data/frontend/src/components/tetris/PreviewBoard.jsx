import { useSelector } from 'react-redux';
import { Board } from './Board.jsx';

export const PreviewBoard = () => {
  const previews = useSelector((state) => state.game.previews);

  return (
    <div className='grid grid-cols-2 grid-flow-row auto-rows-max gap-2'>
      {Object.values(previews).map((p) => {
        return (
          <Board
            key={previews.pseudo}
            board={p.board}
            mode='view'
            player={p.pseudo}
            score={p.score}
          />
        );
      })}
    </div>
  );
};
