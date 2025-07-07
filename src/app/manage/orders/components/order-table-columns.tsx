'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { GetOrdersResType } from '@/validations/order.schema'
import { useContext } from 'react'
import {
  formatCurrency,
  formatDateTimeToLocaleString,
  getVietnameseOrderStatus,
  simpleMatchText
} from '@/lib/utils'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { OrderStatus, OrderStatusValues } from '@/constants/type'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { OrderTableContext } from '@/app/manage/orders'
import OrderGuestDetail from '@/app/manage/orders/components/order-guest-detail'
import { Pencil, Trash } from 'lucide-react'

type OrderItem = GetOrdersResType['data'][0]
const orderTableColumns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: 'tableNumber',
    header: 'Bàn',
    cell: ({ row }) => <div>{row.getValue('tableNumber')}</div>,
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === undefined) return true
      return simpleMatchText(
        String(row.getValue(columnId)),
        String(filterValue)
      )
    }
  },
  {
    id: 'guestName',
    header: 'Khách hàng',
    cell: function Cell({ row }) {
      const { orderObjectByGuestId } = useContext(OrderTableContext)
      const guest = row.original.guest
      return (
        <div>
          {!guest && (
            <div>
              <span>Đã bị xóa</span>
            </div>
          )}
          {guest && (
            <Popover>
              <PopoverTrigger>
                <div>
                  <span>{guest.name}</span>
                  <span className='font-semibold'>(#{guest.id})</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className='w-[320px] sm:w-[440px]'>
                <OrderGuestDetail
                  guest={guest}
                  orders={orderObjectByGuestId[guest.id]}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      )
    },
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === undefined) return true
      return simpleMatchText(
        row.original.guest?.name ?? 'Đã bị xóa',
        String(filterValue)
      )
    }
  },
  {
    id: 'dishName',
    header: 'Món ăn',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Image
              src={row.original.dishSnapshot.image}
              alt={row.original.dishSnapshot.name}
              width={50}
              height={50}
              className='rounded-md object-cover w-[50px] h-[50px] cursor-pointer'
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className='flex flex-wrap gap-2'>
              <Image
                src={row.original.dishSnapshot.image}
                alt={row.original.dishSnapshot.name}
                width={100}
                height={100}
                className='rounded-md object-cover w-[100px] h-[100px]'
              />
              <div className='space-y-1 text-sm'>
                <h3 className='font-semibold'>
                  {row.original.dishSnapshot.name}
                </h3>
                <div className='italic'>
                  {formatCurrency(row.original.dishSnapshot.price)}
                </div>
                <div>{row.original.dishSnapshot.description}</div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <span>{row.original.dishSnapshot.name}</span>
            <Badge className='px-1' variant={'secondary'}>
              x{row.original.quantity}
            </Badge>
          </div>
          <span className='italic'>
            {formatCurrency(
              row.original.dishSnapshot.price * row.original.quantity
            )}
          </span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: function Cell({ row }) {
      const { changeStatus } = useContext(OrderTableContext)
      const changeOrderStatus = async (
        status: (typeof OrderStatusValues)[number]
      ) => {
        changeStatus({
          orderId: row.original.id,
          dishId: row.original.dishSnapshot.dishId!,
          status: status,
          quantity: row.original.quantity
        })
      }
      return (
        <Select
          onValueChange={(value: (typeof OrderStatusValues)[number]) => {
            changeOrderStatus(value)
          }}
          defaultValue={OrderStatus.Pending}
          value={row.getValue('status')}
        >
          <SelectTrigger className='w-[140px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {OrderStatusValues.map((status) => (
              <SelectItem key={status} value={status}>
                {getVietnameseOrderStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }
  },
  {
    id: 'orderHandlerName',
    header: 'Người xử lý',
    cell: ({ row }) => <div>{row.original.orderHandler?.name ?? ''}</div>
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
    accessorKey: 'updatedAt',
    header: () => <div>Ngày cập nhật</div>,
    cell: ({ row }) => (
      <div className='space-y-2 text-sm'>
        <div className='flex items-center space-x-4'>
          {formatDateTimeToLocaleString(
            row.original.updatedAt as unknown as string
          )}
        </div>
      </div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setOrderIdEdit } = useContext(OrderTableContext)
      const openEditOrder = () => {
        setOrderIdEdit(row.original.id)
      }

      return (
        <div className='flex items-center justify-start'>
          <Pencil className='w-8 h-8 p-[7px] text-[#667085] hover:text-gray-900' onClick={openEditOrder} />
        </div>
      )
    }
  }
]

export default orderTableColumns
