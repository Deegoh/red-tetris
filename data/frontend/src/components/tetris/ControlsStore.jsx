import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from 'src/app/socket.jsx';

// Left and right arrows: Horizontal move to the right or left
// Top arrow: Rotation (only one direction is enough)
// Down arrow: Fall towards the pile
// Spacebar: Vertical move to position a piece in a hole in the pile

export const ControlsStore = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // TODO remove code
      // if (game.status !== 'running') {
      //   return;
      // }

      const keyCode = event.code;
      if (keyCode === 'ArrowUp' || keyCode === 'KeyW') {
        socket.emit('gameAction', { action: 'up' });
      }
      if (keyCode === 'ArrowLeft' || keyCode === 'KeyA') {
        socket.emit('gameAction', { action: 'left' });
      }
      if (keyCode === 'ArrowDown' || keyCode === 'KeyS') {
        socket.emit('gameAction', { action: 'down' });
      }
      if (keyCode === 'ArrowRight' || keyCode === 'KeyD') {
        socket.emit('gameAction', { action: 'right' });
      }
      if (keyCode === 'Space' || keyCode === 'MetaLeft') {
        socket.emit('gameAction', { action: 'space' });
      }
      if (keyCode === 'Enter' || keyCode === 'AltRight') {
        socket.emit('gameAction', { action: 'enter' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, game, socket]);
};
