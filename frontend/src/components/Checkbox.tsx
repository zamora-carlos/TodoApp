type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
};

function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <label className="text-2xl font-bold leading-[1.1] text-slate-300 flex justify-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-checked={checked ? 'true' : 'false'}
        className="checkbox"
      />
      <span className="sr-only">{checked ? 'Done' : 'Undone'}</span>
    </label>
  );
}

export default Checkbox;
