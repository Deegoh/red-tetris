import { generateDefaultMap } from '../../components/tetris/generateDefaultMap.jsx';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: 0,
  status: 'idle',
  previewTetrominoId: undefined,
  previewTetromino: undefined,
  holdTetrominoId: undefined,
  holdTetromino: undefined,
  score: 0,
  rows: 0,
  level: 0,
  incomingGarbage: undefined,
  boardId: -1,
  board: generateDefaultMap(),
  preview: {
    pseudo: undefined,
    score: 0,
    boardId: -1,
    board: undefined,
  },
  gameState: undefined,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    tetrominoPreviewUpdated: (state, action) => {
      if (state.previewTetrominoId !== action.payload.id) {
        state.previewTetrominoId = action.payload.id;
        state.previewTetromino = action.payload.form;
      }
    },
    tetrominoHoldUpdated: (state, action) => {
      if (state.holdTetrominoId !== action.payload.id) {
        state.holdTetrominoId = action.payload.id;
        state.holdTetromino = action.payload.form;
      }
    },
    boardUpdated: (state, action) => {
      if (state.boardId !== action.payload.id) {
        state.boardId = action.payload.id;
        state.board = action.payload.board;
      }
    },
    updatePreview: (state, action) => {
      if (state.preview.boardId !== action.payload.boardState.id) {
        state.preview.pseudo = action.payload.pseudo;
        state.preview.score = action.payload.score;
        state.preview.boardId = action.payload.boardState.id;
        state.preview.board = action.payload.boardState.board;
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
  tetrominoHoldUpdated,
  boardUpdated,
  updatePreview,
  updateScore,
  updateRows,
  updateLevel,
  updateGarbage,
  updateGameState,
} = gameSlice.actions;

export default gameSlice.reducer;
