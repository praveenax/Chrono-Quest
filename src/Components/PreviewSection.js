import { useMemo, useState } from "react";
import cards from "../cards.json";
import { validateAndNormalizeCards } from "../utils/cardValidation";

const formatDate = (time) => {
  if (!time) return "Missing date";
  const month = Number(time.month) || 1;
  const day = Number(time.day) || 1;
  const year = Number(time.year);
  if (!Number.isFinite(year)) return "Invalid year";
  return `${day}/${month}/${year} ${time.ad === false ? "BC" : "AD"}`;
};

function PreviewSection() {
  const [query, setQuery] = useState("");
  const [imageFailures, setImageFailures] = useState({});

  const normalizedCards = useMemo(() => validateAndNormalizeCards(cards), []);
  const invalidCount = cards.length - normalizedCards.length;

  const sortedCards = useMemo(() => {
    return [...normalizedCards].sort((a, b) => {
      const aYear = Number(a?.time?.year) || 0;
      const bYear = Number(b?.time?.year) || 0;
      if (aYear !== bYear) return aYear - bYear;
      const aMonth = Number(a?.time?.month) || 1;
      const bMonth = Number(b?.time?.month) || 1;
      if (aMonth !== bMonth) return aMonth - bMonth;
      const aDay = Number(a?.time?.day) || 1;
      const bDay = Number(b?.time?.day) || 1;
      return aDay - bDay;
    });
  }, [normalizedCards]);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedCards;
    return sortedCards.filter((card) => {
      const title = String(card?.title || "").toLowerCase();
      const display = String(card?.time?.display || "").toLowerCase();
      const year = String(card?.time?.year || "");
      return title.includes(q) || display.includes(q) || year.includes(q);
    });
  }, [query, sortedCards]);

  const onImageError = (title) => {
    setImageFailures((prev) => ({ ...prev, [title]: true }));
  };

  const brokenImageCount = Object.keys(imageFailures).length;

  return (
    <div className="previewSection">
      <div className="previewHeader">
        <div className="previewTitle">Cards Preview / Data Test</div>
        <div className="previewStats">
          <span>Total: {cards.length}</span>
          <span>Valid: {normalizedCards.length}</span>
          <span>Invalid: {invalidCount}</span>
          <span>Broken images: {brokenImageCount}</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="previewSearch"
          placeholder="Search by title, display date or year"
          aria-label="Search preview cards"
        />
      </div>

      <div className="previewGrid">
        {filteredCards.map((card, index) => {
          const hasBrokenImage = Boolean(imageFailures[card.title]);
          return (
            <div className="previewCard" key={`${card.title}-${index}`}>
              <div className="previewCardIndex">#{index + 1}</div>
              <img
                src={hasBrokenImage ? "/logo192.png" : card.image}
                alt={card.title}
                className="previewImage"
                onError={() => onImageError(card.title)}
              />
              <div className="previewCardTitle">{card.title}</div>
              <div className="previewCardDate">{card.time.display}</div>
              <div className="previewCardMeta">{formatDate(card.time)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PreviewSection;
