function formatTimeFromSeconds(seconds: number): string {
  const units = [
    { value: 86400, label: 'd' },
    { value: 3600, label: 'h' },
    { value: 60, label: 'm' },
    { value: 1, label: 's' },
  ];

  let remainingTime = seconds;
  let output = '';

  for (const { value, label } of units) {
    const unitCount = Math.floor(remainingTime / value);
    if (unitCount > 0) {
      output += unitCount.toString().padStart(2, '0') + label + ' ';
      remainingTime %= value;
    }
  }

  return output.trim().replace(/^0?(.+)/, '$1');
}

export default formatTimeFromSeconds;
