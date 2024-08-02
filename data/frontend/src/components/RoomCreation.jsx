import {Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {Btn} from "./Btn.jsx";
import React, {useCallback, useState} from "react";
import {useSocket} from "../app/socket.jsx";
import {useNotification} from "../app/notifications.jsx";

export const RoomCreation = () => {
  const [pseudo, setPseudo] = useState('');
  const [roomname, setRoomname] = useState('');

  const {socketRef} = useSocket();
  const {addNotif} = useNotification();

  const createRoom = useCallback(() => {
    if (roomname.length > 3) {
      if (socketRef.current !== undefined) {
        socketRef.current.emit('createRoom', {roomname: roomname});
      } else {
        addNotif('Socket not loaded (yet?)', 'error');
      }
    } else {
      addNotif('Room name too short', 'warning');
    }
  }, [roomname, socketRef.current]);

  return (
    <>
      <Typography variant="h3" className="">Room</Typography>
      <label className="mx-auto text-left" htmlFor="pseudo">Pseudo:
        <input
          className="ml-1"
          id="pseudo"
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
      </label>

      <Btn className="mx-auto max-w-fit" onClick={createRoom}>Create</Btn>
    </>
  );
};