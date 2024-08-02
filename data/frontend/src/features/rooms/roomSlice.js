import {createSlice} from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        value: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,],
    },
    reducers: {
        setRooms: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {setRooms} = roomSlice.actions
