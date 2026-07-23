export function formatTimeAgo(isoDateString) {
  if (!isoDateString) return "Belum pernah diperbarui";

  const date = new Date(isoDateString);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  if (secondsAgo < 60) {
    return "Baru saja";
  }

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} menit yang lalu`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} jam yang lalu`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) {
    return `${daysAgo} hari yang lalu`;
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
