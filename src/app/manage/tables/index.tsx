'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { formatDateTimeToLocaleString, getVietnameseTableStatus, handleErrorApi } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import AutoPagination from '@/components/common/auto-pagination'
import { TableListResType } from '@/validations/table.schema'
import EditTable from '@/app/manage/tables/edit'
import AddTable from '@/app/manage/tables/add'
import { useDeleteTableMutation, useTableListQuery } from '@/queries/useTable'
import QRCodeTable from '@/components/common/qrcode-table'
import toast from 'react-hot-toast';
import { Pencil, Trash } from 'lucide-react'

type TableItem = TableListResType['data'][0]

const TableTableContext = createContext<{
  setTableIdEdit: (value: number) => void
  tableIdEdit: number | undefined
  tableDelete: TableItem | null
  setTableDelete: (value: TableItem | null) => void
}>({
  setTableIdEdit: (value: number | undefined) => { },
  tableIdEdit: undefined,
  tableDelete: null,
  setTableDelete: (value: TableItem | null) => { }
})

export const columns: ColumnDef<TableItem>[] = [
  {
    accessorKey: 'number',
    header: 'Số bàn',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('number')}</div>
    ),
    filterFn: (rows, columnId, filterValue) => {
      if (!filterValue) return true
      return String(filterValue) === String(rows.getValue('number'))
    }
  },

  {
    accessorKey: 'token',
    header: () => <div className="w-2/5 text-center">QR Code</div>,
    cell: ({ row }) => (
      <div>
        <QRCodeTable
          token={row.getValue('token')}
          tableNumber={row.getValue('number')}
        />
      </div>
    )
  },
  {
    accessorKey: 'capacity',
    header: 'Sức chứa',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('capacity')}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusLabel = getVietnameseTableStatus(status)

      let bgColor = ''
      let textColor = ''

      switch (status) {
        case 'Available':
          bgColor = '#ecfdf3'
          textColor = '#039855'
          break
        case 'Reserved':
          bgColor = '#fffaeb'
          textColor = '#b54708'

          break
        default:
          bgColor = '#fef3f2'
          textColor = '#d92d20'
          break
      }

      return (
        <div className='flex items-center justify-start'>
          <span
            className='rounded-[5px] px-3 py-1 text-sm font-medium'
            style={{
              backgroundColor: bgColor,
              color: textColor
            }}
          >
            {statusLabel}
          </span>
        </div>
      )
    }
  },


  {
    accessorKey: 'createdAt',
    header: () => <div>Ngày tạo</div>,
    cell: ({ row }) => (
      <div className='space-y-2 text-sm'>
        <div className='flex items-center space-x-4'>
          {formatDateTimeToLocaleString(row.getValue('createdAt'))}
        </div>
      </div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setTableIdEdit, setTableDelete } = useContext(TableTableContext)
      const openEditTable = () => {
        setTableIdEdit(row.original.number)
      }

      const openDeleteTable = () => {
        setTableDelete(row.original)
      }
      return (
        <div className='flex items-center justify-start'>
          <Pencil className='w-8 h-8 p-[7px] text-[#667085] hover:text-gray-900' onClick={openEditTable} />
          <Trash className='w-8 h-8 p-[6px] text-[#667085] hover:text-gray-900' onClick={openDeleteTable} />
        </div>
      )
    }
  }
]

function AlertDialogDeleteTable({
  tableDelete,
  setTableDelete
}: {
  tableDelete: TableItem | null
  setTableDelete: (value: TableItem | null) => void
}) {
  const { mutateAsync } = useDeleteTableMutation()
  const deleteTable = async () => {
    if (tableDelete) {
      try {
        const result = await mutateAsync(tableDelete.number)
        setTableDelete(null)
        toast.success(
          result.payload.message
        )
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
  }
  return (
    <AlertDialog
      open={Boolean(tableDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setTableDelete(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa bàn ăn?</AlertDialogTitle>
          <AlertDialogDescription>
            Bàn{' '}
            <span className='px-1 rounded bg-foreground text-primary-foreground'>
              {tableDelete?.number}
            </span>{' '}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTable}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
// Số lượng item trên 1 trang
const PAGE_SIZE = 10
export default function TableTable() {
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1
  const [tableIdEdit, setTableIdEdit] = useState<number | undefined>()
  const [tableDelete, setTableDelete] = useState<TableItem | null>(null)
  const tableListQuery = useTableListQuery()
  const data = tableListQuery.data?.payload.data ?? []
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  })

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [table, pageIndex])

  return (
    <TableTableContext.Provider
      value={{ tableIdEdit, setTableIdEdit, tableDelete, setTableDelete }}
    >
      <div className='w-full'>
        <EditTable id={tableIdEdit} setId={setTableIdEdit} />
        <AlertDialogDeleteTable
          tableDelete={tableDelete}
          setTableDelete={setTableDelete}
        />
        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc số bàn...'
            value={
              (table.getColumn('number')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) => {
              table.getColumn('number')?.setFilterValue(event.target.value)
            }}
            className='max-w-sm'
          />
          <div className='flex items-center gap-2 ml-auto'>
            <AddTable />
          </div>
        </div>
        <div className='border rounded-md'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end py-4 space-x-2'>
          <div className='flex-1 py-4 text-xs text-muted-foreground '>
            Hiển thị{' '}
            <strong>{table.getPaginationRowModel().rows.length}</strong> trong{' '}
            <strong>{data.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname='/manage/tables'
            />
          </div>
        </div>
      </div>
    </TableTableContext.Provider>
  )
}
