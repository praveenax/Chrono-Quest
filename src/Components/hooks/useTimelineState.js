import { useCallback, useState } from "react";
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

function useTimelineState(cards) {
  const [count, setCount] = useState(0);
  const [emptyTL, setEmptyTL] = useState(0);
  const [tArr, setTArr] = useState(makeEmptyTimeline());
  const [displayCard, setDisplayCard] = useState(makeEmptyCard());
  const [shuffledCards, setShuffled] = useState([]);

  const resetTimeline = useCallback(() => {
    setCount(0);
    setEmptyTL(0);
    setTArr(makeEmptyTimeline());
    setDisplayCard(makeEmptyCard());
    setShuffled([]);
  }, []);

  const startRound = useCallback(() => {
    if (!cards.length) {
      resetTimeline();
      return;
    }

    const randCards = _.shuffle(cards);
    setShuffled(randCards);
    setCount(1);
    setEmptyTL(0);
    setTArr(makeEmptyTimeline());
    setDisplayCard(randCards[0] || makeEmptyCard());
  }, [cards, resetTimeline]);

  const selectCurrentCard = useCallback(() => {
    const nextTimeline = [...tArr];
    nextTimeline[emptyTL] = displayCard;
    setTArr(nextTimeline);

    const nextEmpty = nextTimeline.findIndex((entry) => entry.title === "");
    if (nextEmpty === -1) {
      return { nextTimeline, filled: true };
    }

    setEmptyTL(nextEmpty);
    setDisplayCard(shuffledCards[count] || makeEmptyCard());
    setCount((prevCount) => prevCount + 1);
    return { nextTimeline, filled: false };
  }, [count, displayCard, emptyTL, shuffledCards, tArr]);

  const moveTo = useCallback((startPosition, data) => {
    setTArr((prevTimeline) => {
      const nextTimeline = [...prevTimeline];
      nextTimeline[emptyTL] = data;
      nextTimeline[startPosition] = makeEmptyCard();
      return nextTimeline;
    });
    setEmptyTL(startPosition);
  }, [emptyTL]);

  return {
    count,
    emptyTL,
    tArr,
    displayCard,
    startRound,
    selectCurrentCard,
    moveTo,
    resetTimeline,
  };
}

export { makeEmptyCard, makeEmptyTimeline };
export default useTimelineState;
