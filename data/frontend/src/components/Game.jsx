import {Typography} from "@material-tailwind/react";
import {Square} from "./tetris/Square.jsx";

export const Game = () => {
  return (
    <>
      <Square color="bg-tile-I"/>
      <Square color="bg-tile-O"/>
      <Square color="bg-tile-T"/>
      <Square color="bg-tile-L"/>
      <Square color="bg-tile-J"/>
      <Square color="bg-tile-S"/>
      <Square color="bg-tile-Z"/>
      <Square color="bg-tile"/>
    </>
  );
};