import { useState, useCallback } from 'react'
import { useNotification } from 'src/app/notifications';
import { useSocket } from 'src/app/socket';
import { useSelector } from 'react-redux';

export function EntryModal() {
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');
  const rooms = useSelector((state) => state.rooms.value)

  const { addNotif } = useNotification();
  const { socketRef } = useSocket();

  const createRoom = useCallback(() => {
    if (roomname.length > 3) {
      if (socketRef.current !== undefined) {
        socketRef.current.emit('createRoom', { roomname: roomname });
      }
      else {
        addNotif('Socket not loaded (yet?)', 'error');
      }
    }
    else {
      addNotif('Room name too short', 'warning');
    }
  }, [roomname, socketRef, addNotif]);

  return (
    <>
      <div style={{ backgroundColor: "red", minWidth: "20rem" }} >

        <h2>Enter red-tetris</h2>
        <p>Choose an username, then join a room or create a new one</p>

        Username
        <br />
        <input data-testid="username" defaultValue={username} onChange={(e) => { setUsername(e.target.value) }} />
        <br />
        <br />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', minHeight: '300px' }}>
          <div style={{ backgroundColor: 'blue', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            Create room
            <input data-testid="roomname" defaultValue={roomname} onChange={(e) => { setRoomname(e.target.value.trim()) }} />

            <button data-testid="createroom" style={{}} onClick={createRoom}>Create</button>

          </div>

          <div style={{ backgroundColor: 'green' }}>
            Join room
            <div data-testid='rooms' style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {
                rooms.map(element => {
                  return (
                    <div key={element} style={{ backgroundColor: 'teal' }}>
                      <span>{element}</span> <button style={{ padding: 2 }}>Join</button>
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

