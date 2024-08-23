import { useSelector } from 'react-redux';
import { Board } from './Board.jsx';

export const PreviewBoard = () => {
  const previews = useSelector((state) => state.game.previews);

  return (
    <div className='grid grid-cols-[repeat(2,auto)] xl:grid-cols-[repeat(3,auto)] gap-2 max-h-[52vh] h-fit overflow-y-scroll pr-4'>
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
