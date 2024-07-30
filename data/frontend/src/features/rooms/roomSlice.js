import {createSlice} from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        value: [],
    },
    reducers: {
        setRooms: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {setRooms} = roomSlice.actions
