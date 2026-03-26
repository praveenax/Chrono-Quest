import { useEffect, useMemo, useRef, useState } from "react";
import cards from "../cards.json";
import TopSection from "./TopSection";
import CentralCard from "./CentralCard";
import Timeline from "./Timeline";
import useRoundScoring from "./hooks/useRoundScoring";
import useGameTimer from "./hooks/useGameTimer";
import useTimelineState from "./hooks/useTimelineState";
import { validateAndNormalizeCards } from "../utils/cardValidation";
import { getHighScore, saveHighScore } from "../utils/localStorage";

const checkPlacement = (timeline, position) => {
  const card = timeline[position];
  if (!card?.time) return null;
  const year = Number(card.time.year);
  const prevCard = [...timeline.slice(0, position)]
    .reverse()
    .find((c) => c.title !== "");
  const nextCard = timeline.slice(position + 1).find((c) => c.title !== "");
  const prevOk = !prevCard?.time || Number(prevCard.time.year) <= year;
  const nextOk = !nextCard?.time || Number(nextCard.time.year) >= year;
  return prevOk && nextOk ? "correct" : "wrong";
};

function GameSection({ gameover, setGameover }) {
  const [showHelp, setShowHelp] = useState(true);
  const [isTimedMode, setIsTimedMode] = useState(true);
  const [highScore, setHighScore] = useState(() => getHighScore());
  const [placementKey, setPlacementKey] = useState(0);
  const [lastPlacement, setLastPlacement] = useState(null);
  const flashRef = useRef(null);

  const playableCards = useMemo(() => validateAndNormalizeCards(cards), []);
  const { score, currscore, endRound, beginRound, resetForRetry } =
    useRoundScoring(setGameover);
  const { timeLeft, startTimer, stopTimer } = useGameTimer(() =>
    endRound(tArr, stopTimer),
  );
  const {
    count,
    emptyTL,
    tArr,
    displayCard,
    startRound,
    selectCurrentCard,
    moveTo,
    resetTimeline,
  } = useTimelineState(playableCards);

  const isGameActive = count > 0 && !gameover;

  useEffect(() => {
    if (gameover && score > highScore) {
      setHighScore(score);
      saveHighScore(score);
    }
  }, [gameover, score, highScore]);

  useEffect(() => {
    return () => {
      if (flashRef.current) clearTimeout(flashRef.current);
    };
  }, []);

  const startGame = () => {
    beginRound();
    startRound();
    if (isTimedMode) {
      startTimer(90);
    }
  };

  const onSelect = () => {
    if (!displayCard?.title) {
      return;
    }

    const placedAt = emptyTL;
    const { nextTimeline, filled } = selectCurrentCard();

    const result = checkPlacement(nextTimeline, placedAt);
    setLastPlacement(result);
    setPlacementKey((k) => k + 1);

    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => setLastPlacement(null), 700);

    if (filled) {
      endRound(nextTimeline, stopTimer);
    }
  };

  const hideHelp = () => {
    setShowHelp((s) => !s);
  };

  return (
    <div id="gamesection" className="flex w_100">
      <TopSection
        score={score}
        highScore={highScore}
        time={timeLeft}
        isTimedMode={isTimedMode}
        onModeToggle={() => setIsTimedMode((m) => !m)}
        isGameActive={isGameActive}
      />

      <div id="rules">
        <div id="ruleTitle">How to Play!</div>
        <button
          id="eyeBtn"
          className="iconBtn"
          onClick={hideHelp}
          aria-label={showHelp ? "Hide instructions" : "Show instructions"}
          aria-expanded={showHelp}
        >
          <i
            className={`fa ${showHelp ? "fa-eye-slash" : "fa-eye"}`}
            aria-hidden="true"
          ></i>
        </button>
        {showHelp && (
          <>
            1. Click a card to place it on the timeline <br />
            2. Click a timeline card to swap it with the empty slot
            <br />
            3. Fill all 5 slots to complete the round <br />
            4. Score points for correct chronological order <br />
            5. Dates are revealed at the end of each round
          </>
        )}
      </div>

      <div id="topRow" className="flex w_100">
        <div id="drawCards" className="w_100 box_center">
          {count === 0 && (
            <button
              className="start_card"
              onClick={startGame}
              aria-label="Start a new game"
            >
              Start Game!
            </button>
          )}

          {count !== 0 && (
            <div id="displayCard">
              <div className="cardoutline">
                {displayCard && displayCard.title !== "" && (
                  <CentralCard
                    data={displayCard}
                    onSelect={onSelect}
                    flashKey={placementKey}
                    flashResult={lastPlacement}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Timeline
        tArr={tArr}
        moveTo={moveTo}
        emptyTL={emptyTL}
        count={count}
        isStatic={false}
      />
      {gameover && (
        <div
          className="gameoverModalCover"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          {currscore > 0 && (
            <div className="gameoverModal">
              <div id="modalTitle" className="modalHeading">
                End of Round!
              </div>
              <Timeline
                tArr={tArr}
                moveTo={moveTo}
                emptyTL={emptyTL}
                isStatic={true}
              />
              <div className="gameoverModalScore">
                Score {score}
                <div className="gameoverModalScoreHelp">
                  (+{currscore} this round)
                </div>
                {score > 0 && score >= highScore && (
                  <div className="newHighScore">🏆 New High Score!</div>
                )}
              </div>
              <button
                className="nextRound"
                onClick={() => {
                  setGameover(false);
                  startGame();
                }}
              >
                Next Round!
              </button>
            </div>
          )}

          {currscore === 0 && (
            <div className="gameoverModal">
              <div id="modalTitle" className="modalHeading">
                Game Over!
              </div>
              <Timeline
                tArr={tArr}
                moveTo={moveTo}
                emptyTL={emptyTL}
                isStatic={true}
              />
              <div className="gameoverModalScore">Final Score: {score}</div>
              <button
                className="nextRound"
                onClick={() => {
                  setGameover(false);
                  resetForRetry();
                  resetTimeline();
                  stopTimer();
                }}
              >
                Play Again!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GameSection;
