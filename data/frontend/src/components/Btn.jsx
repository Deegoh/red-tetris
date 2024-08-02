export const Btn = ({ children, onClick, className, ...rest }) => {
  className = className || '';
  const classes =
    'rounded shadow-lg shadow-purple-500/40 bg-purple-500 hover:bg-purple-700 hover:shadow-purple-700/40 text-white px-4 py-2 ' +
    className;
  return (
    <button {...rest} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
