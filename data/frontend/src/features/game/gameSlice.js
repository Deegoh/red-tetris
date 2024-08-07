import { generateDefaultMap } from '../../components/tetris/generateDefaultMap.jsx';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: 0,
  status: 'idle',
  previewTermino: 'default',
  rotation: 0,
  score: 0,
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
      state.rotation = 0;
      state.previewTermino = action.payload;
    },
    boardUpdated: (state, action) => {
      state.board = action.payload;
    },
    updateScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const {
  gameStarted,
  gameRestarted,
  tetrominoPreviewUpdated,
  boardUpdated,
  updateScore,
} = gameSlice.actions;

export default gameSlice.reducer;
