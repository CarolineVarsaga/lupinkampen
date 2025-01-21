import { Link } from "react-router-dom";

interface ICheckboxProps {
  className: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Checkbox = ({ className, checked, onChange, value }: ICheckboxProps) => {
  return (
    <>
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
        <span>
          Jag godkänner{" "}
          <Link to="/villkor" className="terms">
            användarvillkoren
          </Link>
          *
        </span>
      </label>
    </>
  );
};

export default Checkbox;
