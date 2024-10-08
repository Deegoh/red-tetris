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
    { label: 'Without', value: 'no', tooltip: 'No penalty' },
    { label: 'Full', value: 'full', tooltip: 'The line can not be destroy' },
    {
      label: 'Hole',
      value: 'hole',
      tooltip: 'The line had a hole and can be destroy',
    },
  ];
  const bagTypeData = [
    { label: '0', value: '0', tooltip: 'All pieces are random' },
    {
      label: '1',
      value: '1',
      tooltip: 'Tetromino appears between 7-14 pieces',
    },
    {
      label: '2',
      value: '2',
      tooltip: 'Tetromino appears between 14-28 pieces',
    },
  ];
  const holdData = [
    { label: 'Yes', value: '1', tooltip: 'Allow you to keep a piece' },
    { label: 'No', value: '0' },
  ];
  const previewData = [
    { label: 'Yes', value: '1', tooltip: "Display preview's layers" },
    { label: 'No', value: '0' },
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
        value={garbageType}
        role='gamemodechoice'
        data-testid='penality'>
        Penality type
      </TabGameMode>

      <TabGameMode
        name={'bagType'}
        data={bagTypeData}
        setValue={(v) => {
          dispatch(setBagType(v));
        }}
        value={bagType}
        role='gamemodechoice'
        data-testid='bag'>
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
            role='gamemodechoice'
            data-testid='difficulty'
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
          <Typography className={'text-center'}>{difficulty}</Typography>
          <Typography className={'text-right'}>Harder</Typography>
        </div>
      </div>

      <TabGameMode
        name={'hold'}
        data={holdData}
        setValue={(v) => {
          dispatch(setHold(v));
        }}
        value={hold}
        role='gamemodechoice'
        data-testid='hold'>
        Hold
      </TabGameMode>

      <TabGameMode
        name={'preview'}
        data={previewData}
        setValue={(v) => {
          dispatch(setPreview(v));
        }}
        value={preview}
        role='gamemodechoice'
        data-testid='preview'>
        Preview
      </TabGameMode>
    </div>
  );
};
