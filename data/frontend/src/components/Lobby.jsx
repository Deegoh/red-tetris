import { RoomList } from './RoomList.jsx';
import { RoomCreation } from './RoomCreation.jsx';
import { useState } from 'react';
import useBreakpoint from './tetris/useBreakpoint.jsx';
import { TabGameMode } from './TabGameMode.jsx';

export const Lobby = () => {
  const screen = useBreakpoint();

  const hostRoom = (
    <RoomCreation
      className={
        'text-white max-w-screen-sm py-6 row-span-3 col-span-5 flex flex-col text-center gap-4 rounded bg-gradient-107 from-dark-red from-10% to-light-red to-90%'
      }
    />
  );

  const listRoom = (
    <RoomList
      className={
        'text-white max-w-screen-sm py-6 row-span-2 col-span-7 md:flex flex-col text-center gap-4 rounded bg-gradient-107 from-dark-red from-10% to-light-red to-90%'
      }
    />
  );

  const [activeTab, setActiveTab] = useState('host');
  const activeTabData = [
    { label: 'Host Room', value: 'host', html: hostRoom },
    { label: 'List Room', value: 'list', html: listRoom },
  ];

  return (
    <>
      {(['xs', 'sm'].includes(screen) && (
        <div
          className={
            'container min-h-[73vh] max-w-screen-sm flex flex-col m-auto rounded bg-gradient-107 from-dark-red from-10% to-light-red to-90%'
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
          className={
            'm-auto w-[80vh] lg:w-[100vh] grid grid-cols-12 grid-rows-3 gap-4'
          }>
          {hostRoom}
          {listRoom}
        </div>
      )}
    </>
  );
};
