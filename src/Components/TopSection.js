function TopSection({
  score,
  highScore,
  time,
  isTimedMode,
  onModeToggle,
  isGameActive,
}) {
  return (
    <div id="scoringArea" className="flex w_100">
      <div id="gameTitle">Chrono Quest!</div>
      <div id="score">Score: {score}</div>
      {highScore > 0 && (
        <div id="highScore" aria-label={`Best score: ${highScore}`}>
          Best: {highScore}
        </div>
      )}
      {isTimedMode && time !== null && (
        <div
          id="time"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${time} seconds remaining`}
        >
          <i className="fa fa-clock" aria-hidden="true"></i>
          <span> {time}</span>
        </div>
      )}
      {!isGameActive && (
        <button
          className="modeToggleBtn"
          onClick={onModeToggle}
          aria-pressed={!isTimedMode}
          aria-label={`Switch to ${isTimedMode ? "relaxed" : "timed"} mode`}
        >
          {isTimedMode ? "⏸ Relaxed" : "⏱ Timed"}
        </button>
      )}
    </div>
  );
}

export default TopSection;
