export const Footer = () => {
  return (
    <footer className='text-white absolute inset-x-0 bottom-8 flex flex-col items-center'>
      <small>
        Made with ❤️ by{' '}
        <a
          className='text-blue-300 underline'
          href='https://profile.intra.42.fr/users/jjaqueme'>
          jjaqueme
        </a>{' '}
        &&{' '}
        <a
          className='text-blue-300 underline'
          href='https://profile.intra.42.fr/users/tpinto-m'>
          tpinto-m
        </a>
      </small>
      <small>
        <a
          className='text-blue-300 underline'
          href='https://github.com/Deegoh/red-tetris'>
          Github Project
        </a>
      </small>
    </footer>
  );
};
