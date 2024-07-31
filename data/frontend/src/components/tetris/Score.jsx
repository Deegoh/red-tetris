import {Typography} from "@material-tailwind/react";

export const Score = ({children}) => {
  return (
    <div className="flex flex-col items-end">
      <Typography variant="h4">Score</Typography>
      <Typography variant="h5">{children}</Typography>
    </div>
  );
};