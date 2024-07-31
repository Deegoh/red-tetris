import {useEffect, useState} from 'react';
import {Btn} from "../Btn.jsx";
import {tetrominoesBlocks} from "../tetris/tetrominoes.js";
import {useDispatch, useSelector} from "react-redux";
import {randomTetromino} from "../tetris/PreviewBlock.jsx";
import {rotateAction, setBoardAction, setPreviewTerminoAction} from "../../features/game/gameActions.js";
import {generateDefaultMap} from "../tetris/Board.jsx";
import store from "../../app/store.js";

export const AdminTools = () => {
  const [debugMode, setDebugMode] = useState(false);
  const [autoLog, setAutoLog] = useState(false);
  const [previewTermino, setPreviewTermino] = useState('default');
  const game = useSelector(state => state.game);
  const dispatch = useDispatch();

  useEffect(() => {

    if (autoLog) {
      store.subscribe(() => {console.log(store.getState())})
    }

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
    setPreviewTermino(event.target.value);
  }
  const setRandomTermino = () => {
    const termino = randomTetromino();
    setPreviewTermino(termino);
    dispatch(setPreviewTerminoAction(game, termino));
  }
  const setNewTerminoPreview = () => {
    dispatch(setPreviewTerminoAction(game, previewTermino));
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

        <div className="flex gap-4">
          <Btn onClick={() => {
            console.log(game);
          }}>log gameStore</Btn>
          <Btn onClick={toggleAutoLog}>auto log</Btn>
        </div>

        <label>
          <span>Termino Preview</span>
          <input value={previewTermino} onChange={updateInput} type="text"/>
        </label>
        <div className="flex gap-4">
          <Btn onClick={setRandomTermino}>Random preview</Btn>
          <Btn onClick={setNewTerminoPreview}>Update preview</Btn>
        </div>
        <Btn onClick={() => {
          dispatch(rotateAction(game))
        }}>Rotation preview</Btn>
        <Btn onClick={() => {
          dispatch(setBoardAction(game, generateDefaultMap()))
        }}>Reset board</Btn>
      </div>
    </div>
  );
};