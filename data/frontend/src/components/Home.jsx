import {DialogDefault} from "./DialogDefault.jsx";
import {Typography} from "@material-tailwind/react";
import React from "react";
import {RoomList} from "./RoomList.jsx";
import {RoomCreation} from "./RoomCreation.jsx";
import {NotificationsContainer} from "./NotificationsContainer.jsx";

export const Home = () => {
  return (
    <div className="p-8 shadow-xl bg-gray-300 rounded text-center">
      <Typography variant="h1" className="py-4">Red Tetris</Typography>
      <Typography variant="h2" className="pb-12">New way to play Tetris</Typography>
      <DialogDefault btnText="Play">
        <div className="mx-auto w-full flex flex-col p-12 text-center text-black bg-gray-300 gap-4 rounded">
          <NotificationsContainer/>
          <RoomCreation/>
          <hr/>
          <RoomList/>
        </div>
      </DialogDefault>
    </div>);
};