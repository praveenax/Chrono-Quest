import { motion } from "framer-motion"

function CentralCard({ data, onSelect }) {
    return (
        <motion.div className="centralCard" onClick={() => onSelect()} whileHover={{
            scale: 1.1,
            transition: { duration: 0.5 },
        }}>
            <img className="centralCardImage" src={data["image"]} alt="" />
            
            

          
            <div className="centralCardText">{data["title"]}</div>

            {/* <div id="discardSpace">

            </div>

            <div id="selectSpace">

            </div> */}
        </motion.div>
    )
}

export default CentralCard;