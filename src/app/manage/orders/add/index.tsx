'use client'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GuestCreateOrdersBodyType,
  GuestLoginBody,
  GuestLoginBodyType
} from '@/validations/guest.schema'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { TablesDialog } from '@/app/manage/orders/components/tables-dialog'
import { GetListGuestsResType } from '@/validations/account.schema'
import { Switch } from '@/components/ui/switch'
import GuestsDialog from '@/app/manage/orders/components/guests-dialog'
import { CreateOrdersBodyType } from '@/validations/order.schema'
import Image from 'next/image'
import { cn, formatCurrency, handleErrorApi } from '@/lib/utils'
import { DishStatus } from '@/constants/type'
import { useDishListQuery } from '@/queries/useDish'
import { useCreateOrderMutation } from '@/queries/useOrder'
import { useCreateGuestMutation } from '@/queries/useAccount'
import toast from 'react-hot-toast';
import Quantity from '../../components/quantity'

export default function AddOrder() {
  const [open, setOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<
    GetListGuestsResType['data'][0] | null
  >(null)
  const [isNewGuest, setIsNewGuest] = useState(true)
  const [orders, setOrders] = useState<CreateOrdersBodyType['orders']>([])
  const { data } = useDishListQuery()
  const dishes = useMemo(() => data?.payload.data ?? [], [data])

  const totalPrice = useMemo(() => {
    return dishes.reduce((result, dish) => {
      const order = orders.find((order) => order.dishId === dish.id)
      if (!order) return result
      return result + order.quantity * dish.price
    }, 0)
  }, [dishes, orders])
  const createOrderMutation = useCreateOrderMutation()
  const createGuestMutation = useCreateGuestMutation()

  const form = useForm<GuestLoginBodyType>({
    resolver: zodResolver(GuestLoginBody),
    defaultValues: {
      name: '',
      tableNumber: 0
    }
  })
  const name = form.watch('name')
  const tableNumber = form.watch('tableNumber')

  const handleQuantityChange = (dishId: number, quantity: number) => {
    setOrders((prevOrders) => {
      if (quantity === 0) {
        return prevOrders.filter((order) => order.dishId !== dishId)
      }
      const index = prevOrders.findIndex((order) => order.dishId === dishId)
      if (index === -1) {
        return [...prevOrders, { dishId, quantity }]
      }
      const newOrders = [...prevOrders]
      newOrders[index] = { ...newOrders[index], quantity }
      return newOrders
    })
  }

  const handleOrder = async () => {
    try {
      let guestId = selectedGuest?.id
      if (isNewGuest) {
        const guestRes = await createGuestMutation.mutateAsync({
          name,
          tableNumber
        })
        guestId = guestRes.payload.data.id
      }
      if (!guestId) {
        toast.error(
          'Hãy chọn một khách hàng'
        )
        return
      }
      await createOrderMutation.mutateAsync({
        guestId,
        orders
      })
      reset()
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  const reset = () => {
    form.reset()
    setSelectedGuest(null)
    setIsNewGuest(true)
    setOrders([])
    setOpen(false)
  }

  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          reset()
        }
        setOpen(value)
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 bg-[#465FFF] hover:bg-blue-700 gap-1'>
          <PlusCircle className='w-4 h-6' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Thêm đơn mới
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Tạo đơn hàng</DialogTitle>
        </DialogHeader>
        <div className='grid items-center grid-cols-4 gap-4 justify-items-start'>
          <Label htmlFor='isNewGuest'>Khách hàng mới</Label>
          <div className='flex items-center col-span-3'>
            <Switch
              id='isNewGuest'
              checked={isNewGuest}
              onCheckedChange={setIsNewGuest}
              className="data-[state=checked]:bg-[#465FFF]"
            />
          </div>
        </div>
        {isNewGuest && (
          <Form {...form}>
            <form
              noValidate
              className='grid items-start gap-4 auto-rows-max md:gap-8'
              id='add-employee-form'
            >
              <div className='grid gap-4 py-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid items-center grid-cols-4 gap-4 justify-items-start'>
                        <Label htmlFor='name'>Tên khách hàng</Label>
                        <div className='w-full col-span-3 space-y-2'>
                          <Input id='name' className='w-full' {...field} />
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tableNumber'
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid items-center grid-cols-4 gap-4 justify-items-start'>
                        <Label htmlFor='tableNumber'>Chọn bàn</Label>
                        <div className='w-full col-span-3 space-y-2'>
                          <div className='flex items-center gap-4'>
                            <div>{field.value}</div>
                            <TablesDialog
                              onChoose={(table) => {
                                field.onChange(table.number)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        )}
        {!isNewGuest && (
          <GuestsDialog
            onChoose={(guest) => {
              setSelectedGuest(guest)
            }}
          />
        )}
        {!isNewGuest && selectedGuest && (
          <div className='grid items-center grid-cols-4 gap-4 justify-items-start'>
            <Label htmlFor='selectedGuest'>Khách đã chọn</Label>
            <div className='flex items-center w-full col-span-3 gap-4'>
              <div>
                {selectedGuest.name} (#{selectedGuest.id})
              </div>
              <div>Bàn: {selectedGuest.tableNumber}</div>
            </div>
          </div>
        )}
        <div className="flex flex-col h-[50vh] px-3 py-5">
          <div className="flex-1 pr-1 space-y-3 overflow-y-auto">
            {dishes
              .filter((dish) => dish.status !== DishStatus.Hidden)
              .map((dish) => {
                return (
                  <div
                    key={dish.id}
                    className={cn(
                      'flex gap-4 w-full flex-wrap items-center border-b py-3',
                      {
                        'pointer-events-none opacity-60': dish.status === DishStatus.Unavailable
                      }
                    )}
                  >
                    <div className='relative flex-shrink-0'>
                      {dish.status === DishStatus.Unavailable && (
                        <span className='absolute inset-0 z-10 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded-md'>
                          Hết hàng
                        </span>
                      )}
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        height={100}
                        width={100}
                        quality={100}
                        className='object-cover w-[80px] h-[80px] rounded-md'
                      />
                    </div>

                    <div className='w-[60%] space-y-1'>
                      <h3 className='text-sm font-medium truncate'>{dish.name}</h3>
                      <p className='text-xs text-muted-foreground line-clamp-2'>{dish.description}</p>
                      <p className='text-xs font-semibold text-black'>{formatCurrency(dish.price)}</p>
                    </div>

                    <div className='flex items-center justify-center flex-shrink-0 ml-auto '>
                      <Quantity
                        onChange={(value: any) => handleQuantityChange(dish.id, value)}
                        value={
                          orders.find((order) => order.dishId === dish.id)
                            ?.quantity ?? 0
                        }
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <DialogFooter>
          <Button
            className={`justify-between w-full ${orders.length > 0 && 'bg-[#465FFF] hover:bg-blue-600'}`}
            onClick={handleOrder}
            disabled={orders.length === 0}
          >
            <span>Đặt hàng · {orders.length} món</span>
            <span>{formatCurrency(totalPrice)}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
