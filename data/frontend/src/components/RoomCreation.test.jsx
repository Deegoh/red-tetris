
import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { useNotification } from "src/app/notifications";
import { useSocket } from "src/app/socket";
import { RoomCreation } from "./RoomCreation";
vi.mock('src/app/notifications');
vi.mock('src/app/socket');
vi.mock('react-router-dom', () => ({
  useNavigate: () => {
    vi.fn()
  }
}));

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



  test("renders", () => {
    render(<RoomCreation />);

    expect(screen.getByTestId("pseudo")).toBeDefined();
    expect(screen.getByTestId("createroom")).toBeDefined();
  });


  test("pseudo too short", () => {
    render(<RoomCreation />);

    const pseudoInput = screen.getByTestId("pseudo");
    const createRoomButton = screen.getByTestId("createroom");

    fireEvent.change(pseudoInput, { target: { value: "sh" } });
    fireEvent.click(createRoomButton);

    expect(addNotifMock).toHaveBeenCalled();
    expect(addNotifMock).toHaveBeenCalledWith("Pseudo too short", "warning");
    expect(socketEmitMock).not.toHaveBeenCalled();

  });


  test("pseudo good length", () => {
    render(<RoomCreation />);

    const roomNameInput = screen.getByTestId("pseudo");
    const createRoomButton = screen.getByTestId("createroom");

    fireEvent.change(roomNameInput, { target: { value: "shsh" } });
    fireEvent.click(createRoomButton);

    expect(addNotifMock).not.toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalled();
    expect(socketEmitMock).toHaveBeenCalledWith("createRoom", { pseudo: "shsh" });
  });
});



