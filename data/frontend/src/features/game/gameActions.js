import {
  MOVE_DOWN_ACTION,
  MOVE_LEFT_ACTION,
  MOVE_RIGHT_ACTION,
  PAUSE_ACTION,
  PLAY_ACTION,
  RESTART_ACTION,
  ROTATE_ACTION,
  SET_PREVIEW_ACTION,
} from "./gameReducers.js";
import {tetrominoesBlocks} from "../../components/tetris/tetrominoes.js";

export const moveRightAction = () => {
  return {type: MOVE_RIGHT_ACTION}
}

export const moveLeftAction = () => {
  return {type: MOVE_LEFT_ACTION}
}

const getNextRotation = (game) => {
  const nextRotation = parseInt(game.rotation) + 1;
  const nbrRotation = tetrominoesBlocks[game.previewTermino].length;
  if (nextRotation >= nbrRotation) {
    return 0;
  }
  return parseInt(nextRotation);
};

export const rotateAction = (game) => {
  const nextRotation = getNextRotation(game);
  return {
    type: ROTATE_ACTION,
    payload: {...game, rotation: nextRotation}
  }
}

export const moveDownAction = () => {
  return {type: MOVE_DOWN_ACTION}
}

export const pauseAction = () => {
  return {type: PAUSE_ACTION}
}

export const playAction = (game) => {
  return {
    type: PLAY_ACTION,
    payload: {...game, status: 'running'}
  }
}

export const restartAction = (game) => {
  return {
    type: RESTART_ACTION,
    payload: {...game, status: 'restart'}
  }
}

export const setPreviewTerminoAction = (game, termino) => {
  return {
    type: SET_PREVIEW_ACTION,
    payload: {...game, previewTermino: termino, rotation: 0}
  }
}