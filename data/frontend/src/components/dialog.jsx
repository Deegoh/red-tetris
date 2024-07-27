import {useState} from "react";
import {
  Dialog,
} from "@material-tailwind/react";
import {Btn} from "./btn.jsx";

export function DialogPlay({btnText, children}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Btn onClick={handleOpen}>{btnText}</Btn>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        animate={{
          mount: {scale: 1, y: 0},
          unmount: {scale: 0.9, y: -100},
        }}>
        {children}
      </Dialog>
    </>
  );
}