
import { describe, expect, test, afterEach, cleanup } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { EntryModal } from "./EntryModal";


beforeAll(() => {
  global.alert = vi.fn();
});

afterAll(() => {
  global.alert.mockRestore();
});


describe("EntryModal", () => {


  test("renders", () => {
    render(<EntryModal />);
    expect(screen.getByTestId("username")).toBeDefined();
    expect(screen.getByTestId("roomname")).toBeDefined();
  });

  test("room name too short", () => {
    render(<EntryModal />);
    
    const roomNameInput = screen.getByTestId("roomname");
    const createRoomButton = screen.getByTestId("createroom");
    
    fireEvent.change(roomNameInput, { target: { value: "sh" } });
    // roomNameInput
    fireEvent.click(createRoomButton);

    expect(global.alert).toHaveBeenCalledWith("Room name too short");
  });


  test("room name too short", () => {
    render(<EntryModal />);
    
    const roomNameInput = screen.getByTestId("roomname");
    const createRoomButton = screen.getByTestId("createroom");
    
    fireEvent.change(roomNameInput, { target: { value: "sh" } });
    fireEvent.click(createRoomButton);

    expect(global.alert).toHaveBeenCalledWith("Room name too short");
  });

  test("room name good length", () => {
    render(<EntryModal />);
    
    const roomNameInput = screen.getByTestId("roomname");
    const createRoomButton = screen.getByTestId("createroom");
    
    fireEvent.change(roomNameInput, { target: { value: "shsh" } });
    fireEvent.click(createRoomButton);

    expect(global.alert).toHaveBeenCalledWith("Room name too short");
  });




  // test("should increase count by 1", () => {
  //   // Arrange
  //   const ButtonWithCount = () => {
  //     const [count, setCount] = useState(0);
  //     return (
  //       <>
  //         <div data-testid="count">{count}</div>
  
  //         <IncreaseButton setCount={setCount} />
  //       </>
  //     );
  //   };
  
  //   // Act
  //   render(<ButtonWithCount />);
  
  //   const count = screen.getByTestId("count");
  //   const button = screen.getByText("Increase");
  
  //   fireEvent.click(button);
  
  //   // Assert
  //   expect(count.textContent).toBe("1");
  // });

});



