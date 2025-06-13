import type SortOrder from './SortOrder';

type SortCriteria = {
  sortBy: 'TEXT' | 'PRIORITY' | 'DUE_DATE';
  order: SortOrder;
};

export default SortCriteria;
