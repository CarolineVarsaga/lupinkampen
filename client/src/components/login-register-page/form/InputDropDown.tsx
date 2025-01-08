interface IDropdownOption {
  value: string | number;
  label: string;
}
interface IDropdownProps {
  label: string;
  className: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IDropdownOption[];
}

const Dropdown = ({
  label,
  className,
  value,
  onChange,
  options,
}: IDropdownProps) => {
  return (
    <label htmlFor="dropdown">
      {label}
      <select
        id="dropdown"
        className={className}
        name="dropdown"
        value={value}
        onChange={onChange}
        required
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
