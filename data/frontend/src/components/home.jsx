import {DialogPlay} from "./dialog.jsx";
import {Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Btn} from "./btn.jsx";


export const Home = () => {
  const [pseudo, setPseudo] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="p-8 shadow-xl bg-gray-300 rounded text-center">
      <Typography variant="h1" className="py-4">Red Tetris</Typography>
      <Typography variant="h2" className="pb-12">New way to play Tetris</Typography>
      <DialogPlay btnText="Play">
        <div className="mx-auto w-full flex flex-col p-12 text-center text-black bg-gray-300 gap-4">
          <label className="text-left" htmlFor="pseudo">Pseudo:</label>
          <input
            id="pseudo"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <label className="text-left" htmlFor="room">Room:</label>
          <input
            id="room"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <div className="flex mx-auto gap-4">

            <Link to="create"><Btn>Create Room</Btn></Link>
            <Link to="join"><Btn>Join Room</Btn></Link>
          </div>
        </div>
      </DialogPlay>
    </div>);
};