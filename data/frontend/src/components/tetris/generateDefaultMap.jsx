import { emptyColor } from './tetrominoes.js';
import { cols, rows } from './Board.jsx';

export const generateDefaultMap = () => {
  return Array(rows)
    .fill(rows)
    .map(() => Array(cols).fill(emptyColor));
};
