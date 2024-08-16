import { useSelector } from 'react-redux';
import useBreakpoint from './useBreakpoint.jsx';

export const GarbageBar = () => {
  const garbageValue = useSelector((state) => state.game.incomingGarbage);
  const screen = useBreakpoint();

  const resize = () => {
    let sizeTile = 35;

    switch (screen) {
      case 'xs':
      case 'sm':
        sizeTile = 20;
        break;
      case 'md':
        sizeTile = 30;
        break;
    }

    return sizeTile;
  };

  const size = resize();

  const style = {
    width: `${size}px`,
  };

  return (
    <div
      style={style}
      className='bg-board rounded-full h-full p-1 content-end place-self-end'>
      <div
        style={{ height: `${garbageValue * 5}%` }}
        className={`shadow-ghost shadow-tile-W/35 bg-tile-W w-full rounded-full mx-auto`}
      />
    </div>
  );
};
