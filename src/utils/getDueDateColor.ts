function getDueDateColor(dueDate: string): string {
  const today = new Date();
  const due = new Date(dueDate);
  const timeDiff = due.getTime() - today.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  if (daysDiff <= 7) {
    return 'bg-red-300';
  }

  if (daysDiff <= 14) {
    return 'bg-yellow-300';
  }

  return 'bg-green-300';
}

export default getDueDateColor;
