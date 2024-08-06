import { Board } from './Board.jsx';

export const PreviewBoard = () => {
  return (
    <div className='grid grid-cols-2 grid-flow-row auto-rows-max gap-2'>
      <Board mode='preview' player='Unknown1' />
      <Board mode='preview' player='Unknown2' />
      <Board mode='preview' player='Unknown3' />
      <Board mode='preview' player='Unknown4' />
    </div>
  );
};
