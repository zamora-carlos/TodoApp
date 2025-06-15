import isTodayOrLater from '@utils/isTodayOrLater';
import formatLabel from '@utils/formatLabel';
import { PRIORITY } from '@constants/priority';
import type { Priority } from '@customTypes/priority';

const VALIDATION_CONFIG = {
  TEXT_MIN_LENGTH: 3,
  TEXT_MAX_LENGTH: 120,
} as const;

const VALID_PRIORITIES = Object.values(PRIORITY);
const formattedPriorityLabels = VALID_PRIORITIES.map(formatLabel).join(', ');

export const validateTodoText = (text: string): string | null => {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return 'Name is required';
  }

  if (
    trimmedText.length < VALIDATION_CONFIG.TEXT_MIN_LENGTH ||
    trimmedText.length > VALIDATION_CONFIG.TEXT_MAX_LENGTH
  ) {
    return `Name must be between ${VALIDATION_CONFIG.TEXT_MIN_LENGTH} and ${VALIDATION_CONFIG.TEXT_MAX_LENGTH} characters`;
  }

  return null;
};

export const validateTodoPriority = (priority: Priority): string | null => {
  if (!priority) {
    return 'Priority is required';
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    return `Priority must be one of: ${formattedPriorityLabels}`;
  }

  return null;
};

export const validateTodoDueDate = (
  dueDate: Date | null,
  isRequired: boolean
): string | null => {
  if (!isRequired) return null;

  if (!dueDate) {
    return 'Due date is required';
  }

  if (!isTodayOrLater(dueDate)) {
    return 'Due date must be today or in the future';
  }

  return null;
};
