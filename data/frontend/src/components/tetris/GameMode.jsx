import { Slider, Typography, Tooltip } from '@material-tailwind/react';
import { useState } from 'react';
import { TabGameMode } from '../TabGameMode.jsx';

export const GameMode = ({ className }) => {
  const [garbageType, setGarbageType] = useState('no');
  const garbageTypeData = [
    { label: 'Without', value: 'no' },
    { label: 'Full', value: 'full' },
    { label: 'Hole', value: 'hole' },
  ];

  const [bagType, setBagType] = useState(2);
  const bagTypeData = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
  ];

  const [difficulty, setDifficulty] = useState(10);

  const [hold, setHold] = useState('true');
  const [preview, setPreview] = useState('true');
  const boolData = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  return (
    <div className={className}>
      <TabGameMode
        data={garbageTypeData}
        setValue={setGarbageType}
        value={garbageType}>
        Penality type
      </TabGameMode>

      <TabGameMode data={bagTypeData} setValue={setBagType} value={bagType}>
        Bag size
      </TabGameMode>

      <div className={'flex flex-col gap-1'}>
        <Typography variant={'lead'}>Speed difficulty</Typography>
        <Tooltip content={difficulty}>
          <Slider
            className={'text-teal-500'}
            min={0}
            max={100}
            step={10}
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
            defaultValue={difficulty}
          />
        </Tooltip>
        <div className={'grid grid-cols-3 justify-between'}>
          <Typography className={'text-left'}>Easier</Typography>
          <Typography className={'text-center'}>{difficulty}</Typography>
          <Typography className={'text-right'}>Harder</Typography>
        </div>
      </div>

      <TabGameMode data={boolData} setValue={setHold} value={hold}>
        Hold
      </TabGameMode>

      <TabGameMode data={boolData} setValue={setPreview} value={preview}>
        Preview
      </TabGameMode>
    </div>
  );
};
