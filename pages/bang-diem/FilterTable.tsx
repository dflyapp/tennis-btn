import React from "react";

import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

import { makeData, Person } from "utils/makeData";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

interface Props {
  dataSet?: Person[];
}

export default function FilterTable({ dataSet }: Props) {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: "nickName",
        cell: (info) => (
          <div className="flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                d="M9.99988 20C15.5227 20 19.9999 15.5228 19.9999 10C19.9999 4.47715 15.5227 0 9.99988 0C4.47703 0 -0.00012207 4.47715 -0.00012207 10C-0.00012207 15.5228 4.47703 20 9.99988 20Z"
                fill="#77B255"
              />
              <path
                d="M14.4443 10C14.4443 13.36 15.9954 15.6783 17.6677 16.4145C19.1221 14.6778 19.9999 12.4422 19.9999 10C19.9999 7.55779 19.1221 5.32224 17.6677 3.58557C15.9954 4.32168 14.4443 6.64002 14.4443 10Z"
                fill="#A6D388"
              />
              <path
                d="M14.9997 10C14.9997 6.64 15.9952 4.32167 17.6674 3.58556C17.4202 3.29056 17.153 3.01444 16.8741 2.75C15.2252 3.66944 13.8885 5.87667 13.8885 10C13.8885 14.1228 15.2252 16.3306 16.8741 17.25C17.153 16.9856 17.4208 16.7094 17.6674 16.4144C15.9952 15.6783 14.9997 13.36 14.9997 10Z"
                fill="white"
              />
              <path
                d="M5.55543 10C5.55543 6.64002 4.00432 4.32224 2.3321 3.58557C0.877656 5.32224 -0.00012207 7.55779 -0.00012207 10C-0.00012207 12.4422 0.877656 14.6778 2.3321 16.4145C4.00432 15.6778 5.55543 13.36 5.55543 10Z"
                fill="#A6D388"
              />
              <path
                d="M2.33215 3.58552C4.00438 4.32219 4.99993 6.63996 4.99993 9.99996C4.99993 13.36 4.00438 15.6777 2.33215 16.4144C2.57938 16.7094 2.8466 16.985 3.12549 17.25C4.77382 16.3305 6.11104 14.1227 6.11104 9.99996C6.11104 5.87719 4.77438 3.66941 3.12549 2.75052C2.8466 3.01496 2.57882 3.29052 2.33215 3.58552Z"
                fill="white"
              />
            </svg>

            <strong>{info.getValue()}</strong>
          </div>
        ),
        header: () => <span>Nick Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "max",
        header: () => <span>Max</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "min",
        header: () => <span>Min</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "mobile",
        header: () => <span>SĐT</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const result = dataSet ? [...dataSet] : makeData(1000);
  const [data, setData] = React.useState<Person[]>(() => result);
  const refreshData = () => setData((old) => makeData(50000));
  const [searchText, setSearchText] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    initialState: {
      sorting: [{ id: "max", desc: true }],
      pagination: {
        pageSize: 30,
      },
    },
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="p-2">
      {/* <div className="flex justify-center my-8">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder=""
        />
      </div> */}
      <div className="flex mx-auto my-4">
        <input
          placeholder="nhập tên cần tìm"
          type="text"
          className="border px-2 w-full"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <button
          className="shadow-md bg-white text-primary border border-gray-200 rounded-tr-md rounded-br-md p-4 w-48"
          onClick={() => {
            if (searchText === "") {
              return;
            }
            const newData = result.filter(
              (e) =>
                e.nickName !== null &&
                e.nickName.toLowerCase().includes(searchText.toLowerCase())
            );
            setData(newData);
            console.log(searchText);
            setSearchText("");
          }}
        >
          Tìm Tên
        </button>
      </div>
      <div className="h-2" />
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row, index) => {
            return (
              <tr key={row.id} className={index % 2 ? "bg-gray-50" : ""}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-12" />
      <div className="flex flex-col items-center gap-2">
        <div>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>

        <div className="flex mt-4">
          <span className="flex items-center gap-1">
            <div>Trang</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} của{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 ml-2">
            | Đến:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Xem {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search (${column.getFacetedUniqueValues().size})`}
        className="w-24 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
