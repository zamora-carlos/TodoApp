import { SORT_ORDER } from '@constants/sortOrder';

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
