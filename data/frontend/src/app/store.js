import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import {roomSlice} from '../features/rooms/roomSlice'

//Tuto here https://react-redux.js.org/tutorials/quick-start

export default configureStore({
    reducer: {
        counter: counterReducer,
        rooms: roomSlice.reducer,
    },
})

