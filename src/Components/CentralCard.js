import { motion } from "framer-motion"

function CentralCard({ data, onSelect }) {
    const onImageError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = "/logo192.png";
    };

    return (
        <motion.div className="centralCard" onClick={() => onSelect()} whileHover={{
            scale: 1.1,
            transition: { duration: 0.5 },
        }}>
            <img className="centralCardImage" src={data["image"]} alt={data["title"] || "Historical event card"} onError={onImageError} />
            
            

          
            <div className="centralCardText">{data["title"]}</div>

        </motion.div>
    )
}

export default CentralCard;