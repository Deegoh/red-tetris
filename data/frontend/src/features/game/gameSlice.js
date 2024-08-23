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
  previews: {},
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
    resetPreviews: (state) => {
      state.previews = {};
    },
    updatePreviews: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const k = action.payload[i].pseudo;

        if (!Object.keys(state.previews).includes(k)) {
          state.previews[k] = { boardId: -1 };
        }
        if (state.previews[k].boardId !== action.payload[i].boardState.id) {
          state.previews[k].pseudo = k;
          state.previews[k].score = action.payload[i].score;
          state.previews[k].boardId = action.payload[i].boardState.id;
          state.previews[k].board = action.payload[i].boardState.board;
        }
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
  tetrominoPreviewUpdated,
  tetrominoHoldUpdated,
  boardUpdated,
  resetPreviews,
  updatePreviews,
  updateScore,
  updateRows,
  updateLevel,
  updateGarbage,
  updateGameState,
} = gameSlice.actions;

export default gameSlice.reducer;
