export function getAllTimeZones() {
  const timeZones = Intl.supportedValuesOf('timeZone'); // List of all time zones
  return timeZones.map(tz => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          timeZoneName: 'longOffset'
      });
      const parts = formatter.formatToParts(now);
      const offset = parts.find(part => part.type === 'timeZoneName')?.value ?? '';
      
      return { value: tz, label: offset };
  });
}

export function getTimeValue(date: Date) {
  const seconds = date.getSeconds();
  const mins = date.getMinutes();
  const hour = date.getHours() % 12; // Convert 24-hour format to 12-hour format

  return {
    secondsDegrees: (seconds / 60) * 360,
    minsDegrees: (mins / 60) * 360 + (seconds / 60) * 6,
    hourDegrees: (hour / 12) * 360 + (mins / 60) * 30,
  };
}
