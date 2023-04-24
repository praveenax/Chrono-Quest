import { motion } from "framer-motion"

function TimelineCard({ position, data, moveTo, emptyTL, count, isStatic }) {

  if (data && data.title !== "") {
    return (
      <>

        <motion.div className={isStatic?"centralCard timelineCardExit":"centralCard tl"} onClick={() => {
          if(!isStatic){
            moveTo(position, data);
          }
        }} whileHover={{
          scale: 1.25,
          transition: { duration: 0.5 },
        }}>


          <img className="centralCardImage tlImage" src={data["image"]} alt="" />
          <div className="centralCardText tlText">{data["title"]}</div>
          
          {
            (isStatic && data && data?.time && data?.time?.display) && (
              <div className="centralCardText tlText2">{data["time"]['display']}</div>
              
            )
          }
          
        </motion.div>



        {
          (position !== 4 && !isStatic) && (
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
          (emptyTL === position && count===4 && !isStatic) && (
            <div className="promptmsg">
              Last Card! Choose Wisely!
            </div>
          )
        }
        {
          (emptyTL === position && count!==4 && !isStatic) && (
            <div className="promptmsg">
              Next Card here!
            </div>
          )
        }
      </>
    );
  }

}

export default TimelineCard;