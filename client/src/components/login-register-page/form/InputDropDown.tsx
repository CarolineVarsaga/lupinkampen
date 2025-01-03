import React from "react";

interface IDropdownProps {
  label: string;
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
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
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
