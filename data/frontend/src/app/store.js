import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import {roomSlice} from '../features/rooms/roomSlice'
import {gameReducer} from "../features/game/gameReducers.js";

//Tuto here https://react-redux.js.org/tutorials/quick-start

export default configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
    rooms: roomSlice.reducer,
  },
})