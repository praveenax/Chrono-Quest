function TopSection({ score, time }) {
  return (
    <div id="scoringArea" className="flex w_100">
      <div id="gameTitle" className="">
        Chrono Quest!
      </div>
      <div id="score" className="">
        Score: {score}
      </div>
      <div id="time" className="">
      <i className="fa fa-clock" aria-hidden="true"></i> {time}
      </div>
    </div>
  )
}

export default TopSection;