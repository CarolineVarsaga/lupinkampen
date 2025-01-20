import { useState } from "react";

interface ILupinPickerProps {
  name: string;
  id: number;
  incrementValue: number;
  min: number;
  max: number;
  onLupinsChange: (newValue: number, id: number) => void;
}

const LupinPicker = ({
  name,
  id,
  incrementValue,
  min,
  max,
  onLupinsChange,
}: ILupinPickerProps) => {
  const [lupinsPicked, setLupinsPicked] = useState(min);

  const handleIncrease = () => {
    if (lupinsPicked + incrementValue <= max) {
      const newLupinsPicked = lupinsPicked + incrementValue;
      setLupinsPicked(newLupinsPicked);
      onLupinsChange(newLupinsPicked, id);
    }
  };

  const handleDecrease = () => {
    if (lupinsPicked - incrementValue >= min) {
      const newLupinsPicked = lupinsPicked - incrementValue;
      setLupinsPicked(newLupinsPicked);
      onLupinsChange(newLupinsPicked, id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setLupinsPicked(value);
    onLupinsChange(value, id);
  };

  return (
    <div className="register-lupines-add-container">
      <p>{name}</p>
      <div className="lupins-picker-container">
        <button
          onClick={handleDecrease}
          className="lupins-button-decrease amount-button"
        >
          -
        </button>
        <input
          type="number"
          value={lupinsPicked}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="lupins-input"
        />
        <button
          onClick={handleIncrease}
          className="lupins-button-increase amount-button"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default LupinPicker;
