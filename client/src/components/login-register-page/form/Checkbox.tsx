interface ICheckboxProps {
  className: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Checkbox = ({ className, checked, onChange, value }: ICheckboxProps) => {
  return (
    <label htmlFor="checkbox" className="checkbox-label">
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        className={className}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      Jag godkänner användarvillkoren*
    </label>
  );
};

export default Checkbox;
