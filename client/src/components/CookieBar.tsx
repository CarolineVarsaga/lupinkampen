import { Link } from "react-router-dom";
import { useCookies } from "../hooks/useCookieBar";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { LiaCookieBiteSolid } from "react-icons/lia";

const CookieBar: React.FC = () => {
  const { cookiesAccepted, acceptCookies } = useCookies();

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
          <div className="cookiebar-text-container">
            <LiaCookieBiteSolid size={70} />
            <p>
              Vi använder cookies och lokal lagring för att förbättra din
              upplevelse. Ingen spårning eller marknadsföring sker.{" "}
              <Link to="/policy">Läs mer</Link>.
            </p>
          </div>
          <div className="cookiebar-buttons-container">
            <Button
              text="Okej, då vet jag!"
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
