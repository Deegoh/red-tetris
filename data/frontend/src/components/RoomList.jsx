import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { Btn } from "./Btn.jsx";

export const RoomList = () => {
  const rooms = useSelector((state) => state.rooms.value);

  return (
    <div>
      <Typography variant="h3" className="">List</Typography>
      <div className="flex flex-col gap-2 overflow-y-scroll max-h-56" data-testid="rooms">
        {
          rooms.map(element => {
            // TODO add name room, nbr player, owner, options
            return (
              <div key={element} className="flex justify-around items-baseline mr-3">
                <span className="grow">{element}</span>
                <Btn onClick={() => {
                  console.log(element)
                }}>Join</Btn>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};