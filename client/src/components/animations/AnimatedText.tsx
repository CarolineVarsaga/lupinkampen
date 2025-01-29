import { motion } from "framer-motion";

interface IAnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText = ({ text, className }: IAnimatedTextProps) => {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    >
      {text}
    </motion.p>
  );
};

export default AnimatedText;
