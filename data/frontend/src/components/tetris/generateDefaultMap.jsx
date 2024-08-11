import { emptyColor, cols, rows } from './const.jsx';

export const generateDefaultMap = () => {
  return Array(rows)
    .fill(rows)
    .map(() => Array(cols).fill(emptyColor));
};
