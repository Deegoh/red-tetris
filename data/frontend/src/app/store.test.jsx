import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';

import { Provider, useSelector } from 'react-redux';

import store from './store';
import {
  setBagType,
  setDifficulty,
  setGarbageType,
  setHold,
  setLeaderboard,
  setPreview,
  setRooms,
} from 'src/features/common/commonSlice';
import {
  boardUpdated,
  tetrominoHoldUpdated,
  tetrominoPreviewUpdated,
  updateGameState,
  updateGarbage,
  updateLevel,
  updatePreview,
  updateRows,
  updateScore,
} from 'src/features/game/gameSlice';

describe('store', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('test real store', () => {
    render(<Provider store={store}></Provider>);
  });

  test('test common slice', async () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useSelector((state) => state.common), {
      wrapper,
    });

    expect(result.current.rooms.length).toBe(0);
    expect(result.current.leaderboard).toBeUndefined();
    expect(result.current.gameSettings.garbageType).toBe('full');
    expect(result.current.gameSettings.bagType).toBe('2');
    expect(result.current.gameSettings.difficulty).toBe(7);
    expect(result.current.gameSettings.hold).toBe('0');
    expect(result.current.gameSettings.preview).toBe('1');

    await act(() => {
      store.dispatch(setRooms([1]));
      store.dispatch(setLeaderboard([]));

      store.dispatch(setGarbageType('hole'));
      store.dispatch(setBagType(0));
      store.dispatch(setDifficulty(16));
      store.dispatch(setHold('1'));
      store.dispatch(setPreview('0'));
    });

    expect(result.current.rooms.length).toBe(1);
    expect(result.current.leaderboard).toBeDefined();
    expect(result.current.gameSettings.garbageType).toBe('hole');
    expect(result.current.gameSettings.bagType).toBe(0);
    expect(result.current.gameSettings.difficulty).toBe(16);
    expect(result.current.gameSettings.hold).toBe('1');
    expect(result.current.gameSettings.preview).toBe('0');
  });

  test('test game slice', async () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useSelector((state) => state.game), {
      wrapper,
    });

    expect(result.current.previewTetrominoId).toBeUndefined();
    expect(result.current.previewTetromino).toBeUndefined();
    expect(result.current.holdTetrominoId).toBeUndefined();
    expect(result.current.holdTetromino).toBeUndefined();
    expect(result.current.boardId).toBe(-1);

    expect(result.current.score).toBe(0);
    expect(result.current.rows).toBe(0);
    expect(result.current.level).toBe(0);
    expect(result.current.incomingGarbage).toBe(undefined);

    expect(result.current.gameState).toBeUndefined();

    await act(() => {
      store.dispatch(
        tetrominoPreviewUpdated({
          id: 'X',
          form: [],
        })
      );

      store.dispatch(
        tetrominoHoldUpdated({
          id: 'X',
          form: [],
        })
      );

      store.dispatch(
        boardUpdated({
          id: 'X',
          board: [],
        })
      );

      store.dispatch(
        updatePreview({
          pseudo: 'test',
          score: 1337,
          boardState: {
            id: 'X',
            board: [],
          },
        })
      );

      store.dispatch(updateScore(72));
      store.dispatch(updateRows(73));
      store.dispatch(updateLevel(74));
      store.dispatch(updateGarbage(75));

      store.dispatch(updateGameState({}));
    });

    expect(result.current.previewTetrominoId).toBeDefined();
    expect(result.current.previewTetromino).toBeDefined();
    expect(result.current.holdTetrominoId).toBeDefined();
    expect(result.current.holdTetromino).toBeDefined();
    expect(result.current.boardId).not.toBe(-1);
    expect(result.current.preview.childrenboardId).not.toBe(-1);

    expect(result.current.score).toBe(72);
    expect(result.current.rows).toBe(73);
    expect(result.current.level).toBe(74);
    expect(result.current.incomingGarbage).toBe(75);

    expect(result.current.incomingGarbage).toBeDefined();
  });
});
