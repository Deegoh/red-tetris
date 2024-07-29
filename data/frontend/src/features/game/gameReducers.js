const initialState = {
  roomId: 0,
  status: 'idle',
};

export const MOVE_RIGHT_ACTION = 'MOVE_RIGHT_ACTION';
export const MOVE_LEFT_ACTION = 'MOVE_LEFT_ACTION';
export const ROTATE_ACTION = 'ROTATE_ACTION';
export const MOVE_DOWN_ACTION = 'MOVE_DOWN_ACTION';
export const PAUSE_ACTION = 'PAUSE_ACTION';
export const PLAY_ACTION = 'PLAY_ACTION';
export const RESTART_ACTION = 'RESTART_ACTION';

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_RIGHT_ACTION:
      console.log('reducer move right');
      return state;
    case MOVE_LEFT_ACTION:
      console.log('reducer move left');
      return state;
    case ROTATE_ACTION:
      console.log('reducer rotate');
      return state;
    case MOVE_DOWN_ACTION:
      console.log('reducer move down');
      return state;
    case PAUSE_ACTION:
      console.log('reducer pause');
      return state;
    case PLAY_ACTION:
      console.log('reducer play');
      return action.payload;
    case RESTART_ACTION:
      console.log('reducer reset');
      return action.payload;
    default:
      return state;
  }
};