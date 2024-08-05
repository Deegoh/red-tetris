import { Square } from './Square.jsx'
import { emptyColor } from './tetrominoes.js'
import { useSelector } from 'react-redux'

export const rows = 20
export const cols = 10

export const generateDefaultMap = () => {
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(emptyColor))
}

const renderBoard = (board) => {
  const map = []
  let index = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const colorId = board[row][col]
      map.push(<Square position={index} key={index++} color={colorId} />)
    }
  }
  return map
}

export const Board = () => {
  const board = useSelector((state) => state.game.board)

  return (
    <div className="board bg-board p-1 rounded grid grid-cols-10 gap-[1px]">
      {renderBoard(board)}
    </div>
  )
}
