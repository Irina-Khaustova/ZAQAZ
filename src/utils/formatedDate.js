export default function formatedDate(dateStr) {
  const dateObj = new Date(dateStr);

  const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}.${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}.${dateObj.getFullYear()}`;

  return formattedDate;
}
