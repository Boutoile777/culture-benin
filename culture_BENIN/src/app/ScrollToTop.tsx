import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router conserve la position de scroll entre les routes : sans ceci,
// on arrive sur une nouvelle page déjà scrollée au niveau de l'ancienne.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
