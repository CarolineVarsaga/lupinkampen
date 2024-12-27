interface IButton {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, className, onClick }: IButton) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
