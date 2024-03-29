const MONTHS: Indexed = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const formatDate = (date: string | undefined): string => {
  let transformDate;

  if (!!date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    transformDate = `${hours}:${minutes} ${day} ${MONTHS[month]} ${year}`;
  } else {
    transformDate = '';
  }

  return transformDate;
};

export default formatDate;
