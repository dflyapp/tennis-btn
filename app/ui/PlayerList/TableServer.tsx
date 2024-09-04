import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  FilterFnOption,
  FilterFn,
} from '@tanstack/react-table'

import { fetchData } from './fetchData'
import { SelectPlayerFemale } from 'db/schema'
import CreatePlayer from './CreatePlayer'
import EditPlayer from './EditPlayer'
import useDebounce from 'hooks/useDebounce'

const queryClient = new QueryClient()

function TableServer() {
  const rerender = React.useReducer(() => ({}), {})[1]
  const [globalSearch, setGlobalSearch] = useState<string>('')
  const debouncedSearchValue = useDebounce(globalSearch, 500)

  const columns = React.useMemo<ColumnDef<SelectPlayerFemale>[]>(
    () => [
      {
        header: () => <span>ID</span>,
        accessorFn: (row) => row.id,
        accessorKey: 'id',
      },
      {
        header: () => <span>Nick Name</span>,
        accessorFn: (row) => row.name,
        accessorKey: 'name',
      },
      {
        header: () => <span>Max</span>,
        accessorFn: (row) => row.max,
        accessorKey: 'max',
      },
      {
        header: () => <span>Min</span>,
        accessorFn: (row) => row.min,
        accessorKey: 'min',
      },
      {
        header: () => <span></span>,
        cell: ({ cell }) => {
          return (
            <EditPlayer
              model="players_female"
              player={cell.row.original}
              updateCache={() => {
                queryClient.invalidateQueries({
                  queryKey: ['data', pagination],
                })
              }}
            />
          )
        },
        accessorKey: 'action',
      },
    ],
    []
  )

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const dataQuery = useQuery({
    queryKey: ['data', pagination, debouncedSearchValue],
    queryFn: () => fetchData(pagination, debouncedSearchValue),
    enabled: true,
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })

  const defaultData = React.useMemo(() => [], [])

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    rowCount: dataQuery.data?.rowCount, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination

    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
    filterFns: null as unknown as Record<'fuzzy', FilterFn<any>>,
  })

  return (
    <div className="p-2">
      <div className="flex items-center justify-between gap-x-4">
        <input
          type="text"
          placeholder="Tìm tên, điểm"
          className="input input-bordered w-full my-4"
          onChange={(e) => {
            setGlobalSearch(e.target.value)
          }}
          value={globalSearch}
        />
        <CreatePlayer
          model="players_female"
          invalidateQuery={() => {
            queryClient.invalidateQueries({ queryKey: ['data', pagination] })
          }}
        />
      </div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {dataQuery.isFetching ? 'Loading...' : null}
      </div>
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {dataQuery.data?.rowCount.toLocaleString()} Rows
      </div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </div>
  )
}

export default function TanksackTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <TableServer />
    </QueryClientProvider>
  )
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input
      className="input input-rounded"
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
