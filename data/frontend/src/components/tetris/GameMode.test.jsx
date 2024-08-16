import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, within, screen, fireEvent } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { GameMode } from './GameMode';

import {
  setGarbageType,
  setBagType,
  setDifficulty,
  setHold,
  setPreview,
} from 'src/features/common/commonSlice.js';

vi.mock('react-redux', async () => {
  const original = await vi.importActual('react-redux');
  return {
    __esModule: true,
    ...original,
    useDispatch: vi.fn(() => vi.fn().mockImplementation((cb) => cb)),
  };
});

vi.mock('src/features/common/commonSlice.js');

const mockStore = configureStore([]);
const store = mockStore({
  common: {
    gameSettings: {
      garbageType: 'no',
      bagType: 0,
      difficulty: 18 * 4,
      hold: 'true',
      preview: 'true',
    },
  },
});

describe('GameMode', () => {
  let setGarbageTypeMock;
  let setBagTypeMock;
  let setDifficultyMock;
  let setHoldMock;
  let setPreviewMock;

  beforeEach(() => {
    setGarbageTypeMock = vi.fn();
    setBagTypeMock = vi.fn();
    setDifficultyMock = vi.fn();
    setHoldMock = vi.fn();
    setPreviewMock = vi.fn();

    setGarbageType.mockImplementation(setGarbageTypeMock);
    setBagType.mockImplementation(setBagTypeMock);
    setDifficulty.mockImplementation(setDifficultyMock);
    setHold.mockImplementation(setHoldMock);
    setPreview.mockImplementation(setPreviewMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders', () => {
    render(
      <Provider store={store}>
        <GameMode />
      </Provider>
    );

    expect(screen.getAllByRole('gamemodechoice').length).toBe(5);
  });

  test('test garbage type choice', async () => {
    render(
      <Provider store={store}>
        <GameMode />
      </Provider>
    );

    const penalityChoice = await screen.findByTestId('penality');
    const penalityButton = await within(penalityChoice).findByText('Hole');
    fireEvent.click(penalityButton);

    expect(setGarbageTypeMock).toHaveBeenCalled();
    expect(setGarbageTypeMock).toHaveBeenCalledWith('hole');
  });

  test('test bag type choice', async () => {
    render(
      <Provider store={store}>
        <GameMode />
      </Provider>
    );

    const bagChoice = await screen.findByTestId('bag');
    const bagButton = await within(bagChoice).findByText('2');
    fireEvent.click(bagButton);

    expect(setBagTypeMock).toHaveBeenCalled();
    expect(setBagTypeMock).toHaveBeenCalledWith('2');
  });

  test('test difficulty choice', async () => {
    render(
      <Provider store={store}>
        <GameMode />
      </Provider>
    );

    const difficultyChoice = await screen.findByTestId('difficulty');
    const difficultySlider = difficultyChoice.querySelector('input');
    fireEvent.change(difficultySlider, { target: { value: 25 } });

    expect(setDifficultyMock).toHaveBeenCalled();
    expect(setDifficultyMock).toHaveBeenCalledWith('25');
  });

  test('test hold choice', async () => {
    render(
      <Provider store={store}>
        <GameMode />
      </Provider>
    );

    const holdChoice = await screen.findByTestId('hold');
    const holdButton = await within(holdChoice).findByText('No');
    fireEvent.click(holdButton);

    expect(setHoldMock).toHaveBeenCalled();
    expect(setHoldMock).toHaveBeenCalledWith('0');
  });

  test('test preview choice', async () => {
    render(
      <Provider store={store}>
        <GameMode />
      </Provider>
    );

    const previewChoice = await screen.findByTestId('preview');
    const previewButton = await within(previewChoice).findByText('No');
    fireEvent.click(previewButton);

    expect(setPreviewMock).toHaveBeenCalled();
    expect(setPreviewMock).toHaveBeenCalledWith('0');
  });
});
