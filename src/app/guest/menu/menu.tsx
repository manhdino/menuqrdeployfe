'use client'

import Image from 'next/image'
import { useDishListQuery } from '@/queries/useDish'
import { formatCurrency } from '@/lib/utils'
import { useEffect, useMemo } from 'react'
import { GuestCreateOrdersBodyType } from '@/validations/guest.schema'
import { RiHeartLine } from 'react-icons/ri'
import { useAppStore } from '@/components/common/app-provider'
import { AiOutlinePlus } from 'react-icons/ai'
import Quantity from '../components/quantity'

export default function Menu() {
  const { data } = useDishListQuery()
  const dishes = useMemo(() => data?.payload.data ?? [], [data])

  const setDishes = useAppStore((state) => state.setDishes)
  const orders = useAppStore((state) => state.orders)
  const setOrders = useAppStore((state) => state.setOrders)

  useEffect(() => {
    if (dishes.length > 0) {
      setDishes(dishes)
    }
  }, [dishes])

  const handleQuantityChange = (dishId: number, quantity: number) => {
    let newOrders: GuestCreateOrdersBodyType
    if (quantity === 0) {
      newOrders = orders.filter(order => order.dishId !== dishId)
    } else {
      const index = orders.findIndex(order => order.dishId === dishId)
      if (index === -1) {
        newOrders = [...orders, { dishId, quantity }]
      } else {
        newOrders = [...orders]
        newOrders[index] = { ...newOrders[index], quantity }
      }
    }
    setOrders(newOrders)
  }

  const getRandomBadge = (index: number) => {
    const badges = [null, '/icons/new.svg', '/icons/ot.png']
    return badges[index % badges.length]
  }

  return (
    <div className='relative'>
      <div className="flex items-center justify-center gap-1 mt-4 text-sm font-semibold text-gray-500">
        <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
        <span className='text-base uppercase font-extrabold text-[#fc791a]'>Menu Quán</span>
        <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
      </div>

      <ul className="flex flex-col gap-4 px-5 my-5">
        {dishes.map((item, index) => {
          const badge = getRandomBadge(index)
          const existingOrder = orders.find(order => order.dishId === item.id)

          return (
            <li
              key={item.id}
              className="w-full grid grid-cols-[34%_1fr] gap-3 items-center bg-white rounded-md shadow-lg pl-1 relative"
            >
              <div className="relative py-2 pl-2">
                <Image src={item.image} alt={item.name} width={80} height={80} />
                {badge && (
                  <img
                    src={badge}
                    alt="badge"
                    className={`absolute h-auto left-1 top-2 ${badge.includes('new') ? 'w-7' : 'w-3'}`}
                  />
                )}
              </div>

              <div className="flex flex-col mr-4 gap-[6px] justify-center">
                <span className="text-sm font-semibold text-primary">{item.name}</span>
                <Image src="/icons/rating.svg" alt="rating" width={68} height={13} />
                <span className="text-sm font-semibold text-primary">{formatCurrency(item.price)}</span>
              </div>

              <button className="absolute top-0 right-0 p-3">
                <RiHeartLine className="w-5 h-5 text-gray-400" />
              </button>

              <div className="absolute bottom-0 right-0 flex items-center gap-2 py-3 pr-3 bg-white">
                {existingOrder ? (
                  <Quantity
                    quantity={existingOrder.quantity}
                    onIncrease={() => handleQuantityChange(item.id, existingOrder.quantity + 1)}
                    onDecrease={() => handleQuantityChange(item.id, existingOrder.quantity - 1)}
                  />
                ) : (
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    <div className='bg-[#fb923c] w-[18px] h-[18px] flex items-center justify-center rounded-[2px]'>
                      <AiOutlinePlus className='w-[13px] h-[13px] text-white' />
                    </div>
                  </button>
                )}
              </div>

            </li>
          )
        })}
      </ul>
    </div>
  )
}
