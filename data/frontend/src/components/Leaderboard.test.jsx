import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { useNotification } from 'src/app/notifications';
import { useSocket } from 'src/app/socket';
import { Leaderboard } from './Leaderboard';
vi.mock('src/app/notifications');
vi.mock('src/app/socket');
vi.mock('react-router-dom', () => ({
  useNavigate: () => {
    vi.fn();
  },
}));

const mockStore = configureStore([]);
const store = mockStore({
  common: {
    leaderboard: [
      { id: 1, pseudo: 'user1', score: 1337, settings: '-' },
      { id: 2, pseudo: 'user2', score: 1030307, settings: '-' },
    ],
  },
});

describe('Leaderboard', () => {
  let addNotifMock;
  let socketEmitMock;

  beforeEach(() => {
    addNotifMock = vi.fn();
    useNotification.mockReturnValue({
      addNotif: addNotifMock,
    });

    socketEmitMock = vi.fn();
    useSocket.mockReturnValue({
      socket: { emit: socketEmitMock },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders from store', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(socketEmitMock).toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalledWith('getLeaderboard');
    expect(screen.getAllByTestId('scoreLine').length).toBe(2);
  });
});
