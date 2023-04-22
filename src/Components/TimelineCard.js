import { motion } from "framer-motion"

function TimelineCard({ position, data, moveTo, emptyTL }) {

  if (data && data.title !== "") {
    return (
      <>
        {position}
        <motion.div className="centralCard tl" onClick={() => moveTo(position, data)} whileHover={{
          scale: 1.05,
          transition: { duration: 1 },
        }}>
          
          <img className="centralCardImage tlImage" src={data["image"]} alt="" />
          <div className="centralCardText tlText">{position}-{data["title"]}</div>
        </motion.div>
        
       
        
          {
            position !== 4 && (
    <       div id="arrowAnim">
              <div class="arrowSliding">
                <div class="arrow"></div>
              </div>
              <div class="arrowSliding delay1">
                <div class="arrow"></div>
              </div>
              <div class="arrowSliding delay2">
                <div class="arrow"></div>
              </div>
              <div class="arrowSliding delay3">
                <div class="arrow"></div>
              </div>
            </div>
            )
          }
        
      </>
    )
  } else {
    return (
      <>
         {
          emptyTL === position && (
            <div>
              Next Card
            </div>
          )
        }
      </>
    );
  }

}

export default TimelineCard;