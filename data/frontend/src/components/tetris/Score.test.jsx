import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Score } from './Score';

const mockStore = configureStore([]);

describe('Score', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders from store', () => {
    const store = mockStore({
      game: {
        score: 137,
        rows: 138,
        level: 139,
      },
    });

    render(
      <Provider store={store}>
        <Score />
      </Provider>
    );

    expect(screen.getByText('137')).not.toBeNull();
    expect(screen.getByText('138')).not.toBeNull();
    expect(screen.getByText('139')).not.toBeNull();
  });

  test('renders right', () => {
    const store = mockStore({
      game: {
        score: 137,
        rows: 138,
        level: 139,
      },
    });

    render(
      <Provider store={store}>
        <Score justify='right' />
      </Provider>
    );

    expect(screen.getByText('137')).not.toBeNull();
    expect(screen.getByText('138')).not.toBeNull();
    expect(screen.getByText('139')).not.toBeNull();
  });

  test('renders thousands', () => {
    const store = mockStore({
      game: {
        score: 1337,
        rows: 138,
        level: 139,
      },
    });

    render(
      <Provider store={store}>
        <Score />
      </Provider>
    );

    expect(screen.getByText('1.3 K')).not.toBeNull();
  });

  test('renders millions', () => {
    const store = mockStore({
      game: {
        score: 13333337,
        rows: 138,
        level: 139,
      },
    });

    render(
      <Provider store={store}>
        <Score />
      </Provider>
    );

    expect(screen.getByText('13.3 M')).not.toBeNull();
  });

  test('renders billions', () => {
    const store = mockStore({
      game: {
        score: 133333333337,
        rows: 138,
        level: 139,
      },
    });

    render(
      <Provider store={store}>
        <Score />
      </Provider>
    );

    expect(screen.getByText('133.3 B')).not.toBeNull();
  });
});
