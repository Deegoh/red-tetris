import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export function EntryModal() {
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');
  const [rooms, setRooms] = useState([]);

  const socketRef = useRef();



  const deco = () => {
    socketRef.current && socketRef.current.disconnect();
    socketRef.current = undefined;
  };


  useEffect(() => {
    if (socketRef.current === undefined) {
      socketRef.current = io(import.meta.env.DEV === true ? `:${import.meta.env.VITE_PORT_BACK}` : '');

      socketRef.current.on("connect", () => {

        socketRef.current.on('room_list', function(lst) {
          console.log('rooms', lst);
          setRooms(lst);
        });

        socketRef.current.on('room_creation_res', function(msg) {
          alert(msg);
        });

      });
    }
  }, []);


  const createRoom = () => {
    if (roomname.length > 3) {
      socketRef.current.emit('createRoom', {roomname: roomname});
    }
    else {
      alert('Room name too short')
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "red", minWidth: "20rem" }} >

        <h2>Enter red-tetris</h2>
        <p>Choose an username, then join a room or create a new one</p>

        Username 
        <br/>
        <input defaultValue={username} onChange={(e) => {setUsername(e.target.value)}} />
        <br/>
        <br/>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', minHeight: '300px'}}>
          <div style={{backgroundColor: 'blue', display: 'flex', flexDirection: 'column', gap: '4px'}}>
            Create room
            <input defaultValue={roomname} onChange={(e) => {setRoomname(e.target.value.trim())}} />

           <button style={{}} onClick={createRoom}>Create</button>

          </div>
          
          <div style={{backgroundColor: 'green'}}>
            Join room
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              {
                rooms.map(element => {
                  return (
                    <div key={element} style={{backgroundColor: 'teal'}}>
                      <span>{element}</span> <button style={{padding: 2}}>Join</button>
                    </div>
                  )
                })
              }
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

