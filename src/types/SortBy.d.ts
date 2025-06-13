export const SORT_BY_VALUES = ['TEXT', 'PRIORITY', 'DUE_DATE'] as const;
export type SortBy = (typeof SORT_BY_VALUES)[number];
