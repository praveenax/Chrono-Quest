import { useCallback, useEffect, useRef, useState } from "react";
import cards from "../cards.json";
import TopSection from "./TopSection";
import CentralCard from "./CentralCard";
import Timeline from "./Timeline";
import _ from "lodash";

const makeEmptyCard = () => ({
  title: "",
  image: "",
  timestamp: 0,
});

const makeEmptyTimeline = () => [
  makeEmptyCard(),
  makeEmptyCard(),
  makeEmptyCard(),
  makeEmptyCard(),
  makeEmptyCard(),
];

function GameSection({ gameover, setGameover }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const hasResolvedRound = useRef(false);

  const [score, setScore] = useState(0);
  const [currscore, setCurrscore] = useState(0);
  const [count, setCount] = useState(0);
  const [emptyTL, setEmptyTL] = useState(0);
  const [tArr, setTArr] = useState(makeEmptyTimeline());
  const [displayCard, setDisplayCard] = useState(makeEmptyCard());
  const [shuffledCards, setShuffled] = useState([]);
  const [showHelp, setShowHelp] = useState(true);

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
    (timeline) => {
      if (hasResolvedRound.current) {
        return;
      }

      hasResolvedRound.current = true;
      const finalScore = calcScore(timeline);

      setCurrscore(finalScore);
      setScore((prevScore) => prevScore + finalScore);
      setGameover(true);
      setTimeLeft(null);
    },
    [calcScore, setGameover],
  );

  useEffect(() => {
    if (timeLeft === 0) {
      endRound(tArr);
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
  }, [endRound, tArr, timeLeft]);

  const startGame = () => {
    hasResolvedRound.current = false;
    setEmptyTL(0);
    setCount(1);
    const randCards = _.shuffle(cards);
    setShuffled(randCards);
    setDisplayCard(randCards[0]);
    setTArr(makeEmptyTimeline());
    setCurrscore(0);
    setTimeLeft(90);
  };

  const onSelect = () => {
    const nextTimeline = [...tArr];
    nextTimeline[emptyTL] = displayCard;
    setTArr(nextTimeline);

    const nextEmpty = nextTimeline.findIndex((entry) => entry.title === "");
    if (nextEmpty === -1) {
      endRound(nextTimeline);
    } else {
      setEmptyTL(nextEmpty);
      setDisplayCard(shuffledCards[count] || makeEmptyCard());
      setCount((prevCount) => prevCount + 1);
    }
  };

  const moveTo = (startPosition, _data) => {
    const tempArr = [...tArr];
    tempArr[emptyTL] = _data;
    tempArr[startPosition] = makeEmptyCard();
    setTArr(tempArr);
    setEmptyTL(startPosition);
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
                  // setDisplayCard(allCardList[randNum(0,allCardList.length-1)]);

                  //lodash - shuffle - 0
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
                  setScore(0);
                  setCurrscore(0);
                  setCount(0);
                  setEmptyTL(0);
                  setTArr(makeEmptyTimeline());
                  setDisplayCard(makeEmptyCard());
                  setShuffled([]);
                  setTimeLeft(null);
                  hasResolvedRound.current = false;
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
