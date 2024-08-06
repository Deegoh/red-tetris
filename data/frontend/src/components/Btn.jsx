export const Btn = ({ children, onClick, className, ...rest }) => {
  className = className || '';
  const classes =
    'rounded shadow-lg shadow-purple-500/40 bg-teal-500 hover:bg-teal-700 hover:shadow-teal-700/40 text-white px-4 py-2 ' +
    className;
  return (
    <button {...rest} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
