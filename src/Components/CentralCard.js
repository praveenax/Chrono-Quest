import { motion } from "framer-motion";

function CentralCard({ data, onSelect, flashKey, flashResult }) {
  const onImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/logo192.png";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  const flashBg =
    flashResult === "correct"
      ? ["#a8f0a8", "antiquewhite"]
      : flashResult === "wrong"
        ? ["#f0a8a8", "antiquewhite"]
        : "antiquewhite";

  return (
    <motion.div
      key={flashKey}
      className="centralCard"
      role="button"
      tabIndex={0}
      aria-label={`Place "${data.title}" on the timeline`}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      animate={{ backgroundColor: flashBg }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
    >
      <img
        className="centralCardImage"
        src={data.image}
        alt={data.title || "Historical event card"}
        onError={onImageError}
      />
      <div className="centralCardText">{data.title}</div>
    </motion.div>
  );
}

export default CentralCard;
