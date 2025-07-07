'use client'
import { useAppStore } from "@/components/common/app-provider";
import Image from "next/image";
import NotificationItem from "../components/noti-item";
import { Trash2 } from "lucide-react";


export default function NotificationsPage() {
    const notifications = useAppStore((state) => state.notifications)
    const clearNotifications = useAppStore((state) => state.clearNotifications)
    console.log('Thông báo', notifications)
    return (
        <div className="relative flex flex-col h-[85vh] px-3 py-5">
            <div className="flex items-center justify-center gap-1 mb-4 text-sm font-semibold text-gray-500">
                <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
                <span className='text-base uppercase font-extrabold text-[#fc791a]'>Thông báo đặt món</span>
                <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
            </div>
            <div className="absolute top-3 right-2">
                <div className="bg-[#fc791a] p-[6px] text-white rounded-md shadow-md">
                    <Trash2 onClick={clearNotifications} className="w-5 h-5 " />
                </div>
            </div>
            {notifications.length > 0 ? (
                <div className="flex-1 pr-1 space-y-3 overflow-y-auto">
                    {notifications.map((notif) => (
                        <NotificationItem
                            key={notif.id}
                            status={notif.status}
                            name={notif.name}
                            message={notif.message}
                            timestamp={new Date(notif.timestamp).toLocaleString('vi-VN')}
                        />
                    ))}
                </div>
            ) : (
                <section className="flex-1 flex flex-col justify-center items-center bg-transparent rounded-[10px] p-2">
                    <Image src="/guest/favorite.png" alt="info saved" width={240} height={184} />
                    <h2 className="text-center capitalize text-[18px] font-semibold mb-2">
                        Không có thông báo.
                    </h2>
                    <p className="text-sm text-center text-gray-600 mb-7">
                        Hiện tại bạn chưa có thông báo nào. <br />
                        Hãy bắt đầu đặt món để nhận thông báo từ quán!
                    </p>
                </section>
            )}
        </div>
    )
}
