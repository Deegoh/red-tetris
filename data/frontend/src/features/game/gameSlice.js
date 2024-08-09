import { generateDefaultMap } from '../../components/tetris/generateDefaultMap.jsx';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: 0,
  status: 'idle',
  previewTetrominoId: undefined,
  previewTetromino: undefined,
  score: 0,
  rows: 0,
  level: 0,
  incomingGarbage: 0,
  boardId: -1,
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
      if (state.previewTetrominoId !== action.payload.id) {
        state.previewTetrominoId = action.payload.id;
        state.previewTetromino = action.payload.form;
      }
    },
    boardUpdated: (state, action) => {
      if (state.boardId !== action.payload.id) {
        state.boardId = action.payload.id;
        state.board = action.payload.board;
      }
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
