import { useSelector } from 'react-redux';

export const GarbageBar = () => {
  const garbageValue = useSelector((state) => state.game.incomingGarbage);

  return (
    garbageValue !== undefined && (
      <div className='bg-board rounded-full h-full w-4 md:w-8 p-1 content-end place-self-end'>
        <div
          style={{ height: `${garbageValue * 5}%` }}
          className={`shadow-ghost shadow-tile-W/35 bg-tile-W w-full rounded-full mx-auto`}
        />
      </div>
    )
  );
};
