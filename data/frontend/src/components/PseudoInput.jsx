import { Typography } from '@material-tailwind/react';

export const PseudoInput = ({ pseudo, setPseudo, children }) => {
  return (
    <label className='flex flex-col mx-auto text-left pb-4' htmlFor='pseudo'>
      <Typography variant={'lead'}>Pseudo</Typography>
      <input
        className='rounded mb-4'
        id='pseudo'
        data-testid='pseudo'
        type='text'
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
      />
      {children}
    </label>
  );
};
