import { describe, expect, test, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Board } from './Board';

const mockStore = configureStore([]);
const store = mockStore({
  game: {
    board: Array(20)
      .fill()
      .map(() => Array(20).fill('#.')),
  },
});

describe('Board', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders from store', () => {
    render(
      <Provider store={store}>
        <Board player='me' />
      </Provider>
    );

    expect(screen.getAllByTestId('square').length).toBe(20 * 10);
  });
});
