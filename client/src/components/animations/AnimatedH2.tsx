import { motion } from "framer-motion";

interface IAnimatedHeadingProps {
  text: string;
  textSpan?: string;
  className?: string;
  classNameSpan?: string;
}

const AnimatedH2 = ({
  text,
  className,
  classNameSpan,
  textSpan,
}: IAnimatedHeadingProps) => {
  return (
    <motion.h2
      className={className}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <span className={classNameSpan}>{textSpan}</span>
      {text}
    </motion.h2>
  );
};

export default AnimatedH2;
