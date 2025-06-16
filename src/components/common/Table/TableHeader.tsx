import React, { JSX } from 'react';
import SortableHeaderCell from './SortableHeaderCell';
import type { TableColumn, SortColumn } from '@customTypes/table';

type TableHeaderProps<TData> = {
  columns: TableColumn<TData>[];
  sortColumn: SortColumn;
  onSort: (column: TableColumn<TData>) => void;
};

function TableHeaderInner<TData>({
  columns,
  sortColumn,
  onSort,
}: TableHeaderProps<TData>) {
  return (
    <thead className="font-semibold text-slate-700 text-left">
      <tr>
        {columns.map((column, index) => {
          const isFirst = index === 0;
          const borderClass = isFirst ? '' : 'border-l';

          return column.sortable ? (
            <SortableHeaderCell
              key={column.name}
              isFirst={isFirst}
              column={column}
              sortColumn={sortColumn}
              onSort={onSort}
            />
          ) : (
            <th
              key={column.name}
              className={`table-cell ${borderClass} ${column.className}`}
              scope="col"
            >
              {column.label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

const TableHeader = React.memo(TableHeaderInner) as <TData>(
  props: TableHeaderProps<TData>
) => JSX.Element;

export default TableHeader;
