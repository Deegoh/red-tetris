import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNotification } from './notifications';
import { io } from 'socket.io-client'
import { setRooms } from '../features/rooms/roomSlice';
import { useDispatch } from 'react-redux';
import { boardUpdated } from 'src/features/game/gameSlice';


const SocketContext = createContext(undefined);

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

export function SocketProvider({ children }) {
  const socketRef = useRef();

  const dispatch = useDispatch()
  const { addNotif } = useNotification();


  useEffect(() => {
    if (socketRef.current === undefined) {
      socketRef.current = io(import.meta.env.DEV === true ? `:${import.meta.env.VITE_PORT_BACK}` : '');

      socketRef.current.on("connect", () => {

        socketRef.current.on('room_list', function (rooms) {
          dispatch(setRooms(rooms))
        });

        socketRef.current.on('notify', function (res) {
          addNotif(res?.text, res?.status);
        });

        socketRef.current.on('updateBoard', (res) => {
          if (res?.board !== undefined) {
            dispatch(boardUpdated(res.board))
          }
        });

      });
    }
  }, [addNotif, dispatch]);


  return (
    <SocketContext.Provider
      value={{
        socketRef: socketRef
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
