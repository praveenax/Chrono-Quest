import TimelineCard from "./TimelineCard";

function Timeline({ tArr, moveTo, emptyTL }) {
    return (
      <div id="timeline" className="flex w_100">
        <div id="timeline-wrap" className="flex w_100">
          {
            tArr.map((v, i) => {
              return (
                <div id="cardHolder1" className="cardHolder sm_card" key={i}>
                  <TimelineCard position={i} data={v} moveTo={moveTo} emptyTL={emptyTL} />
                </div>
              );
            })
          }
        </div>
  
      </div>
    )
  }

  export default Timeline;