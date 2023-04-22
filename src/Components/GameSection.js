import { useState } from "react";
import cards from '../cards.json';
import TopSection from "./TopSection";
import CentralCard from "./CentralCard";
import Timeline from "./Timeline";

function GameSection({ gameover, setGameover }) {
    // console.log(cards);
    const emptyObj = {
      title: "", image: "", timestamp: ""
    }
  
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(0);
    const [emptyTL, setEmptyTL] = useState(0);
    const [tArr, setTArr] = useState([emptyObj, emptyObj, emptyObj, emptyObj, emptyObj]);
  
    const [displayCard, setDisplayCard] = useState(emptyObj);
  
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
      } else {
        setEmptyTL(minValue);
      }
  
      setDisplayCard(cards[count + 1]);
      setCount(count + 1);
    }
  
    const moveTo = (startPosition, _data) => {
  
      //swap with the emptytl
      let tempArr = tArr;
  
      tempArr[emptyTL] = _data;
      tempArr[startPosition] = emptyObj;
      setTArr([...tempArr]);
      setEmptyTL(startPosition);
  
      console.log("tempArr", tempArr);
      console.log("startPosition", startPosition);
  
    }
  
    const randNum = (min, max) => Math.floor(Math.random() * max) + min;
  
    return (
      <div id="gamesection" className="flex w_100">
        <TopSection score={score} time={time} />
  
        <div id="topRow" className="flex w_100">
  
          <div id="drawCards" className="w_40 box_center">
            <div className="sm_card" onClick={() => {
              // setDisplayCard(allCardList[randNum(0,allCardList.length-1)]);
              setDisplayCard(cards[0]);
  
            }}>Click Me!</div>
            <br />
            <div className="flex">Remaining cards!!!! {emptyTL}</div>
            <div className="sm_card" >Discarded Cards</div>
  
          </div>
          <div id="displayCard" className="w_60 box_center">
  
            <div className="cardoutline">
              {
                (displayCard && displayCard.title !== "") && (
                  <>
                    <CentralCard data={displayCard} onSelect={onSelect} />
                    {/* <button className="selectCard" onClick={() => onSelect()}>Select the Card</button> */}
  
                    {/* <button className="selectCard" >Discard</button> */}
                  </>
                )
              }
  
  
            </div>
          </div>
  
        </div>
        {/* Timeline */}
        <Timeline tArr={tArr} moveTo={moveTo} emptyTL={emptyTL} />
        {
          gameover && (
            <div className="gameoverModalCover">
              <div className="gameoverModal">
                Game Over
  
                <br>
                </br>
                <button onClick={() => setGameover(false)}>Reset</button>
              </div>
            </div>
          )
        }
  
      </div>
    );
  }

  export default GameSection;