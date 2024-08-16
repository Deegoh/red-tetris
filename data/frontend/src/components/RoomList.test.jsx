import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { useNotification } from 'src/app/notifications';
import { useSocket } from 'src/app/socket';
import { RoomList } from './RoomList';
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
    pseudo: 'shsh',
    rooms: [
      { id: 'test1', owner: 'user1', actives: 4 },
      { id: 'test2', owner: 'user1', actives: 4 },
    ],
  },
});

describe('RoomList', () => {
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
        <RoomList />
      </Provider>
    );

    expect(screen.getAllByTestId('room').length).toBe(2);
  });

  test('test join', () => {
    render(
      <Provider store={store}>
        <RoomList />
      </Provider>
    );

    const joinRoomButtons = screen.getAllByText('Join');
    expect(joinRoomButtons.length).toBe(2);

    fireEvent.click(joinRoomButtons[1]);

    expect(socketEmitMock).toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalledWith('joinRoom', {
      pseudo: 'shsh',
      room: 'test2',
    });
  });
});
