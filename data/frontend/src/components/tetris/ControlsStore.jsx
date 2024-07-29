import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {
  moveDownAction,
  moveLeftAction,
  moveRightAction,
  rotateAction
} from "../../features/game/gameActions.js";

export const ControlsStore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toString().toLowerCase();
      if (key === 'arrowup' || key === 'w') {
        dispatch(rotateAction());
      }
      if (key === 'arrowleft' || key === 'a') {
        dispatch(moveLeftAction())
      }
      if (key === 'arrowdown' || key === 's') {
        dispatch(moveDownAction())
      }
      if (key === 'arrowright' || key === 'd') {
        dispatch(moveRightAction())
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};