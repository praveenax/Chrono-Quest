function normalizeCard(card) {
  if (!card || typeof card !== "object") {
    return null;
  }

  const title = typeof card.title === "string" ? card.title.trim() : "";
  const image = typeof card.image === "string" ? card.image.trim() : "";
  const year = Number(card?.time?.year);

  if (!title || !Number.isFinite(year)) {
    return null;
  }

  const month = Number(card?.time?.month) || 1;
  const day = Number(card?.time?.day) || 1;
  const ad = typeof card?.time?.ad === "boolean" ? card.time.ad : true;
  const display =
    card?.time?.display !== undefined && card?.time?.display !== null
      ? String(card.time.display)
      : String(year);

  return {
    title,
    image,
    time: {
      year,
      month,
      day,
      ad,
      display,
    },
  };
}

export function validateAndNormalizeCards(cards) {
  if (!Array.isArray(cards)) {
    return [];
  }

  const normalized = cards.map(normalizeCard).filter(Boolean);

  if (normalized.length !== cards.length) {
    console.warn(
      `Chrono Quest: filtered ${cards.length - normalized.length} invalid cards from dataset.`,
    );
  }

  return normalized;
}
