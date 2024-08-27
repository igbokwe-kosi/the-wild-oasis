import { useEffect, useRef } from "react";

function useOutsideClick(handler, listeningCapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listeningCapture);

      return function () {
        document.removeEventListener("click", handleClick, listeningCapture);
      };
    },
    [handler, listeningCapture]
  );

  return { ref };
}

export default useOutsideClick;
