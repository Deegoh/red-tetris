import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    rooms: [],
    leaderboard: undefined,
    pseudo: undefined,
    gameSettings: {
      garbageType: 'full',
      bagType: '2',
      difficulty: 7,
      hold: '0',
      preview: '1',
    },
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },
    setGarbageType: (state, action) => {
      state.gameSettings.garbageType = action.payload;
    },
    setBagType: (state, action) => {
      state.gameSettings.bagType = action.payload;
    },
    setDifficulty: (state, action) => {
      state.gameSettings.difficulty = action.payload;
    },
    setHold: (state, action) => {
      state.gameSettings.hold = action.payload;
    },
    setPreview: (state, action) => {
      state.gameSettings.preview = action.payload;
    },
    setPseudo: (state, action) => {
      state.pseudo = action.payload;
    },
  },
});

export const {
  setRooms,
  setLeaderboard,
  setGarbageType,
  setBagType,
  setDifficulty,
  setHold,
  setPreview,
  setPseudo,
} = commonSlice.actions;
