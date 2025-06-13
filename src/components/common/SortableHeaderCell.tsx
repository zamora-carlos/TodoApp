import React, { JSX, useCallback } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import type { TableColumn, SortColumn } from '../../types/table';

type SortableHeaderCellProps<TData> = {
  column: TableColumn<TData>;
  isFirst: boolean;
  sortColumn: SortColumn;
  onSort: (column: TableColumn<TData>) => void;
};

function SortableHeaderCellInner<TData>({
  column,
  isFirst,
  sortColumn,
  onSort,
}: SortableHeaderCellProps<TData>) {
  const isSorted = sortColumn.column === column.name;

  const handleClick = useCallback(() => {
    onSort(column);
  }, [onSort, column]);

  const ariaOrder =
    isSorted && sortColumn.order === 'ASC' ? 'descending' : 'ascending';

  return (
    <th
      onClick={handleClick}
      className={`table-cell cursor-pointer ${isFirst ? '' : 'border-l'} ${column.className}`}
      role="button"
      aria-label={`Sort by ${column.label} in ${ariaOrder} order`}
      scope="col"
    >
      <div className="flex items-center gap-1">
        {column.label}
        <div className="flex flex-col">
          <GoTriangleUp
            className={`w-5 h-auto ${isSorted && sortColumn.order === 'ASC' ? 'text-indigo-500' : 'text-slate-300'}`}
          />
          <GoTriangleDown
            className={`w-5 h-auto -mt-3 ${isSorted && sortColumn.order === 'DESC' ? 'text-indigo-500' : 'text-slate-300'}`}
          />
        </div>
      </div>
    </th>
  );
}

const SortableHeaderCell = React.memo(SortableHeaderCellInner) as <TData>(
  props: SortableHeaderCellProps<TData>
) => JSX.Element;

export default SortableHeaderCell;
