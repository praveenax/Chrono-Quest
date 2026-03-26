import { useState } from "react";
import "./App.css";
import GameSection from "./Components/GameSection";
import PreviewSection from "./Components/PreviewSection";

function App() {
  const [gameover, setGameover] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="App flex appRoot">
      <div className="appModeBar">
        <button
          className="modeToggleBtn"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          {showPreview ? "Back To Game" : "Open Preview Section"}
        </button>
      </div>

      {showPreview ? (
        <PreviewSection />
      ) : (
        <GameSection gameover={gameover} setGameover={setGameover} />
      )}
    </div>
  );
}

export default App;
