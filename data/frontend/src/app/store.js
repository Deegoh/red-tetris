import { configureStore } from '@reduxjs/toolkit';
import gameSlice from '../features/game/gameSlice.js';
import { commonSlice } from '../features/common/commonSlice';

//Tuto here https://react-redux.js.org/tutorials/quick-start

export default configureStore({
  // TODO: maybe we can split some logic to multiple reducer
  reducer: {
    game: gameSlice,
    common: commonSlice.reducer,
  },
});
