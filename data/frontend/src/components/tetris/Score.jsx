import { Typography } from '@material-tailwind/react'
import { useSelector } from 'react-redux'

export const Score = ({ justify = 'left' }) => {
  const score = useSelector((state) => state.game.score)
  let classes = ' items-start'
  if (justify === 'left') {
    classes = ' items-start'
  }
  if (justify === 'right') {
    classes = ' items-end'
  }

  return (
    <div className={'bg-board rounded p-2 text-white flex flex-col' + classes}>
      <Typography variant="h4">Score</Typography>
      <Typography variant="h5">{score}</Typography>
    </div>
  )
}
