import { useState, useEffect } from "react";

const useIsMobile = () => {
  const checkMobile = () => {
    return (
      /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768
    );
  };

  const [isMobile, setIsMobile] = useState(checkMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
