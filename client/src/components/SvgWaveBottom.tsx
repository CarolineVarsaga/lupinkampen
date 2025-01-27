interface ISvg {
  className?: string;
}

const SvgWaveBottom = ({ className }: ISvg) => {
  return (
    <>
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        className={className}
      >
        <path
          d="M-5.64,113.98 C190.18,31.09 452.03,142.61 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
          fill="#483E73"
          stroke="none"
        ></path>
        <path
          d="M-5.64,113.98 C190.18,31.09 452.03,142.61 500.00,49.98"
          fill="none"
          stroke="white"
          strokeWidth="1"
        ></path>
      </svg>
    </>
  );
};

export default SvgWaveBottom;
