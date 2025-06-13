import React, { JSX } from 'react';
import type { TableColumn } from '../../types/Table';

type TableBodyProps<TData extends { id: string | number }> = {
  columns: TableColumn<TData>[];
  data: TData[];
};

function TableBodyInner<TData extends { id: string | number }>({
  columns,
  data,
}: TableBodyProps<TData>) {
  return (
    <tbody className="text-slate-600">
      {data.map(item => (
        <tr key={item.id}>
          {columns.map((column, index) => {
            const isFirst = index === 0;
            const borderClass = isFirst ? 'border-t' : 'border-t border-l';

            return (
              <td
                key={column.name}
                className={`table-cell ${borderClass} ${column.className}`}
              >
                {column.content(item)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

const TableBody = React.memo(TableBodyInner) as <
  TData extends { id: string | number },
>(
  props: TableBodyProps<TData>
) => JSX.Element;

export default TableBody;
