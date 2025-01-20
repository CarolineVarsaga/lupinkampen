interface IInputTextProps {
  forLabel: string;
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  forLabel,
  label,
  type,
  id,
  name,
  value,
  onChange,
  required,
}: IInputTextProps) => {
  return (
    <label htmlFor={forLabel}>
      {label}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

export default InputField;
