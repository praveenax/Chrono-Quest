const HIGH_SCORE_KEY = "chronoquest-highscore";

export function getHighScore() {
  try {
    const stored = window.localStorage.getItem(HIGH_SCORE_KEY);
    return stored ? Number(stored) : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score) {
  try {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // storage unavailable – silent fail
  }
}
