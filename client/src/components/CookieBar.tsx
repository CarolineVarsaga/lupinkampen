import { useCookies } from "../hooks/useCookieBar";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

const CookieBar: React.FC = () => {
  const { cookiesAccepted, acceptCookies, declineCookies } = useCookies();

  const animationVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {!cookiesAccepted && (
        <motion.div
          className="cookiebar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <p>
            Vi använder cookies för att förbättra din upplevelse.{" "}
            <a href="/policy">Läs mer</a>.
          </p>
          <div className="cookiebar-buttons-container">
            <Button
              text="Neka"
              onClick={declineCookies}
              className="cookiebar-decline-button"
            />
            <Button
              text="Acceptera"
              onClick={acceptCookies}
              className="cookiebar-accept-button"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBar;
