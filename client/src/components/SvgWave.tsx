interface ISvg {
  className?: string;
}

const SvgWave = ({ className }: ISvg) => {
  return (
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className={className}>
      <path
        d="M-3.38,57.73 C210.50,230.44 361.17,69.58 500.56,148.53 L501.12,153.47 L0.00,150.00 Z"
        fill="#483E73"
        stroke="none"
        className="purple-path"
      ></path>
      <path
        d="M-3.38,57.73 C210.50,230.44 361.17,69.58 500.56,148.53"
        fill="none"
        stroke="white"
        strokeWidth="1"
      ></path>
    </svg>
  );
};

export default SvgWave;
