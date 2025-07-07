import { OrderStatus } from '@/constants/type'
import { getVietnameseOrderStatus, OrderStatusIcon } from '@/lib/utils'

type NotificationItemProps = {
    status: string
    name: string
    message: string
    timestamp: string
}
export const statusMeta: any = {
    [OrderStatus.Pending]: {
        Icon: OrderStatusIcon.Pending,
        color: 'text-gray-700',
    },
    [OrderStatus.Processing]: {
        Icon: OrderStatusIcon.Processing,
        color: 'text-black',
    },
    [OrderStatus.Rejected]: {
        Icon: OrderStatusIcon.Rejected,
        color: 'text-red-400',
    },
    [OrderStatus.Delivered]: {
        Icon: OrderStatusIcon.Delivered,
        color: 'text-green-700',
    },
    [OrderStatus.Paid]: {
        Icon: OrderStatusIcon.Paid,
        color: 'text-orange-500',
    },
} as const
export default function NotificationItem({
    status,
    name,
    message,
    timestamp,
}: NotificationItemProps) {


    const { Icon, color } = statusMeta[status]
    return (
        <div className=" bg-white p-3 rounded-md shadow-lg">
            <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className={color}>{getVietnameseOrderStatus(status)}:</span>
                <h5 className="text-base font-medium text-black">{name}</h5>
            </div>
            <p className="text-sm text-gray-600 mb-[2px]">{message}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{timestamp}</span>
            </div>
        </div>
    )
}
