import { rows, emptyColor } from './const.jsx';
import useBreakpoint from './useBreakpoint.jsx';

export const Square = ({ ghost, color, position, mode = 'player' }) => {
  const screen = useBreakpoint();

  if (color === 'U') {
    color = 'W';
  }

  const childClassesVariants = {
    I: 'bg-tile-I',
    O: 'bg-tile-O',
    T: 'bg-tile-T',
    L: 'bg-tile-L',
    J: 'bg-tile-J',
    S: 'bg-tile-S',
    Z: 'bg-tile-Z',
    W: 'bg-tile-W',
    '.': 'bg-tile',
  };

  const shadowVariants = {
    I: 'shadow-ghost shadow-tile-I/30',
    O: 'shadow-ghost shadow-tile-O/30',
    T: 'shadow-ghost shadow-tile-T/30',
    L: 'shadow-ghost shadow-tile-L/30',
    J: 'shadow-ghost shadow-tile-J/30',
    S: 'shadow-ghost shadow-tile-S/30',
    Z: 'shadow-ghost shadow-tile-Z/30',
    W: 'shadow-ghost shadow-tile-W/30',
  };

  const resize = () => {
    const height = window.innerHeight;
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

    if (height < sizeTile * rows) {
      sizeTile *= 0.6;
    }

    if (mode === 'view') {
      sizeTile *= 0.2;
    }

    return sizeTile;
  };

  const size = resize();
  const sizeShadow = Math.floor(size / 4);

  const parentClassesVariants = {
    I: 'border-tile border-b-tile-I/35 border-t-tile-I/85 border-x-tile-I/60',
    O: 'border-tile border-b-tile-O/35 border-t-tile-O/85 border-x-tile-O/60',
    T: 'border-tile border-b-tile-T/35 border-t-tile-T/85 border-x-tile-T/60',
    L: 'border-tile border-b-tile-L/35 border-t-tile-L/85 border-x-tile-L/60',
    J: 'border-tile border-b-tile-J/35 border-t-tile-J/85 border-x-tile-J/60',
    S: 'border-tile border-b-tile-S/35 border-t-tile-S/85 border-x-tile-S/60',
    Z: 'border-tile border-b-tile-Z/35 border-t-tile-Z/85 border-x-tile-Z/60',
    W: 'border-tile border-b-tile-W/35 border-t-tile-W/85 border-x-tile-W/60',
    '.': '',
  };

  let parentClasses = parentClassesVariants[color];
  let childClasses = childClassesVariants[color];

  if (ghost) {
    childClasses += '/70';
    parentClasses += ' ' + shadowVariants[color];
  }

  if (size > 10 && color === emptyColor) {
    childClasses += ' rounded';
  } else if (color === emptyColor) {
    childClasses += ' rounded-[2px]';
  }

  const style = {
    '--tile-size': `${size}px`,
    '--shadow-size': `${sizeShadow}px`,
  };

  return (
    <div
      style={style}
      data-position={position}
      className={`rounded size-tile ${parentClasses}`}
      data-testid='square'>
      <div className={`size-full ${childClasses}`} />
    </div>
  );
};
