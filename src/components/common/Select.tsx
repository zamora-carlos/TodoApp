import { TbTriangleInvertedFilled } from 'react-icons/tb';
import formatLabel from '@utils/formatLabel';

type SelectProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: T[];
  containerClassName?: string;
  labelClassName?: string;
  selectWrapperClassName?: string;
  errorMessage?: string;
  disabled?: boolean;
};

function Select<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
  containerClassName,
  labelClassName,
  selectWrapperClassName,
  errorMessage,
  disabled = false,
}: SelectProps<T>) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>

      <div className={`relative group ${selectWrapperClassName}`}>
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value as T)}
          className="select"
          disabled={disabled}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>
              {formatLabel(opt)}
            </option>
          ))}
        </select>

        <TbTriangleInvertedFilled className="select-icon" />
      </div>

      {errorMessage && (
        <p className="text-red-300 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

export default Select;
