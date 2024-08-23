import { useSelector } from 'react-redux';
import { Board } from './Board.jsx';
import useBreakpoint from './useBreakpoint.jsx';

export const PreviewBoard = () => {
  const previews = useSelector((state) => state.game.previews);
  const screen = useBreakpoint();

  return (
    <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 max-h-[52vh] h-fit overflow-y-scroll pr-4'>
      {Object.values(previews).map((p) => {
        return (
          <Board
            key={p.pseudo}
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
