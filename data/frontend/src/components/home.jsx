import {DialogPlay} from "./dialog.jsx";
import {Typography} from "@material-tailwind/react";


export const Home = () => {
  return (
    <div className="p-8 shadow-xl bg-gray-300 rounded text-center">
      <Typography variant="h1" className="py-4">Red Tetris</Typography>
      <Typography variant="h2" className="pb-12">New way to play Tetris</Typography>
      <DialogPlay btnText="Play">
        <div className="mx-auto w-full flex flex-col p-12 text-center text-black gap-4">
          <Typography variant="h3">Create Game</Typography>
          <hr/>
          <Typography variant="h3">Join Game</Typography>
        </div>
      </DialogPlay>
    </div>);
};