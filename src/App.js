import { useState, useEffect } from "react";
import './App.css';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const allCardList = [{
  title: "Fall of the Berlin Wall",
  image: "https://th.bing.com/th/id/OIP.uno0VIsBgWAkfXQTQ-wqOwHaK0?w=204&h=299&c=7&r=0&o=5&pid=1.7",
  timestamp: ""
}, {
  title: "Construction of the Great Wall of China",
  image: "https://th.bing.com/th/id/R.b87bf60c90de53867d86e7a032a31706?rik=zgOJ8qKKU90%2fwA&riu=http%3a%2f%2fwww.china-mike.com%2fwp-content%2fuploads%2f2011%2f01%2fgreat-wall-battle-illustration.jpg&ehk=6C4g6TBY9qDvgRnwpbscDwsIF4eS8S6ap6XgE9cdFKY%3d&risl=&pid=ImgRaw&r=0",
  timestamp: ""
}, {
  title: "Wright Brothers' first successful flight",
  image: "https://th.bing.com/th/id/OIP.91YM0DjqOFezMcP05pVC3gHaKY?pid=ImgDet&rs=1",
  timestamp: ""
}, {
  title: "Discovery of the New world by Christopher Columbus",
  image: "https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/11141971/image/cc207ecf40f94edc4479fa43a8809420",
  timestamp: ""
}, {
  title: "American Revolution",
  image: "https://i.pinimg.com/originals/6a/ef/52/6aef5230e824b5419021ccc1fe8c840a.jpg",
  timestamp: ""
}, {
  title: "Wright Brothers' first successful flight",
  image: "https://th.bing.com/th/id/OIP.91YM0DjqOFezMcP05pVC3gHaKY?pid=ImgDet&rs=1",
  timestamp: ""
}, {
  title: "Wright Brothers' first successful flight",
  image: "https://th.bing.com/th/id/OIP.91YM0DjqOFezMcP05pVC3gHaKY?pid=ImgDet&rs=1",
  timestamp: ""
}, {
  title: "Wright Brothers' first successful flight",
  image: "https://th.bing.com/th/id/OIP.91YM0DjqOFezMcP05pVC3gHaKY?pid=ImgDet&rs=1",
  timestamp: ""
}, {
  title: "Wright Brothers' first successful flight",
  image: "https://th.bing.com/th/id/OIP.91YM0DjqOFezMcP05pVC3gHaKY?pid=ImgDet&rs=1",
  timestamp: ""
}, {
  title: "Wright Brothers' first successful flight",
  image: "https://th.bing.com/th/id/OIP.91YM0DjqOFezMcP05pVC3gHaKY?pid=ImgDet&rs=1",
  timestamp: ""
}];
function CentralCard({ data }) {
  return (
    <div className="centralCard">
      <img className="centralCardImage" src={data["image"]} alt="" />
      <div className="centralCardText">{data["title"]}</div>
    </div>
  )
}



