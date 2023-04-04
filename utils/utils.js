const milisecsToTime = (milisecs) => {
  const seconds = Math.floor((milisecs / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((milisecs / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor((milisecs / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");
  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export { milisecsToTime, formatDate };
