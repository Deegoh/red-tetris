import { Board } from './tetris/Board.jsx'
import { PreviewTetrominoes } from './tetris/PreviewBlock.jsx'
import { Score } from './tetris/Score.jsx'
import { ControlsStore } from './tetris/ControlsStore.jsx'
import { Btn } from './Btn.jsx'
import { useDispatch } from 'react-redux'
import { gameRestarted, gameStarted } from '../features/game/gameSlice.js'
import { PreviewBoard } from './tetris/PreviewBoard.jsx'
import useBreakpoint from './tetris/useBreakpoint.jsx'

export const Game = () => {
  const dispatch = useDispatch()
  const screen = useBreakpoint()

  return (
    <div className="flex mx-auto gap-2 pb-16">
      <div className="flex flex-col gap-2">
        <Board />
        <div className="flex flex-row gap-4 mx-auto">
          <Btn
            onClick={() => {
              dispatch(gameStarted())
            }}
          >
            Play
          </Btn>
          <Btn
            onClick={() => {
              dispatch(gameRestarted())
            }}
          >
            Restart
          </Btn>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <PreviewTetrominoes />
        <Score justify="left" />
      </div>
      {screen !== 'xs' && <PreviewBoard />}
      <ControlsStore />
      {/* TODO: add message alert like countdown or whatever*/}
    </div>
  )
}
