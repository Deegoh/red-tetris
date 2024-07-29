import {Board} from "./tetris/Board.jsx";
import {PreviewBlock} from "./tetris/PreviewBlock.jsx";
import {Score} from "./tetris/Score.jsx";
import {Btn} from "./Btn.jsx";

export const Game = () => {
  return (
    <div className="flex mx-auto gap-4">
      <div className="flex flex-col gap-4">
        <Score>Score:<br/>...</Score>
        <Btn onClick={()=>{console.log('Play')}}>Play</Btn>
        <Btn onClick={()=>{console.log('Reset')}}>Reset</Btn>
      </div>
      <Board/>
      <PreviewBlock/>
    </div>
  );
};