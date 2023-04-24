import TimelineCard from "./TimelineCard";

function Timeline({ tArr, moveTo, emptyTL,count,isStatic }) {
  const getNum = (num) => {
    let str = "";
    switch(num){
      case 0:
        str="I";
        break;
        case 1:
        str="II";
        break;
        case 2:
        str="III";
        break;
        case 3:
        str="IV";
        break;
        case 4:
        str="V";
        break;
        default:
          break;
    }

    return str;
  }
  return (
    <div id="timeline" className="flex w_100">
      <div className="subtitle">Timeline</div>
      <div id="timeline-wrap" className="flex w_100">
        {
          tArr.map((v, i) => {
            return (
              <div id="cardHolder1" className="cardHolder sm_card" key={i}>
                <div className="ghostnum">
                  {
                    getNum(i)
                  }
                </div>
                <TimelineCard position={i} data={v} moveTo={moveTo} emptyTL={emptyTL} count={count} isStatic={isStatic} />
              </div>
            );
          })
        }
      </div>

    </div>
  )
}

export default Timeline;