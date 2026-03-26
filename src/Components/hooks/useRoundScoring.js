import { useCallback, useRef, useState } from "react";

function useRoundScoring(setGameover) {
  const hasResolvedRound = useRef(false);
  const [score, setScore] = useState(0);
  const [currscore, setCurrscore] = useState(0);

  const calcScore = useCallback((timeline) => {
    let isGreater = 0;
    let prevVal = null;

    timeline.forEach((entry) => {
      if (!entry?.time) {
        return;
      }

      if (prevVal && Number(entry.time.year) > Number(prevVal.time.year)) {
        isGreater += 1;
      }

      prevVal = entry;
    });

    return isGreater * 20;
  }, []);

  const endRound = useCallback(
    (timeline, stopTimer) => {
      if (hasResolvedRound.current) {
        return;
      }

      hasResolvedRound.current = true;
      const finalScore = calcScore(timeline);
      setCurrscore(finalScore);
      setScore((prevScore) => prevScore + finalScore);
      setGameover(true);
      stopTimer();
    },
    [calcScore, setGameover],
  );

  const beginRound = useCallback(() => {
    hasResolvedRound.current = false;
    setCurrscore(0);
  }, []);

  const resetForRetry = useCallback(() => {
    hasResolvedRound.current = false;
    setScore(0);
    setCurrscore(0);
  }, []);

  return {
    score,
    currscore,
    endRound,
    beginRound,
    resetForRetry,
  };
}

export default useRoundScoring;
