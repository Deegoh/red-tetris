import { Dialog, Typography } from '@material-tailwind/react';
import { Btn } from './Btn.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPseudo } from '../features/common/commonSlice.js';

export const Header = ({ className, callbackPrev }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const pseudo = useSelector((state) => state.common.pseudo);
  const dispatch = useDispatch();

  return (
    <>
      <div className={className + ' flex justify-between mb-4'}>
        <Btn onClick={callbackPrev}>Back</Btn>
        <button
          onClick={handleOpen}
          className='flex bg-black/50 text-white px-4 py-2 rounded flex-col items-center cursor-pointer'
          data-testid='renamemenubutton'>
          {pseudo}
        </button>
      </div>
      <Dialog
        className={'contents'}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}>
        <div className='flex flex-col p-8 text-center text-black bg-gray-300 gap-4 rounded bg-gradient-107 from-dark-red from-10% to-light-red to-90% mx-auto'>
          <div className={'flex flex-col mx-auto text-left pb-4'}>
            <label htmlFor='pseudo'>
              <Typography variant={'lead'}>Pseudo</Typography>
              <input
                className='rounded mb-4'
                id='pseudo'
                data-testid='pseudo'
                type='text'
                defaultValue={pseudo}
                onChange={(e) => dispatch(setPseudo(e.target.value))}
                required={true}
              />
            </label>
            <Btn
              onClick={() => {
                if (pseudo !== undefined && pseudo.length > 0) {
                  handleOpen();
                } //
                else {
                  addNotif('Pseudo required', 'error');
                }
              }}
              data-testid='renamebutton'>
              Rename
            </Btn>
          </div>
        </div>
      </Dialog>
    </>
  );
};
