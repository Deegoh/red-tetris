import { generateDefaultMap } from '../../components/tetris/generateDefaultMap.jsx';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: 0,
  status: 'idle',
  previewTerminoId: undefined,
  previewTermino: undefined,
  score: 0,
  rows: 0,
  level: 0,
  incomingGarbage: 0,
  board: generateDefaultMap(),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    gameStarted: (state) => {
      state.status = 'running';
    },
    gameRestarted: (state) => {
      state.status = 'idle';
    },
    tetrominoPreviewUpdated: (state, action) => {
      if (state.previewTerminoId !== action.payload.id) {
        state.previewTerminoId = action.payload.id;
        state.previewTermino = action.payload.form;
      }
    },
    boardUpdated: (state, action) => {
      state.board = action.payload;
    },
    updateScore: (state, action) => {
      state.score = action.payload;
    },
    updateRows: (state, action) => {
      state.rows = action.payload;
    },
    updateLevel: (state, action) => {
      state.level = action.payload;
    },
    updateGarbage: (state, action) => {
      state.incomingGarbage = action.payload;
    },
  },
});

export const {
  gameStarted,
  gameRestarted,
  tetrominoPreviewUpdated,
  boardUpdated,
  updateScore,
  updateRows,
  updateLevel,
  updateGarbage,
} = gameSlice.actions;

export default gameSlice.reducer;
