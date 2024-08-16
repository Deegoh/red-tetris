import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { useNotification } from 'src/app/notifications';
import { useSocket } from 'src/app/socket';
import { RoomCreation } from './RoomCreation';
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
    gameSettings: {
      garbageType: 'no',
      bagType: 2,
      difficulty: 18,
      hold: 'false',
      preview: 'true',
    },
  },
});

describe('RoomCreation', () => {
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

  test('renders', () => {
    render(
      <Provider store={store}>
        <RoomCreation pseudo='shsh' />
      </Provider>
    );

    expect(screen.getByTestId('createroom')).toBeDefined();
  });

  test('pseudo good length', () => {
    render(
      <Provider store={store}>
        <RoomCreation pseudo='shsh' />
      </Provider>
    );

    const createRoomButton = screen.getByTestId('createroom');

    fireEvent.click(createRoomButton);

    expect(addNotifMock).not.toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalledWith('createRoom', {
      pseudo: 'shsh',
      gameSettings: {
        garbageType: 'no',
        bagType: 2,
        difficulty: 18,
        hold: 'false',
        preview: 'true',
      },
    });
  });
});
