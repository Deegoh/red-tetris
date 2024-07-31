import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  tetrominoHardDropped,
  tetrominoLeftMoved,
  tetrominoRightMoved,
  tetrominoRotated,
  tetrominoSoftDropped
} from "../../features/game/gameSlice.js";

// Left and right arrows: Horizontal move to the right or left
// Top arrow: Rotation (only one direction is enough)
// Down arrow: Fall towards the pile
// Spacebar: Vertical move to position a piece in a hole in the pile

export const ControlsStore = () => {
  const game = useSelector(state => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (game.status !== "running") {
        return;
      }

      const keyCode = event.code;
      if (keyCode === 'ArrowUp' || keyCode === 'KeyW') {
        dispatch(tetrominoRotated());
      }
      if (keyCode === 'ArrowLeft' || keyCode === 'KeyA') {
        dispatch(tetrominoLeftMoved());
      }
      if (keyCode === 'ArrowDown' || keyCode === 'KeyS') {
        dispatch(tetrominoSoftDropped());
      }
      if (keyCode === 'ArrowRight' || keyCode === 'KeyD') {
        dispatch(tetrominoRightMoved());
      }
      if (keyCode === 'Space') {
        dispatch(tetrominoHardDropped());
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [game]);
};