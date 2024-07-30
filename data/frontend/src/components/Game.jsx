import {Board} from "./tetris/Board.jsx";
import {PreviewTetrominoes} from "./tetris/PreviewBlock.jsx";
import {Score} from "./tetris/Score.jsx";
import {ControlsStore} from "./tetris/ControlsStore.jsx";
import {Btn} from "./Btn.jsx";
import {useDispatch, useSelector} from "react-redux";
import {playAction, restartAction} from "../features/game/gameActions.js";

export const Game = () => {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game);

  return (
    <>
      <div className="flex mx-auto gap-4">
        <div className="flex flex-col gap-4">
          <Score>Score:<br/>...</Score>
          <Btn onClick={() => {
            dispatch(playAction(game));
          }}>Play</Btn>
          <Btn onClick={() => {
            dispatch(restartAction(game));
          }}>Restart</Btn>
        </div>
        <Board board={game.board}/>
        <PreviewTetrominoes rotation={game.rotation} shape={game.previewTermino}/>
        <ControlsStore/>
        {/* TODO: add message alert like countdown or whatever*/}
      </div>
    </>
  );
};