export const STATUS_VALUES = ['DONE', 'UNDONE'] as const;
export type Status = (typeof STATUS_VALUES)[number];
