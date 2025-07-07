'use client'

import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '@/constants/type'
import { formatCurrency, getVietnameseOrderStatus } from '@/lib/utils'
import { useGuestGetOrderListQuery } from '@/queries/useGuest'
import Image from 'next/image'
import { useMemo } from 'react'

export default function Orders() {
  const { data } = useGuestGetOrderListQuery()
  const orders = useMemo(() => data?.payload.data ?? [], [data])
  const { waitingForPaying, paid } = useMemo(() => {
    return orders.reduce(
      (result, order) => {
        if (
          order.status === OrderStatus.Delivered ||
          order.status === OrderStatus.Processing ||
          order.status === OrderStatus.Pending
        ) {
          return {
            ...result,
            waitingForPaying: {
              price:
                result.waitingForPaying.price +
                order.dishSnapshot.price * order.quantity,
              quantity: result.waitingForPaying.quantity + order.quantity
            }
          }
        }
        if (order.status === OrderStatus.Paid) {
          return {
            ...result,
            paid: {
              price:
                result.paid.price + order.dishSnapshot.price * order.quantity,
              quantity: result.paid.quantity + order.quantity
            }
          }
        }
        return result
      },
      {
        waitingForPaying: {
          price: 0,
          quantity: 0
        },
        paid: {
          price: 0,
          quantity: 0
        }
      }
    )
  }, [orders])
  return (
    <>
      <div className="flex items-center justify-center gap-1 mb-4 text-sm font-semibold text-gray-500">
        <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
        <span className='text-base uppercase font-extrabold text-[#fc791a]'>Đơn đặt món</span>
        <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
      </div>
      {orders.map((order, index) => (
        <div key={order.id} className='flex items-center justify-between gap-4 bg-white mx-3 mt-2 rounded-[10px] shadow-sm ps-2 pr-4 py-[10px]'>
          <div className='text-xs font-semibold'>{index + 1}</div>
          <div className='relative flex-shrink-0 mr-2'>
            <Image
              src={order.dishSnapshot.image}
              alt={order.dishSnapshot.name}
              height={100}
              width={100}
              quality={100}
              className='object-cover w-[80px] h-[80px] rounded-full'
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <h3 className='mt-2 text-sm font-bold text-black"'>{order.dishSnapshot.name}</h3>
            <Image src="/icons/rating.svg" alt="rating" width={68} height={13} />

            <div className='flex items-center gap-1 text-xs font-semibold'>
              <span className="text-xs font-medium">{formatCurrency(order.dishSnapshot.price)}</span> x{' '}
              <Badge className='px-1 py-0 text-[10px] bg-[#fc791a]'>{order.quantity}</Badge>
            </div>
          </div>
          <div className='flex items-center justify-center flex-shrink-0 ml-auto shadow-sm'>
            <Badge variant={'outline'}>{getVietnameseOrderStatus(order.status)}</Badge>
          </div>
        </div>
      ))}
      <div className="rounded-[10px] p-5 border border-orange-400 m-3 bg-white">
        <div className="flex justify-between mb-2.5">
          <span className="text-sm font-medium ">Tổng tiền:</span>
          <span className="text-sm">{formatCurrency(paid.price + waitingForPaying.price)}</span>
        </div>
        <div className="flex justify-between mb-2.5">
          <span className="text-sm text-[var(--text-color)]">Đã thanh toán ({paid.quantity} món):</span>
          <span className="text-sm">{formatCurrency(paid.price)}</span>
        </div>
        <div className="flex justify-between pb-[14px] border-b border-[#dbe9f5] mb-5">
          <span className="text-sm">Còn lại</span>
          <span className="text-sm">{formatCurrency(waitingForPaying.price)}</span>
        </div>
        <div className="flex justify-between">
          <h4 className="text-base font-semibold">Tổng thanh toán</h4>
          <h4 className="text-base font-semibold">{formatCurrency(waitingForPaying.price)}</h4>
        </div>
      </div>
    </>
  )
}
