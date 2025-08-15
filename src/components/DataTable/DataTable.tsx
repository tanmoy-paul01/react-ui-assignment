import React, { useState } from "react";
import classNames from "classnames";

export interface Column<T> {
  key: keyof T;
  header: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRowSelection = (row: T) => {
    let updatedSelection;
    if (selectedRows.includes(row)) {
      updatedSelection = selectedRows.filter((r) => r !== row);
    } else {
      updatedSelection = [...selectedRows, row];
    }
    setSelectedRows(updatedSelection);
    onRowSelect && onRowSelect(updatedSelection);
  };

  return (
    <div className="w-full overflow-x-auto border rounded-lg">
      {loading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : data.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No data available</div>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {selectable && <th className="p-2"></th>}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => handleSort(col.key)}
                  className="p-2 text-left cursor-pointer select-none"
                >
                  {col.header}
                  {sortConfig?.key === col.key && (
                    <span className="ml-1 text-xs">
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr
                key={idx}
                className={classNames("border-b hover:bg-gray-50", {
                  "bg-blue-50": selectedRows.includes(row)
                })}
              >
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRowSelection(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-2">
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
