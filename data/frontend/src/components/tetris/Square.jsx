import { emptyColor } from './tetrominoes.js';
import useBreakpoint from './useBreakpoint.jsx';

export const Square = ({ ghost = false, color, position, mode = 'player' }) => {
  const screen = useBreakpoint();

  const childClassesVariants = {
    I: 'bg-tile-I',
    O: 'bg-tile-O',
    T: 'bg-tile-T',
    L: 'bg-tile-L',
    J: 'bg-tile-J',
    S: 'bg-tile-S',
    Z: 'bg-tile-Z',
    '.': 'bg-tile',
  };

  const shadowVariants = {
    I: 'shadow-ghost shadow-tile-I/40',
    O: 'shadow-ghost shadow-tile-O/40',
    T: 'shadow-ghost shadow-tile-T/40',
    L: 'shadow-ghost shadow-tile-L/40',
    J: 'shadow-ghost shadow-tile-J/40',
    S: 'shadow-ghost shadow-tile-S/40',
    Z: 'shadow-ghost shadow-tile-Z/40',
  };

  const parentClassesVariants = {
    I: 'border-[5px] border-b-tile-I/35 border-t-tile-I/85 border-x-tile-I/60',
    O: 'border-[5px] border-b-tile-O/35 border-t-tile-O/85 border-x-tile-O/60',
    T: 'border-[5px] border-b-tile-T/35 border-t-tile-T/85 border-x-tile-T/60',
    L: 'border-[5px] border-b-tile-L/35 border-t-tile-L/85 border-x-tile-L/60',
    J: 'border-[5px] border-b-tile-J/35 border-t-tile-J/85 border-x-tile-J/60',
    S: 'border-[5px] border-b-tile-S/35 border-t-tile-S/85 border-x-tile-S/60',
    Z: 'border-[5px] border-b-tile-Z/35 border-t-tile-Z/85 border-x-tile-Z/60',
    '.': '',
  };

  let size = 35;

  switch (screen) {
    case 'xs':
    case 'sm':
      size = 20;
      break;
    case 'md':
      size = 30;
      break;
  }
  if (mode !== 'player') {
    size /= 2;
  }

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

  return (
    <div
      style={{ '--tile-size': `${size}px` }}
      data-position={position}
      className={`rounded size-tile ${parentClasses}`}>
      <div className={`size-full ${childClasses}`} />
    </div>
  );
};
