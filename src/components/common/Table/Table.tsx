import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import type { TableColumn, SortColumn } from '@customTypes/table';

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
    <div className="border border-slate-300 rounded-2xl overflow-auto mt-2">
      <table className="table-fixed min-w-2xl w-full">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
}

const Table = React.memo(TableComponent) as typeof TableComponent;

export default Table;
