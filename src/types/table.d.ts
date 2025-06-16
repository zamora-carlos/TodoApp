import type { SortOrder } from './sortOrder';

export type TableColumn<TData> = {
  label: string;
  name: string;
  className: string;
  sortable: boolean;
  content: (item: TData) => React.ReactNode;
};

export type SortColumn = {
  column: string;
  order: SortOrder;
};
