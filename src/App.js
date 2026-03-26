import { useState } from "react";
import "./App.css";
import GameSection from "./Components/GameSection";

function App() {
  const [gameover, setGameover] = useState(false);

  return (
    <div className="App flex">
      <GameSection gameover={gameover} setGameover={setGameover} />
    </div>
  );
}

export default App;
