interface IButton {
  text: string;
}

const Button = ({ text }: IButton) => {
  return <button className="button">{text}</button>;
};

export default Button;
