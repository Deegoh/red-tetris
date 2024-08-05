import { generateDefaultMap } from '../../components/tetris/Board.jsx';
import { createSlice } from '@reduxjs/toolkit';
import { tetrominoesBlocks } from '../../components/tetris/tetrominoes.js';

const initialState = {
  roomId: 0,
  status: 'idle',
  previewTermino: 'default',
  rotation: 0,
  score: 0,
  board: generateDefaultMap(),
};

const getNextRotation = (game) => {
  const nextRotation = parseInt(game.rotation) + 1;
  const nbrRotation = tetrominoesBlocks[game.previewTermino].length;
  if (nextRotation >= nbrRotation) {
    return 0;
  }
  return nextRotation;
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
    tetrominoRightMoved: (state) => {},
    tetrominoLeftMoved: (state) => {},
    tetrominoSoftDropped: (state) => {},
    tetrominoHardDropped: (state) => {},
    tetrominoPreviewUpdated: (state, action) => {
      state.rotation = 0;
      state.previewTermino = action.payload;
    },
    tetrominoRotated: (state) => {
      state.rotation = getNextRotation(state);
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
  tetrominoRightMoved,
  tetrominoLeftMoved,
  tetrominoSoftDropped,
  tetrominoHardDropped,
  tetrominoPreviewUpdated,
  tetrominoRotated,
  boardUpdated,
  updateScore,
} = gameSlice.actions;

export default gameSlice.reducer;
