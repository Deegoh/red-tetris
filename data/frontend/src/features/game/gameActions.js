import {
  MOVE_DOWN_ACTION,
  MOVE_LEFT_ACTION,
  MOVE_RIGHT_ACTION,
  PAUSE_ACTION,
  PLAY_ACTION,
  RESTART_ACTION,
  ROTATE_ACTION
} from "./gameReducers.js";

export const moveRightAction = () => {
  return {type: MOVE_RIGHT_ACTION}
}

export const moveLeftAction = () => {
  return {type: MOVE_LEFT_ACTION}
}

export const rotateAction = () => {
  return {type: ROTATE_ACTION}
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