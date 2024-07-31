import {useEffect, useState} from 'react';
import {Btn} from "../Btn.jsx";
import {tetrominoes, tetrominoesBlocks} from "../tetris/tetrominoes.js";
import {useDispatch, useSelector} from "react-redux";
import {randomTetromino} from "../tetris/PreviewBlock.jsx";
import {generateDefaultMap} from "../tetris/Board.jsx";
import {
  boardUpdated,
  tetrominoPreviewUpdated,
  tetrominoRotated,
} from "../../features/game/gameSlice.js";

export const AdminTools = () => {
  const [debugMode, setDebugMode] = useState(false);
  const [previewTetromino, setpreviewTetromino] = useState('default');

  const game = useSelector(state => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Escape") {
        const adminTools = document.getElementById("adminTools");
        setDebugMode(!debugMode);
        adminTools.classList.toggle("-translate-x-full")
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const updateInput = (event) => {
    const newTetromino = event.target.value;
    setpreviewTetromino(newTetromino);
    if (!tetrominoes.includes(newTetromino)) {
      return;
    }
    dispatch(tetrominoPreviewUpdated(newTetromino));
  }
  const setRandomTermino = () => {
    const termino = randomTetromino();
    setpreviewTetromino(termino);
    dispatch(tetrominoPreviewUpdated(termino));
  }
  const toggleAutoLog = () => {
    setAutoLog(!autoLog);
  }

  return (
    <div id="adminTools"
         className="text-sm -translate-x-full transition-transform absolute w-1/3 bg-gray-300/50 h-full p-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <Btn onClick={() => {
          console.log(tetrominoesBlocks);
        }}>log tetris block</Btn>

        <Btn onClick={() => {
          console.log(game);
        }}>log gameStore</Btn>

        <label>
          <span>Termino Preview</span>
          <input value={previewTetromino} onChange={updateInput} type="text"/>
        </label>
        <div className="flex gap-4">
          <Btn onClick={setRandomTermino}>Random preview</Btn>
          <Btn onClick={() => {
            dispatch(tetrominoRotated())
          }}>Rotation preview</Btn>
        </div>

        <Btn onClick={() => {
          dispatch(boardUpdated(generateDefaultMap()))
        }}>Reset board</Btn>
      </div>
    </div>
  );
};