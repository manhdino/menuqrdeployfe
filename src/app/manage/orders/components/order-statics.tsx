import { Fragment, useState } from 'react'
import { Users } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { OrderStatusIcon, cn, getVietnameseOrderStatus } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { OrderStatus, OrderStatusValues } from '@/constants/type'
import { TableListResType } from '@/validations/table.schema'
import { Badge } from '@/components/ui/badge'
import {
  ServingGuestByTableNumber,
  Statics,
  StatusCountObject
} from '@/app/manage/orders'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import OrderGuestDetail from '@/app/manage/orders/components/order-guest-detail'

export default function OrderStatics({
  statics,
  tableList,
  servingGuestByTableNumber
}: {
  statics: Statics
  tableList: TableListResType['data']
  servingGuestByTableNumber: ServingGuestByTableNumber
}) {
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>(0)
  const selectedServingGuest = servingGuestByTableNumber[selectedTableNumber]
  return (
    <Fragment>
      <Dialog
        open={Boolean(selectedTableNumber)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTableNumber(0)
          }
        }}
      >
        <DialogContent className='max-h-full overflow-auto'>
          {selectedServingGuest && (
            <DialogHeader>
              <DialogTitle>
                Khách đang ngồi tại bàn {selectedTableNumber}
              </DialogTitle>
            </DialogHeader>
          )}
          <div>
            {selectedServingGuest &&
              Object.keys(selectedServingGuest).map((guestId, index) => {
                const orders = selectedServingGuest[Number(guestId)]
                return (
                  <div key={guestId}>
                    <OrderGuestDetail
                      guest={orders[0].guest}
                      orders={orders}
                      onPaySuccess={() => {
                        setSelectedTableNumber(0)
                      }}
                    />
                    {index !== Object.keys(selectedServingGuest).length - 1 && (
                      <Separator className='my-5' />
                    )}
                  </div>
                )
              })}
          </div>
        </DialogContent>
      </Dialog>
      <div className='flex flex-wrap items-stretch justify-start gap-4 py-4'>
        {tableList.map((table) => {
          const tableNumber: number = table.number
          const tableStatics: Record<number, StatusCountObject> | undefined =
            statics.table[tableNumber]
          let isEmptyTable = true
          let countObject: StatusCountObject = {
            Pending: 0,
            Processing: 0,
            Delivered: 0,
            Paid: 0,
            Rejected: 0
          }
          const servingGuestCount = Object.values(
            servingGuestByTableNumber[tableNumber] ?? []
          ).length
          if (tableStatics) {
            for (const guestId in tableStatics) {
              const guestStatics = tableStatics[Number(guestId)]
              if (
                [
                  guestStatics.Pending,
                  guestStatics.Processing,
                  guestStatics.Delivered
                ].some((status) => status !== 0 && status !== undefined)
              ) {
                isEmptyTable = false
              }
              countObject = {
                Pending: countObject.Pending + (guestStatics.Pending ?? 0),
                Processing:
                  countObject.Processing + (guestStatics.Processing ?? 0),
                Delivered:
                  countObject.Delivered + (guestStatics.Delivered ?? 0),
                Paid: countObject.Paid + (guestStatics.Paid ?? 0),
                Rejected: countObject.Rejected + (guestStatics.Rejected ?? 0)
              }
            }
          }
          return (
            <div
              key={tableNumber}
              className={cn(
                'text-sm flex items-stretch gap-2 border p-2 rounded-md',
                {
                  'bg-secondary': !isEmptyTable,
                  'border-transparent': !isEmptyTable
                }
              )}
              onClick={() => {
                if (!isEmptyTable) setSelectedTableNumber(tableNumber)
              }}
            >
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='text-lg font-semibold text-center'>
                  {tableNumber}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className='flex items-center gap-2'>
                        <Users className='w-4 h-4' />
                        <span>{servingGuestCount}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Đang phục vụ: {servingGuestCount} khách
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Separator
                orientation='vertical'
                className={cn('flex-shrink-0 flex-grow h-auto', {
                  'bg-muted-foreground': !isEmptyTable
                })}
              />
              {isEmptyTable && (
                <div className='flex items-center justify-between text-sm'>
                  Ready
                </div>
              )}
              {!isEmptyTable && (
                <div className='flex flex-col gap-2'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className='flex items-center gap-2'>
                          <OrderStatusIcon.Pending className='w-4 h-4' />
                          <span>{countObject[OrderStatus.Pending] ?? 0}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getVietnameseOrderStatus(OrderStatus.Pending)}:{' '}
                        {countObject[OrderStatus.Pending] ?? 0} đơn
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger>
                        <div className='flex items-center gap-2'>
                          <OrderStatusIcon.Processing className='w-4 h-4' />
                          <span>
                            {countObject[OrderStatus.Processing] ?? 0}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getVietnameseOrderStatus(OrderStatus.Processing)}:{' '}
                        {countObject[OrderStatus.Processing] ?? 0} đơn
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className='flex items-center gap-2'>
                          <OrderStatusIcon.Delivered className='w-4 h-4' />
                          <span>{countObject[OrderStatus.Delivered] ?? 0}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getVietnameseOrderStatus(OrderStatus.Delivered)}:{' '}
                        {countObject[OrderStatus.Delivered] ?? 0} đơn
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className='flex flex-wrap items-end justify-start gap-4 py-4'>
        {OrderStatusValues.map((status) => (
          <Badge variant='secondary' key={status} className='py-2 text-sm'>
            {getVietnameseOrderStatus(status)}: {statics.status[status] ?? 0}
          </Badge>
        ))}
      </div>
    </Fragment>
  )
}
