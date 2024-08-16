import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import { Lobby } from './Lobby.jsx';

import useBreakpoint from './tetris/useBreakpoint';
vi.mock('./tetris/useBreakpoint.jsx', () => ({
  default: vi.fn(),
}));

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

vi.mock('src/app/socket.jsx', () => ({
  useSocket: () => ({
    socket: { emit: vi.fn() },
  }),
}));

vi.mock('src/app/notifications.jsx', () => ({
  useNotification: () => ({
    notifications: [],
    addNotif: vi.fn(),
    removeNotif: vi.fn(),
  }),
}));

const mockStore = configureStore([]);
const store = mockStore({
  common: {
    gameSettings: {
      garbageType: 'no',
      bagType: 2,
      difficulty: 18 * 4,
      hold: 'false',
      preview: 'true',
    },
    rooms: [],
  },
});

describe('ConnectionScreen', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders small', () => {
    useBreakpoint.mockReturnValue('sm');

    render(
      <Provider store={store}>
        <Lobby />
      </Provider>
    );

    expect(screen.queryByTestId('roomcreationpage')).not.toBeNull();
    expect(screen.queryByTestId('roomlistpage')).toBeNull();

    const tabChoiceMenu = screen.queryByTestId('tabchoice');
    const listRoomButton = within(tabChoiceMenu).queryByText('List Room');

    fireEvent.click(listRoomButton);

    expect(screen.queryByTestId('roomcreationpage')).toBeNull();
    expect(screen.queryByTestId('roomlistpage')).not.toBeNull();
  });

  test('renders big', () => {
    useBreakpoint.mockReturnValue('lg');

    render(
      <Provider store={store}>
        <Lobby />
      </Provider>
    );

    expect(screen.getByTestId('roomcreationpage')).not.toBeNull();
    expect(screen.getByTestId('roomlistpage')).not.toBeNull();
  });

  test('renders rename menu opens', () => {
    useBreakpoint.mockReturnValue('sm');

    render(
      <Provider store={store}>
        <Lobby />
      </Provider>
    );

    const renameMenuButton = screen.getByTestId('renamemenubutton');
    act(() => {
      fireEvent.click(renameMenuButton);
    });

    const renameButton = screen.getByTestId('renamebutton');
    fireEvent.click(renameButton);
  });
});
