import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameSlice from '../features/game/gameSlice.js';
import { roomSlice } from '../features/rooms/roomSlice';

//Tuto here https://react-redux.js.org/tutorials/quick-start

export default configureStore({
  // TODO: maybe we can split some logic to multiple reducer
  reducer: {
    counter: counterReducer,
    game: gameSlice,
    rooms: roomSlice.reducer,
  },
});
