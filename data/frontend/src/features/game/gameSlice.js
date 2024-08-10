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
  boardId: -1,
  board: generateDefaultMap(),
  gameState: undefined,
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
    updateGameState: (state, action) => {
      state.gameState = action.payload;
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
  updateGameState,
} = gameSlice.actions;

export default gameSlice.reducer;
