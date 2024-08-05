import { Typography } from '@material-tailwind/react'
import { Btn } from './Btn.jsx'
import { useCallback, useState } from 'react'
import { useSocket } from 'src/app/socket.jsx'
import { useNotification } from 'src/app/notifications.jsx'

export const RoomCreation = () => {
  const [pseudo, setPseudo] = useState('')

  const { socketRef } = useSocket()
  const { addNotif } = useNotification()

  const createRoom = useCallback(() => {
    if (pseudo.length > 3) {
      if (socketRef.current !== undefined) {
        socketRef.current.emit('createRoom', { pseudo: pseudo })
      } else {
        addNotif('Socket not loaded (yet?)', 'error')
      }
    } else {
      addNotif('Pseudo too short', 'warning')
    }
  }, [addNotif, pseudo, socketRef])

  return (
    <>
      <Typography variant="h3">Room</Typography>
      <label className="mx-auto text-left" htmlFor="pseudo">
        Pseudo:
        <input
          className="ml-1"
          id="pseudo"
          data-testid="pseudo"
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
      </label>

      <Btn
        className="mx-auto max-w-fit"
        onClick={createRoom}
        data-testid="createroom"
      >
        Create
      </Btn>
    </>
  )
}
