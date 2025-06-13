import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import type { TableColumn, SortColumn } from '../../types/Table';

type TableProps<TData extends { id: string | number }> = {
  columns: TableColumn<TData>[];
  data: TData[];
  sortColumn: SortColumn;
  onSort: (column: TableColumn<TData>) => void;
};

function TableComponent<TData extends { id: string | number }>({
  columns,
  data,
  sortColumn,
  onSort,
}: TableProps<TData>) {
  return (
    <div className="overflow-x-auto w-full">
      <div className="border border-slate-300 rounded-2xl overflow-hidden mt-2 min-w-2xl">
        <table className="table-fixed w-full">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody columns={columns} data={data} />
        </table>
      </div>
    </div>
  );
}

const Table = React.memo(TableComponent) as typeof TableComponent;

export default Table;
