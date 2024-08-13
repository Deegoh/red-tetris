import { Slider, Typography, Tooltip } from '@material-tailwind/react';
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
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  return (
    <div className={className}>
      <TabGameMode
        data={garbageTypeData}
        setValue={(v) => {
          dispatch(setGarbageType(v));
        }}
        value={garbageType}>
        Penality type
      </TabGameMode>

      <TabGameMode
        data={bagTypeData}
        setValue={(v) => {
          dispatch(setBagType(v));
        }}
        value={bagType}>
        Bag size
      </TabGameMode>

      <div className={'flex flex-col gap-1'}>
        <Typography variant={'lead'}>Speed difficulty</Typography>
        <Tooltip content={Math.round(difficulty / 4)}>
          <Slider
            className={'text-teal-500'}
            min={0}
            max={100}
            step={4}
            onChange={(e) => {
              dispatch(setDifficulty(e.target.value));
            }}
            defaultValue={difficulty}
          />
        </Tooltip>
        <div className={'grid grid-cols-3 justify-between'}>
          <Typography className={'text-left'}>Easier</Typography>
          <Typography className={'text-center'}>
            {Math.round(difficulty / 4)}
          </Typography>
          <Typography className={'text-right'}>Harder</Typography>
        </div>
      </div>

      <TabGameMode
        data={boolData}
        setValue={(v) => {
          dispatch(setHold(v));
        }}
        value={hold}>
        Hold
      </TabGameMode>

      <TabGameMode
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
