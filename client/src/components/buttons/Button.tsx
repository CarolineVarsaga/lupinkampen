interface IButton {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ text, className, onClick, disabled }: IButton) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
