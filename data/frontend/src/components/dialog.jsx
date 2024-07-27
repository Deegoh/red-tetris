import {useState} from "react";
import {
  Dialog,
} from "@material-tailwind/react";

export function DialogPlay({btnText, children}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button
        className="rounded shadow-lg shadow-purple-500/40 bg-purple-500 hover:bg-purple-700 hover:shadow-purple-700/40 text-white px-4 py-2"
        onClick={handleOpen}>
        {btnText}
      </button>
      <Dialog
        size=""
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