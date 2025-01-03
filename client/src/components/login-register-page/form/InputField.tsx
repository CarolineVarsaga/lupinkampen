interface IInputTextProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
}: IInputTextProps) => {
  return (
    <label htmlFor="username">
      {label}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
};

export default InputField;