function TimelineCard({ position, data, moveTo }) {

  if (data && data.title !== "") {
    return (
      <>
        <div className="centralCard tl" >
          <img className="centralCardImage" src={data["image"]} alt="" />
          <div className="centralCardText tlText">{data["title"]}</div>
        </div>
        {/* <button className="tlbtn" onClick={()=>{
        //move the card to open gap in timeline
      }}>Drop</button> */}

        <button className="tlbtn" onClick={() => {
          //move the card to open gap in timeline
          //check for the next tl. 
          //like from one to two and if two is occupied. move two to three.
          //check currect position
          moveTo(position, data);
        }}>Move</button>
      </>
    )
  } else {
    return null;
  }

}
function GameSection() {
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [emptyTL, setEmptyTL] = useState(0);
  const [tArr,setTArr] = useState([{
    title:"",image:"",timestamp:""
  },{
    title:"",image:"",timestamp:""
  },{
    title:"",image:"",timestamp:""
  },{
    title:"",image:"",timestamp:""
  },{
    title:"",image:"",timestamp:""
  }]);
  // const TimeLineArray = [0,1,2,3,4];

  const [displayCard, setDisplayCard] = useState({
    title: "",
    image: "",
    timestamp: ""
  });
  
  function filterCards(arr){
    // 1-1-
    // 1---
    //this is to avoid empty gaps.
    let res = [];
    let empty = false;
    let prevObj = {};
    let cacheObj = {};
    arr.forEach((v,i)=>{
      
    })
    
    const fromIndex = arr.indexOf({
      title:"",
      image:"",
      timestamp:""
    }); // 👉️ 0

    console.log("fromindex",fromIndex);
    const toIndex = 2;

// const element = arr.splice(fromIndex, 1)[0];
// console.log(element);

    console.log("arr",arr);
    console.log("res",res);
    return arr;
  }

  const moveTo = (startPosition, _data) => {
    
    // if(startPosition > emptyTL){
    //   return;
    // }

    // if(startPosition < emptyTL){
      //swap with the emptytl
      let tempArr = tArr;
      let cardObj = tArr[startPosition];
      
      let resArr = [];
      tempArr[emptyTL] = _data;  
      tempArr[startPosition] = {
        title:"",image:"",timestamp:""
      };
      setTArr([...tempArr]);
      setEmptyTL(startPosition);
    // }


    console.log("tempArr",tempArr);
    console.log("startPosition",startPosition);
    
  
  
  }

 

  const randNum = (min,max) => Math.floor(Math.random() * max) + min;

  // const TimeLineArray = [0,1,2,3,4];
  const getTL = (pos) => {
    // switch(pos){
    //   case 0:
    //     return firstTL;
    //   // break;
    //   case 1:
    //     return secondTL;
    //   // break;
    //   case 2:
    //     return thirdTL;
    //   // break;
    //   case 3:
    //     return fourthTL;
    //   // break;
    //   case 4:
    //     return fifthTL;
    //   // break;
    //   default:
    //     return {};
    // }
  }

  return (
    <div id="gamesection" className="flex w_100">
      <div id="scoringArea" className="flex w_100">

        <div id="score" className="">
          Score: {score}
        </div>

        <div id="gameTitle" className="">
          Chrono Quest!
        </div>
        <div id="time" className="">
          Time: {time}
        </div>
      </div>
      <div id="topRow" className="flex w_100">

        <div id="drawCards" className="w_25 box_center">
          <div className="sm_card" onClick={() => {
            // setDisplayCard(allCardList[randNum(0,allCardList.length-1)]);
            setDisplayCard(allCardList[0]);

          }}>Click Me!</div>
          <br />
          <div className="flex">Remaining cards!!!! {emptyTL}</div>

        </div>
        <div id="displayCard" className="w_50 box_center">

          <div className="cardoutline">

            <CentralCard data={displayCard} />
            <button className="selectCard" onClick={() => {
              //move the card to open gap in timeline

              //emptyTL - point to the empty space
              let arr = tArr;
              // arr.forEach((v,i)=>{
              //   //
                
              // });
              console.log("emptyTL",emptyTL);
              arr[emptyTL] = displayCard;

              setTArr(arr);

              console.log(arr);
              //logic to find the first empty space
              let minValue = arr.length;
              arr.forEach((v,i)=>{
                if(v.title === "" && i <= minValue){
                  minValue = i;
                }
              })
              setEmptyTL(minValue);

              setDisplayCard(allCardList[count + 1]);
              setCount(count+1);

            }}>Select the Card</button>

          </div>
        </div>
        <div id="discardCards" className="w_25 box_center">

          <div className="sm_card">Discarded Cards</div>
        </div>
      </div>

      <div id="timeline" className="flex w_100">
            {
              tArr.map((v,i)=>{
                return(
                  <div id="cardHolder1" className="cardHolder sm_card" key={i}>
                    <TimelineCard position={i} data={v} moveTo={moveTo} />
                  </div>
                );
                
              })
            }
       
      </div>
    </div>
  );
}
function App() {


  return (
    <div className="App flex">
      {/* <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    > */}
      <GameSection />
      {/* </DragDropContext> */}

    </div>
  );
}

export default App;
