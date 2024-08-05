export const Square = ({ color, position }) => {
  const childClassesVariants = {
    I: 'bg-tile-I',
    O: 'bg-tile-O',
    T: 'bg-tile-T',
    L: 'bg-tile-L',
    J: 'bg-tile-J',
    S: 'bg-tile-S',
    Z: 'bg-tile-Z',
    '.': 'bg-tile rounded',
  }

  const parentClassesVariants = {
    I: 'border-[5px] border-b-tile-I/35 border-t-tile-I/85 border-x-tile-I/60',
    O: 'border-[5px] border-b-tile-O/35 border-t-tile-O/85 border-x-tile-O/60',
    T: 'border-[5px] border-b-tile-T/35 border-t-tile-T/85 border-x-tile-T/60',
    L: 'border-[5px] border-b-tile-L/35 border-t-tile-L/85 border-x-tile-L/60',
    J: 'border-[5px] border-b-tile-J/35 border-t-tile-J/85 border-x-tile-J/60',
    S: 'border-[5px] border-b-tile-S/35 border-t-tile-S/85 border-x-tile-S/60',
    Z: 'border-[5px] border-b-tile-Z/35 border-t-tile-Z/85 border-x-tile-Z/60',
  }

  return (
    <div
      data-position={position}
      className={`rounded size-tile ${parentClassesVariants[color]}`}
    >
      <div className={`size-full ${childClassesVariants[color]}`} />
    </div>
  )
}
