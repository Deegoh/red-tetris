import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

//Tuto here https://react-redux.js.org/tutorials/quick-start

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})