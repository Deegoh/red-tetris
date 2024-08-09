import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './notifications';
import { io } from 'socket.io-client';
import { setRooms } from '../features/rooms/roomSlice';
import { useDispatch } from 'react-redux';
import {
  boardUpdated,
  updateScore,
  updateRows,
  updateLevel,
  updateGarbage,
} from 'src/features/game/gameSlice';
import { tetrominoPreviewUpdated } from '../features/game/gameSlice.js';

const SocketContext = createContext(undefined);

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(undefined);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { addNotif } = useNotification();

  useEffect(() => {
    if (socket !== undefined) {
      socket.on('connect', () => {
        socket.on('room_list', function (rooms) {
          dispatch(setRooms(rooms));
        });

        socket.on('notify', function (res) {
          addNotif(res?.text, res?.status);
          if (res?.page !== undefined) {
            navigate(res.page);
          }
        });

        socket.on('updateBoard', (res) => {
          if (res?.boardState?.board !== undefined) {
            dispatch(boardUpdated(res.boardState));
          }
          if (res?.score !== undefined) {
            dispatch(updateScore(res.score));
            dispatch(updateRows(res.lines));
            dispatch(updateLevel(res.level));
            dispatch(updateGarbage(res.garbage));
          }
          if (res?.next !== undefined) {
            dispatch(tetrominoPreviewUpdated(res.next));
          }
        });
      });
    } //
    else {
      setSocket(
        io(
          import.meta.env.DEV === true
            ? `:${import.meta.env.VITE_PORT_BACK}`
            : ''
        )
      );
    }
  }, [addNotif, dispatch, navigate, socket]);

  return (
    <SocketContext.Provider
      value={{
        socket: socket,
      }}>
      {children}
    </SocketContext.Provider>
  );
}
