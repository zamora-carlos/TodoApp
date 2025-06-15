type CheckboxProps = {
  id?: string;
  checked: boolean;
  onChange: () => void;
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
};

function Checkbox({ id, checked, onChange, size = '2xl' }: CheckboxProps) {
  return (
    <label
      className={`font-bold leading-[1.1] text-slate-300 flex justify-center cursor-pointer text-${size}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        className="checkbox"
      />
      <span className="sr-only">{checked ? 'Done' : 'Undone'}</span>
    </label>
  );
}

export default Checkbox;
