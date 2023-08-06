
function generateTimeArray(startHour: number, endHour: number) {
  const timesArray = [];
  let hour = startHour;
  let minute = 0;

  while (hour < endHour) {
    while (minute < 60) {
      timesArray.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      minute += 15;
    }
    hour++;
    minute = 0;
  }

  return timesArray;
}

export const timeArray = generateTimeArray(0, 24);
