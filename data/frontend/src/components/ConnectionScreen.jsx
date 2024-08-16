import { Dialog } from '@material-tailwind/react';
import { RoomList } from './RoomList.jsx';
import { RoomCreation } from './RoomCreation.jsx';
import { useState } from 'react';
import { Btn } from './Btn.jsx';
import { PseudoInput } from './PseudoInput.jsx';
import useBreakpoint from './tetris/useBreakpoint.jsx';
import { TabGameMode } from './TabGameMode.jsx';

export const ConnectionScreen = ({ pseudo, setPseudo }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const screen = useBreakpoint();

  // TODO useCallback to check pseudo
  const headerPseudo = (
    <>
      <button
        onClick={handleOpen}
        className='flex bg-black/50 text-white absolute top-0 right-0 p-4 rounded flex-col items-center cursor-pointer'
        data-testid='renamemenubutton'>
        {pseudo}
      </button>
      <Dialog
        className={'contents'}
        size={'xs'}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}>
        <div className='flex flex-col p-12 text-center text-black bg-gray-300 gap-4 rounded bg-gradient-107 from-dark-red from-10% to-light-red to-90% mx-auto'>
          <PseudoInput pseudo={pseudo} setPseudo={setPseudo}>
            <Btn onClick={handleOpen} data-testid='renamebutton'>
              Rename
            </Btn>
          </PseudoInput>
        </div>
      </Dialog>
    </>
  );

  const hostRoom = (
    <RoomCreation
      className={
        'py-6 row-span-3 col-span-5 flex flex-col text-center gap-4 rounded bg-gradient-107 from-dark-red from-10% to-light-red to-90%'
      }
      pseudo={pseudo}
    />
  );

  const listRoom = (
    <RoomList
      className={
        'contents py-6 row-span-2 col-span-7 md:flex flex-col text-center gap-4 rounded bg-gradient-107 from-dark-red from-10% to-light-red to-90%'
      }
      pseudo={pseudo}
    />
  );

  const [activeTab, setActiveTab] = useState('host');
  const activeTabData = [
    { label: 'Host Room', value: 'host', html: hostRoom },
    { label: 'List Room', value: 'list', html: listRoom },
  ];

  return (
    <>
      {headerPseudo}
      <div className='pt-8 mx-4'>
        {(['xs', 'sm'].includes(screen) && (
          <div
            className={
              'container flex flex-col align-center self-center mx-auto rounded overflow-y-scroll h-max mb-4 bg-gradient-107 from-dark-red from-10% to-light-red to-90% min-h-[60%]'
            }
            data-testid='tabchoice'>
            <TabGameMode
              data={activeTabData}
              setValue={setActiveTab}
              value={activeTab}
            />
            {activeTabData.map(({ value, html }) => {
              if (value === activeTab) {
                return <div key={value}>{html}</div>;
              }
            })}
          </div>
        )) || (
          <div
            className={'container grid grid-cols-12 grid-rows-3 gap-4 mx-auto'}>
            {hostRoom}
            {listRoom}
          </div>
        )}
      </div>
    </>
  );
};
