export function getDateWithoutTime(dateString: string) {
  const [date] = dateString.split("T");

  const [year, month, day] = date.split("-");

  return `${year}.${month}.${day}`;
}
