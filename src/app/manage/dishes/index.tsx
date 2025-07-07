'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import {
  formatDateTimeToLocaleString,
  getVietnameseDishStatus,
  handleErrorApi,
  formatCurrency
} from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import AutoPagination from '@/components/common/auto-pagination'
import { DishListResType } from '@/validations/dish.schema'
import EditDish from '@/app/manage/dishes/edit'
import AddDish from '@/app/manage/dishes/add'
import { useDeleteDishMutation, useDishListQuery } from '@/queries/useDish'
import toast from 'react-hot-toast';
import { ArrowDownUp, Pencil, Trash } from 'lucide-react';

type DishItem = DishListResType['data'][0]

const DishTableContext = createContext<{
  setDishIdEdit: (value: number) => void
  dishIdEdit: number | undefined
  dishDelete: DishItem | null
  setDishDelete: (value: DishItem | null) => void
}>({
  setDishIdEdit: (value: number | undefined) => { },
  dishIdEdit: undefined,
  dishDelete: null,
  setDishDelete: (value: DishItem | null) => { }
})

export const columns: ColumnDef<DishItem>[] = [
  {
    header: "ID",
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const index = row.index + 1 + pageIndex * pageSize
      return <div>{index}</div>
    }
  },
  {
    accessorKey: 'image',
    header: 'Ảnh',
    cell: ({ row }) => (
      <div>
        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
          <AvatarImage src={row.getValue('image')} />
          <AvatarFallback className='rounded-none'>
            {row.original.name}
          </AvatarFallback>
        </Avatar>
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Tên
        <ArrowDownUp className='w-[14px] h-[14px] ms-[2px]' />
      </Button>
    ),
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Giá cả
        <ArrowDownUp className='w-[14px] h-[14px] ms-[2px]' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='ps-3'>{formatCurrency(row.getValue('price'))}</div>
    )
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }) => (
      <div>
        {row.getValue('description')}
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusLabel = getVietnameseDishStatus(status)

      let bgColor = ''
      let textColor = ''

      switch (status) {
        case 'Available':
          bgColor = '#ecfdf3'
          textColor = '#039855'
          break
        case 'Unavailable':
          bgColor = '#fef3f2'
          textColor = '#d92d20'
          break
        default:
          bgColor = '#fffaeb'
          textColor = '#b54708'
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
      const { setDishIdEdit, setDishDelete } = useContext(DishTableContext)
      const openEditDish = () => {
        setDishIdEdit(row.original.id)
      }

      const openDeleteDish = () => {
        setDishDelete(row.original)
      }
      return (
        <div className='flex items-center justify-start'>
          <Pencil className='w-8 h-8 p-[7px] text-[#667085] hover:text-gray-900' onClick={openEditDish} />
          <Trash className='w-8 h-8 p-[6px] text-[#667085] hover:text-gray-900' onClick={openDeleteDish} />
        </div>
      )
    }
  }
]

function AlertDialogDeleteDish({
  dishDelete,
  setDishDelete
}: {
  dishDelete: DishItem | null
  setDishDelete: (value: DishItem | null) => void
}) {
  const { mutateAsync } = useDeleteDishMutation()
  const deleteDish = async () => {
    if (dishDelete) {
      try {
        const result = await mutateAsync(dishDelete.id)
        setDishDelete(null)
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
      open={Boolean(dishDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setDishDelete(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn món ăn?</AlertDialogTitle>
          <AlertDialogDescription >
            Món{' '}
            <span className='px-1 mx-1 rounded bg-[#465FFF] text-primary-foreground mb-2'>
              {dishDelete?.name}
            </span>{' '}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDish} className='text-white bg-red-500 hover:bg-red-700'>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const PAGE_SIZE = 6
export default function DishTable() {
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1
  const [dishIdEdit, setDishIdEdit] = useState<number | undefined>()
  const [dishDelete, setDishDelete] = useState<DishItem | null>(null)
  const dishListQuery = useDishListQuery()
  const data = dishListQuery.data?.payload.data ?? []
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
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
    <DishTableContext.Provider
      value={{ dishIdEdit, setDishIdEdit, dishDelete, setDishDelete }}
    >
      <div className='w-full'>
        <EditDish id={dishIdEdit} setId={setDishIdEdit} />
        <AlertDialogDeleteDish
          dishDelete={dishDelete}
          setDishDelete={setDishDelete}
        />
        <div className='flex items-center py-5'>
          <Input
            placeholder='Tìm kiếm tên món...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <div className='flex items-center gap-2 ml-auto'>
            <AddDish />
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
                    Không có món.
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
              pathname='/manage/dishes'
            />
          </div>
        </div>
      </div>
    </DishTableContext.Provider>
  )
}
