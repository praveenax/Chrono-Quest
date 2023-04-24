import { useEffect, useState } from "react";
import cards from '../cards.json';
import TopSection from "./TopSection";
import CentralCard from "./CentralCard";
import Timeline from "./Timeline";
import _ from "lodash";

function GameSection({ gameover, setGameover }) {
  // console.log(cards);
  // const [seconds, setSeconds] = useState(0);
  // const [deadline, setDeadline] = useState();
  const [timeLeft, setTimeLeft] = useState(null);
  const emptyObj = {
    title: "", image: "", timestamp: 0
  }

  useEffect(() => {
    calcScore();
  }, [gameover]);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameover(true);
      setTimeLeft(null)
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);


  const [score, setScore] = useState(0);
  const [currscore, setCurrscore] = useState(0);
  const [count, setCount] = useState(0);
  // const [time, setTime] = useState(60);
  const [emptyTL, setEmptyTL] = useState(0);
  const [tArr, setTArr] = useState([emptyObj, emptyObj, emptyObj, emptyObj, emptyObj]);

  const [displayCard, setDisplayCard] = useState(emptyObj);
  const [shuffledCards, setShuffled] = useState([]);
  const [showHelp, setShowHelp] = useState(true);


  const startGame = () => {
    setEmptyTL(0);
    setCount(1);
    let randCards = _.shuffle(cards);
    setShuffled(randCards);
    setDisplayCard(randCards[0]);
    var t = new Date();
    t.setSeconds(t.getSeconds() + 10);
    // setDeadline(t);
    // setTime(t)
    setTimeLeft(90);

  }


  const onSelect = () => {
    //move the card to open gap in timeline

    //emptyTL - point to the empty space
    let arr = tArr;

    arr[emptyTL] = displayCard;

    setTArr(arr);

    //logic to find the first empty space
    let minValue = arr.length;
    arr.forEach((v, i) => {
      if (v.title === "" && i <= minValue) {
        minValue = i;
      }
    })
    if (minValue === 5) {
      setGameover(true);
      setTimeLeft(null)
    } else {
      setEmptyTL(minValue);
    }

    // setDisplayCard(cards[count + 1]);
    setDisplayCard(shuffledCards[count]);
    setCount(count + 1);
  }

  const moveTo = (startPosition, _data) => {

    //swap with the emptytl
    let tempArr = tArr;

    tempArr[emptyTL] = _data;
    tempArr[startPosition] = emptyObj;
    setTArr([...tempArr]);
    setEmptyTL(startPosition);



  }

  const hideHelp = () => {
    setShowHelp(!showHelp);
  }

  // const randNum = (min, max) => Math.floor(Math.random() * max) + min;

  const calcScore = () => {
    let finalScore = 0;

    let isGreater = 0;
    let prevVal = tArr[0];
    tArr.forEach((v, i) => {
      if (i !== 0 && v.time) {
        if (v?.time?.year > prevVal?.time?.year) {
          isGreater++;
        }

        prevVal = v;
      }
    })

    finalScore = isGreater * 20;

    setCurrscore(finalScore);
    setScore(score + finalScore);

  }

  return (
    <div id="gamesection" className="flex w_100">
      <TopSection score={score} time={timeLeft} />


      <div id="rules">
        <div id="ruleTitle">How to Play!</div>
        <div id="eyeBtn" onClick={() => hideHelp()}><i className="fa fa-eye" aria-hidden="true"></i></div>
        {
          showHelp && (
            <>
              1. Select event or discard! <br />
              2. Arrange the events by clicking on the timeline<br />
              3. Choose the last card to complete the timeline <br />
              4. Check your score! <br />
              5. Liked it so far? Load the next round
            </>
          )
        }
      </div>



      <div id="topRow" className="flex w_100">

        <div id="drawCards" className="w_100 box_center">


          {
            count === 0 && (
              <>
                <div onClick={() => {
                  // setDisplayCard(allCardList[randNum(0,allCardList.length-1)]);

                  //lodash - shuffle - 0
                  if (count === 0) {
                    startGame();
                  } else {
                    return;
                  }



                }} className={"start_card"}>
                  Start Game!
                </div>
              </>
            )
          }

          {
            count !== 0 && (

              <div id="displayCard">
                <div className="cardoutline">
                  {
                    (displayCard && displayCard.title !== "") && (
                      <>
                        <CentralCard data={displayCard} onSelect={onSelect} />

                      </>
                    )
                  }


                </div>
              </div>

            )
          }




        </div>


      </div>

      <Timeline tArr={tArr} moveTo={moveTo} emptyTL={emptyTL} count={count} isStatic={false} />
      {
        gameover && (
          <div className="gameoverModalCover">
            {
              currscore > 0 && (
                <div className="gameoverModal">
                  End of Round!
                  <br />
                  <Timeline tArr={tArr} moveTo={moveTo} emptyTL={emptyTL} isStatic={true} />

                  <div className="gameoverModalScore">
                    Score {score} <div className="gameoverModalScoreHelp">(You have scored +{currscore} in this round)</div>
                  </div>

                  {/* <br /> */}
                  <button className="nextRound" onClick={() => {
                    setGameover(false);
                    //score the points
                    calcScore();
                    //reset the timeline
                    setTArr([emptyObj, emptyObj, emptyObj, emptyObj, emptyObj])

                    startGame();
                  }}>Next Round!</button>
                </div>
              )
            }

            {
              currscore === 0 && (
                <div className="gameoverModal">
                  Game Over!

                  <br />


                  <Timeline tArr={tArr} moveTo={moveTo} emptyTL={emptyTL} isStatic={true} />

                  <div className="gameoverModalScore">
                    Score {score}
                  </div>

                  {/* <br /> */}
                  <button className="nextRound" onClick={() => {
                    // setScore(0);
                    setGameover(false);
                    //score the points
                    // calcScore();
                    //reset the timeline
                    setTArr([emptyObj, emptyObj, emptyObj, emptyObj, emptyObj])

                    // startGame();
                    setScore(0);
                  }}>Retry!</button>
                </div>
              )
            }


          </div>
        )
      }

    </div>
  );
}

export default GameSection;