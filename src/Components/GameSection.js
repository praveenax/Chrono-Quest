import { useMemo, useState } from "react";
import cards from "../cards.json";
import TopSection from "./TopSection";
import CentralCard from "./CentralCard";
import Timeline from "./Timeline";
import useRoundScoring from "./hooks/useRoundScoring";
import useGameTimer from "./hooks/useGameTimer";
import useTimelineState from "./hooks/useTimelineState";
import { validateAndNormalizeCards } from "../utils/cardValidation";

function GameSection({ gameover, setGameover }) {
  const [showHelp, setShowHelp] = useState(true);

  const playableCards = useMemo(() => validateAndNormalizeCards(cards), []);
  const { score, currscore, endRound, beginRound, resetForRetry } = useRoundScoring(setGameover);
  const { timeLeft, startTimer, stopTimer } = useGameTimer(() => endRound(tArr, stopTimer));
  const { count, emptyTL, tArr, displayCard, startRound, selectCurrentCard, moveTo, resetTimeline } =
    useTimelineState(playableCards);

  const startGame = () => {
    beginRound();
    startRound();
    startTimer(90);
  };

  const onSelect = () => {
    if (!displayCard?.title) {
      return;
    }

    const { nextTimeline, filled } = selectCurrentCard();
    if (filled) {
      endRound(nextTimeline, stopTimer);
    }
  };

  const hideHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div id="gamesection" className="flex w_100">
      <TopSection score={score} time={timeLeft} />

      <div id="rules">
        <div id="ruleTitle">How to Play!</div>
        <div id="eyeBtn" onClick={() => hideHelp()}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </div>
        {showHelp && (
          <>
            1. Select event or discard! <br />
            2. Arrange the events by clicking on the timeline
            <br />
            3. Choose the last card to complete the timeline <br />
            4. Check your score! <br />
            5. Liked it so far? Load the next round
          </>
        )}
      </div>

      <div id="topRow" className="flex w_100">
        <div id="drawCards" className="w_100 box_center">
          {count === 0 && (
            <>
              <div
                onClick={() => {
                  if (count === 0) {
                    startGame();
                  } else {
                    return;
                  }
                }}
                className={"start_card"}
              >
                Start Game!
              </div>
            </>
          )}

          {count !== 0 && (
            <div id="displayCard">
              <div className="cardoutline">
                {displayCard && displayCard.title !== "" && (
                  <>
                    <CentralCard data={displayCard} onSelect={onSelect} />
                  </>
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
        <div className="gameoverModalCover">
          {currscore > 0 && (
            <div className="gameoverModal">
              End of Round!
              <br />
              <Timeline
                tArr={tArr}
                moveTo={moveTo}
                emptyTL={emptyTL}
                isStatic={true}
              />
              <div className="gameoverModalScore">
                Score {score}{" "}
                <div className="gameoverModalScoreHelp">
                  (You have scored +{currscore} in this round)
                </div>
              </div>
              {/* <br /> */}
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
              Game Over!
              <br />
              <Timeline
                tArr={tArr}
                moveTo={moveTo}
                emptyTL={emptyTL}
                isStatic={true}
              />
              <div className="gameoverModalScore">Score {score}</div>
              {/* <br /> */}
              <button
                className="nextRound"
                onClick={() => {
                  setGameover(false);
                  resetForRetry();
                  resetTimeline();
                  stopTimer();
                }}
              >
                Retry!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GameSection;
