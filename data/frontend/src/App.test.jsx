import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { useNotification } from 'src/app/notifications';
import { useSocket } from 'src/app/socket';
import App from './App';

vi.mock('src/app/notifications');
vi.mock('src/app/socket');
vi.mock('react-router-dom', () => ({
  useNavigate: () => {
    vi.fn();
  },
  Routes: () => {
    return <div></div>;
  },
  Route: () => {
    return <div></div>;
  },
}));

const mockStore = configureStore([]);
const store = mockStore({});

describe('App', () => {
  let addNotifMock;
  let socketEmitMock;

  beforeEach(() => {
    addNotifMock = vi.fn();
    useNotification.mockReturnValue({
      notifications: [],
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

  test('renders', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
