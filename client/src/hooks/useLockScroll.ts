import { useEffect } from "react";

const useLockScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add("no-scroll");
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.classList.remove("no-scroll");
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.style.overflow = "";
    };
  }, [isLocked]);
};

export default useLockScroll;
