import React, { lazy, useEffect } from 'react'

import Ball from 'assets/ball.svg'
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'

import Image from 'next/image'
import { SelectPlayerFemale } from 'db/schema'
import EditPlayer from './EditPlayer'
import { ModelType } from '.'

import ViewPlayer from './ViewPlayer'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank,
  })
  return itemRank.passed
}

interface Props {
  dataSet?: SelectPlayerFemale[]
  updateCache?: () => void
  model: ModelType
}

export default function TableClient({ dataSet, updateCache, model }: Props) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const columns = React.useMemo<ColumnDef<SelectPlayerFemale>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <span>STT</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'nickName',
        cell: (info) => (
          <div className="flex items-center">
            <Image
              alt="players"
              className="rounded-full hidden md:block"
              width={40}
              height={40}
              key={info.cell.row.original.id}
              src={Ball?.src}
            />
            <div className="ml-0 md:ml-3">
              {/* <strong>{info.getValue()}</strong> */}
              <ViewPlayer
                model={model}
                refId={info.cell.row.original.id}
                playerName={info.cell.row.original.name}
              >
                <p className="text-xs">{info.cell.row.original.name}</p>
              </ViewPlayer>
              <p className="text-xs">{info.cell.row.original.phone}</p>
            </div>
          </div>
        ),
        header: () => <span>Nick Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'max-min',
        cell: (info) => (
          <div>
            {info.row.original.max}-{info.row.original.min}
          </div>
        ),
        header: () => <span>Max-Min</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'history',
        cell: (info) => (
          <div className="flex items-center justify-center">
            <ViewPlayer
              model={model}
              refId={info.cell.row.original.id}
              playerName={info.cell.row.original.name}
            >
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </ViewPlayer>
          </div>
        ),
        header: () => <span>Lịch sử</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'edit',
        cell: (info) => (
          <div>
            <EditPlayer
              key={info.row.original.id}
              player={info.row.original}
              updateCache={() => {
                updateCache?.()
              }}
              model={model}
            />
          </div>
        ),
        header: () => <span>Sửa</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  )

  const [data, setData] = React.useState<SelectPlayerFemale[]>([])
  useEffect(() => {
    setData(dataSet || [])
  }, [dataSet])

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
      // sorting: [{ id: "max", desc: true }],
      pagination: {
        pageSize: 10,
      },
    },
  })

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id])

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex mx-auto my-4 px-2">
        <input
          id="search-input"
          placeholder="Tìm tên, điểm"
          type="text"
          className="input input-bordered input-primary w-full mx-2 md:mx-0"
          onChange={(event) => {
            if (event.target.value === '') {
              setData(dataSet || [])
            } else if (Number(event.target.value) > 0) {
              const newDataMax = dataSet?.filter(
                (e) =>
                  e.max !== null &&
                  e.max
                    .toString()
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
              )
              const newDataMin = dataSet?.filter(
                (e) =>
                  e.min !== null &&
                  e.min
                    .toString()
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
              )
              setData([
                ...(newDataMax as SelectPlayerFemale[]),
                ...(newDataMin as SelectPlayerFemale[]),
              ])
            } else {
              const newData = dataSet?.filter(
                (e) =>
                  e.name !== null &&
                  e.name
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
              )
              setData(newData as SelectPlayerFemale[])
            }
          }}
        />
      </div>

      <div className="h-2" />
      <div className="overflow-x-scroll">
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
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
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
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row, index) => {
              return (
                <tr key={row.id} className={index % 2 ? 'bg-gray-50' : ''}>
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
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="h-12" />
      <div className="flex flex-col items-center gap-2">
        <div>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1 px-2 mx-2"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex items-center gap-1">
            <div>Trang</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} /{' '}
              {table.getPageCount()}
            </strong>
            <span className="flex items-center gap-1 ml-2">
              | Đến trang:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="input input-bordered w-16 ml-2 mr-2 text-center"
              />
            </span>
          </div>
        </div>
        <select
          className="select select-bordered"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Xem {pageSize} vđv một trang
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
