import { useState } from "react";
import './App.css';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cards from './cards.json';


import GameSection from "./Components/GameSection";

const allCardList = cards;

//shows menu and level selection
function MenuScreen() {
  return (
    <>
      <div>
        Chrono Quest!
        <div>
          <button>New Game</button>
          <button>Levels</button>
          <button>Quit</button>
        </div>
      </div>
    </>
  )
}

function App() {
  const [gameover, setGameover] = useState(true);
  return (
    <div className="App flex">
      {
        // !gameover && (
        <GameSection gameover={gameover} setGameover={setGameover} />
        // )
      }

      {/* {
        gameover && (
          <>
            Game Over
          </>
        )
      } */}

    </div>
  );
}

export default App;
