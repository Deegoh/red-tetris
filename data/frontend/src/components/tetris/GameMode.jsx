import { Typography, Tooltip } from '@material-tailwind/react';
import { TabGameMode } from '../TabGameMode.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGarbageType,
  setBagType,
  setDifficulty,
  setHold,
  setPreview,
} from 'src/features/common/commonSlice.js';

export const GameMode = ({ className }) => {
  const { garbageType, bagType, difficulty, hold, preview } = useSelector(
    (state) => state.common.gameSettings
  );
  const dispatch = useDispatch();

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

  return (
    <div className={className}>
      <TabGameMode
        name={'garbageType'}
        data={garbageTypeData}
        setValue={(v) => {
          dispatch(setGarbageType(v));
        }}
        value={garbageType}>
        Penality type
      </TabGameMode>

      <TabGameMode
        name={'bagType'}
        data={bagTypeData}
        setValue={(v) => {
          dispatch(setBagType(v));
        }}
        value={bagType}>
        Bag size
      </TabGameMode>

      <div className={'flex flex-col gap-1'}>
        <Typography variant={'lead'}>Speed difficulty</Typography>
        <Tooltip content={difficulty}>
          <input
            className={'accent-teal-500 text-black'}
            type={'range'}
            min={0}
            max={25}
            value={difficulty}
            onChange={(e) => {
              dispatch(setDifficulty(e.target.value));
            }}
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
            {difficulty}
          </Typography>
          <Typography className={'text-right'}>Harder</Typography>
        </div>
      </div>

      <TabGameMode
        name={'hold'}
        data={boolData}
        setValue={(v) => {
          dispatch(setHold(v));
        }}
        value={hold}>
        Hold
      </TabGameMode>

      <TabGameMode
        name={'preview'}
        data={boolData}
        setValue={(v) => {
          dispatch(setPreview(v));
        }}
        value={preview}>
        Preview
      </TabGameMode>
    </div>
  );
};
