import { SORT_BY } from '../constants/sortBy';

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];
