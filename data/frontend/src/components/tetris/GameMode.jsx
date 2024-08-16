import { Typography, Tooltip } from '@material-tailwind/react';
import { useState } from 'react';
import { TabGameMode } from '../TabGameMode.jsx';

export const GameMode = ({ className }) => {
  const [gameMode, setGameMode] = useState({
    garbageType: 'no',
    bagType: 2,
    difficulty: 10,
    hold: 1,
    preview: 1,
  });

  const garbageTypeData = [
    { label: 'Without', value: 'no' },
    { label: 'Full', value: 'full' },
    { label: 'Hole', value: 'hole' },
  ];
  const bagTypeData = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
  ];
  const boolData = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];
  const marks = [0, 5, 10, 15, 20, 25];

  const onChangeHandle = (e) => {
    setGameMode((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(gameMode);

  return (
    <div className={className}>
      <TabGameMode
        name={'garbageType'}
        data={garbageTypeData}
        setValue={setGameMode}
        value={gameMode.garbageType}>
        Penality type
      </TabGameMode>

      <TabGameMode
        name={'bagType'}
        data={bagTypeData}
        setValue={setGameMode}
        value={gameMode.bagType}>
        Bag size
      </TabGameMode>

      <div className={'flex flex-col gap-1'}>
        <Typography variant={'lead'}>Speed difficulty</Typography>
        <Tooltip content={gameMode.difficulty}>
          <input
            className={'accent-teal-500 text-black'}
            type={'range'}
            min={0}
            max={25}
            value={gameMode.difficulty}
            onChange={onChangeHandle}
            name={'difficulty'}
            list={'marks'}
          />
        </Tooltip>

        <datalist id='marks'>
          {marks.map((value) => (
            <option key={value} value={value}></option>
          ))}
        </datalist>

        <div className={'grid grid-cols-3 justify-between'}>
          <Typography className={'text-left'}>Easier</Typography>
          <Typography className={'text-center'}>
            {gameMode.difficulty}
          </Typography>
          <Typography className={'text-right'}>Harder</Typography>
        </div>
      </div>

      <TabGameMode
        name={'hold'}
        data={boolData}
        setValue={setGameMode}
        value={gameMode.hold}>
        Hold
      </TabGameMode>

      <TabGameMode
        name={'preview'}
        data={boolData}
        setValue={setGameMode}
        value={gameMode.preview}>
        Preview
      </TabGameMode>
    </div>
  );
};
