export const PRIORITY_VALUES = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type Priority = (typeof PRIORITY_VALUES)[number];
