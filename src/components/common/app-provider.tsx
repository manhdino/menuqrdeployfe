'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RefreshToken from '@/components/common/refresh-token'
import {
  useEffect,
  useRef,
} from 'react'
import {
  decodeToken,
  generateSocketInstace,
  getAccessTokenFromLocalStorage,
  getVietnameseOrderStatus,
  removeTokensFromLocalStorage
} from '@/lib/utils'
import { RoleType } from '@/types/jwt.types'
import type { Socket } from 'socket.io-client'
import ListenLogoutSocket from '@/components/common/listen-logout-socket'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GuestCreateOrdersBodyType } from '@/validations/guest.schema'
import { PayGuestOrdersResType, UpdateOrderResType } from '@/validations/order.schema'
import toast from 'react-hot-toast'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

type NotificationItem = {
  id: string
  name: string
  status: string
  message: string
  timestamp: number
}

type AppStoreType = {
  isAuth: boolean
  role: RoleType | undefined
  totalPriceCart: number
  guestName: string | undefined
  notifications: NotificationItem[]
  addNotification: (message: string, name: string, status: string) => void
  clearNotifications: () => void
  setGuestName: (guestName: string | undefined) => void
  setTotalPriceCart: (price: number) => void
  increaseTotalPriceCart: (amount: number) => void
  decreaseTotalPriceCart: (amount: number) => void
  resetTotalPriceCart: () => void
  orders: GuestCreateOrdersBodyType
  setOrders: (orders: GuestCreateOrdersBodyType) => void
  setRole: (role?: RoleType | undefined) => void
  socket: Socket | undefined
  setSocket: (socket?: Socket | undefined) => void
  disconnectSocket: () => void
  dishes: any
  setDishes: (dishes: any[]) => void
}




export const useAppStore = create<AppStoreType>()(
  persist(
    (set, get) => ({
      isAuth: false,
      role: undefined,
      dishes: [],
      notifications: [],
      orders: [],
      guestName: undefined,
      socket: undefined,
      totalPriceCart: 0,
      setRole: (role?: RoleType | undefined) => {
        set({ role, isAuth: Boolean(role) })
        if (!role) {
          removeTokensFromLocalStorage()
        }
      },
      setDishes: (dishes) => set({ dishes }),
      setGuestName: (guestName) => set({ guestName }),
      setOrders: (orders) => {
        set({ orders })
        const dishes = get().dishes
        const totalPrice = orders.reduce((res, order) => {
          const dish = dishes.find((d: any) => d.id === order.dishId)
          if (!dish) return res
          return res + order.quantity * Number(dish.price)
        }, 0)
        set({ totalPriceCart: totalPrice })
      },

      setTotalPriceCart: (price: number) => set({ totalPriceCart: price }),
      increaseTotalPriceCart: (amount: number) =>
        set((state) => ({ totalPriceCart: state.totalPriceCart + amount })),
      decreaseTotalPriceCart: (amount: number) =>
        set((state) => ({ totalPriceCart: Math.max(0, state.totalPriceCart - amount) })),
      resetTotalPriceCart: () => set({ totalPriceCart: 0 }),

      setSocket: (socket?: Socket | undefined) => set({ socket }),
      disconnectSocket: () =>
        set((state) => {
          state.socket?.disconnect()
          return { socket: undefined }
        }),

      addNotification: (message: string, name: string, status: string) =>
        set((state) => ({
          notifications: [
            {
              id: `${Date.now()}-${Math.random()}`,
              message,
              name,
              status,
              timestamp: Date.now(),
            },
            ...state.notifications,
          ],
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'storage',
      partialize: (state) => ({
        orders: state.orders,
        totalPriceCart: state.totalPriceCart,
        guestName: state.guestName,
        dishes: state.dishes,
        notifications: state.notifications,
      }),
    },
  )
)
export default function AppProvider({
  children
}: {
  children: React.ReactNode
}) {
  const setRole = useAppStore((state) => state.setRole)
  const setSocket = useAppStore((state) => state.setSocket)
  const socket = useAppStore((state) => state.socket)
  const addNotification = useAppStore((state) => state.addNotification)
  const count = useRef(0)
  useEffect(() => {
    if (count.current === 0) {
      const accessToken = getAccessTokenFromLocalStorage()
      if (accessToken) {
        const role = decodeToken(accessToken).role
        setRole(role)
        setSocket(generateSocketInstace(accessToken))
      }
      count.current++
    }
  }, [setRole, setSocket])

  useEffect(() => {
    if (!socket) return

    const onUpdateOrder = (data: UpdateOrderResType['data']) => {
      const {
        dishSnapshot: { name },
        quantity
      } = data
      const message = `Món ${name} (SL: ${quantity}) ${getVietnameseOrderStatus(data.status)}`
      toast.success(message)
      addNotification(message, name, data.status)
      queryClient.invalidateQueries({ queryKey: ['guest-orders'] })
    }


    function onConnect() {
      console.log(socket?.id)
    }

    function onDisconnect() {
      console.log('disconnect')
    }


    const onPayment = (data: PayGuestOrdersResType['data']) => {
      const { guest } = data[0]
      const message = `Khách ${guest?.name} tại bàn ${guest?.tableNumber} thanh toán thành công ${data.length} đơn`
      toast.success(message)
      addNotification(message, guest?.name as string, "Paid")
      queryClient.invalidateQueries({ queryKey: ['guest-orders'] })
    }

    socket.on('update-order', onUpdateOrder)
    socket.on('payment', onPayment)
    socket?.on('connect', onConnect)
    socket?.on('disconnect', onDisconnect)

    return () => {
      socket?.off('connect', onConnect)
      socket?.off('disconnect', onDisconnect)
      socket.off('update-order', onUpdateOrder)
      socket.off('payment', onPayment)
    }
  }, [socket, addNotification])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <RefreshToken />
      <ListenLogoutSocket />
    </QueryClientProvider>
  )
}
