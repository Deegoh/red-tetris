const initialState = {
  roomId: 0,
  status: 'idle',
  previewTermino: 'default',
  rotation: 0,
};

export const MOVE_RIGHT_ACTION = 'MOVE_RIGHT_ACTION';
export const MOVE_LEFT_ACTION = 'MOVE_LEFT_ACTION';
export const ROTATE_ACTION = 'ROTATE_ACTION';
export const MOVE_DOWN_ACTION = 'MOVE_DOWN_ACTION';
export const PAUSE_ACTION = 'PAUSE_ACTION';
export const PLAY_ACTION = 'PLAY_ACTION';
export const RESTART_ACTION = 'RESTART_ACTION';
export const SET_PREVIEW_ACTION = 'SET_PREVIEW_ACTION';

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_RIGHT_ACTION:
      return state;
    case MOVE_LEFT_ACTION:
      return state;
    case ROTATE_ACTION:
      return action.payload;
    case MOVE_DOWN_ACTION:
      return state;
    case PAUSE_ACTION:
      return state;
    case PLAY_ACTION:
      return action.payload;
    case RESTART_ACTION:
      return action.payload;
    case SET_PREVIEW_ACTION:
      return action.payload;
    default:
      return state;
  }
};