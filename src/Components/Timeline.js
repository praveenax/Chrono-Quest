import TimelineCard from "./TimelineCard";

function Timeline({ tArr, moveTo, emptyTL, count, isStatic }) {
  const getNum = (num) => {
    let str = "";
    switch (num) {
      case 0:
        str = "I";
        break;
      case 1:
        str = "II";
        break;
      case 2:
        str = "III";
        break;
      case 3:
        str = "IV";
        break;
      case 4:
        str = "V";
        break;
      default:
        break;
    }

    return str;
  };
  return (
    <div id="timeline" className="flex w_100">
      <div className="subtitle">Timeline</div>
      <div id="timeline-wrap" className="flex w_100">
        {!isStatic && (
          <div className="timelineGuide" aria-hidden="true">
            <div className="guideLabel">Place cards left to right</div>
            <div className="guideTrack">
              <div className="guidePulse" />
              <div className="guideArrow">&gt;&gt;&gt;</div>
            </div>
            <div className="guideHint">Swap cards to rearrange timeline</div>
          </div>
        )}
        {tArr.map((v, i) => {
          const isActiveSlot = emptyTL === i && !isStatic;
          return (
            <div
              className={`cardHolder sm_card${isActiveSlot ? " active-slot" : ""}`}
              key={i}
            >
              <div className="ghostnum">{getNum(i)}</div>
              <TimelineCard
                position={i}
                data={v}
                moveTo={moveTo}
                emptyTL={emptyTL}
                count={count}
                isStatic={isStatic}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
