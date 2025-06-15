function formatLabel(value: string): string {
  const words = value
    .trim()
    .toLowerCase()
    .split(/[_\-\s]+/)
    .filter(Boolean);

  if (words.length === 0) {
    return '';
  }

  const result = words.join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default formatLabel;
