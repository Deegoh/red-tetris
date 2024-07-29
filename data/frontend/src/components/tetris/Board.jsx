import {Square} from "./Square.jsx";

export const Board = () => {
  const rows = 20;
  const cols = 10;
  let index = 0;
  const board = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      board.push(<Square position={index} key={index++} color="bg-tile"/>);
    }
  }

  return (
    <div className="board grid grid-cols-10 gap-0">
      {board}
    </div>);
};