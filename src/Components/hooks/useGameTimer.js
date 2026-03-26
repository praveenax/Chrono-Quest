import { useCallback, useEffect, useState } from "react";

function useGameTimer(onTimeUp) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    if (timeLeft === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === null) {
          return prevTime;
        }

        return Math.max(prevTime - 1, 0);
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [onTimeUp, timeLeft]);

  const startTimer = useCallback((seconds) => {
    setTimeLeft(seconds);
  }, []);

  const stopTimer = useCallback(() => {
    setTimeLeft(null);
  }, []);

  return {
    timeLeft,
    startTimer,
    stopTimer,
  };
}

export default useGameTimer;
