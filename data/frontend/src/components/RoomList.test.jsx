
import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

import { useNotification } from "src/app/notifications";
import { useSocket } from "src/app/socket";
import { RoomList } from "./RoomList";
vi.mock('src/app/notifications');
vi.mock('src/app/socket');
vi.mock('react-router-dom', () => ({
  useNavigate: () => {
    vi.fn()
  }
}));

const mockStore = configureStore([]);
const store = mockStore({
  rooms: {
    value: ['test1', 'test2'],
  }
});

describe("EntryModal", () => {
  let addNotifMock;   
  let socketEmitMock;

  beforeEach(() => {
    addNotifMock = vi.fn();
    useNotification.mockReturnValue({
      addNotif: addNotifMock
    });

    socketEmitMock = vi.fn();
    useSocket.mockReturnValue({
      socketRef: { current: { emit: socketEmitMock } }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });


  test("renders from store", () => {
    render(<Provider store={store}><RoomList /></Provider>);

    expect(screen.getByTestId("rooms").getElementsByTagName('div').length).toBe(2);
  });
});



