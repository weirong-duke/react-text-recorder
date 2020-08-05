// From https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// Thanks, Dan
import {useEffect, useRef} from "react";

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback?.current?.();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
