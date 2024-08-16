import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EntryModal } from './EntryModal';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { useNotification } from 'src/app/notifications';
import { useSocket } from 'src/app/socket';
vi.mock('src/app/notifications');
vi.mock('src/app/socket');
vi.mock('react-router-dom', () => ({
  useNavigate: () => {
    vi.fn();
  },
}));

const mockStore = configureStore([]);
const store = mockStore({
  rooms: {
    value: ['test1', 'test2'],
  },
});

describe('EntryModal', () => {
  let addNotifMock;
  let socketEmitMock;

  beforeEach(() => {
    addNotifMock = vi.fn();
    useNotification.mockReturnValue({
      addNotif: addNotifMock,
    });

    socketEmitMock = vi.fn();
    useSocket.mockReturnValue({
      socketRef: { current: { emit: socketEmitMock } },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders', () => {
    render(
      <Provider store={store}>
        <EntryModal />
      </Provider>
    );

    expect(screen.getByTestId('username')).toBeDefined();
    expect(screen.getByTestId('roomname')).toBeDefined();
    expect(screen.getByTestId('rooms').getElementsByTagName('div').length).toBe(
      2
    );
  });

  test('room name too short', () => {
    render(
      <Provider store={store}>
        <EntryModal />
      </Provider>
    );

    const roomNameInput = screen.getByTestId('roomname');
    const createRoomButton = screen.getByTestId('createroom');

    fireEvent.change(roomNameInput, { target: { value: 'sh' } });
    fireEvent.click(createRoomButton);

    expect(addNotifMock).toHaveBeenCalled();
    expect(addNotifMock).toHaveBeenCalledWith('Room name too short', 'warning');
  });

  test('room name good length', () => {
    render(
      <Provider store={store}>
        <EntryModal />
      </Provider>
    );

    const roomNameInput = screen.getByTestId('roomname');
    const createRoomButton = screen.getByTestId('createroom');

    fireEvent.change(roomNameInput, { target: { value: 'shsh' } });
    fireEvent.click(createRoomButton);

    expect(addNotifMock).not.toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalledWith('createRoom', {
      roomname: 'shsh',
    });
  });
});