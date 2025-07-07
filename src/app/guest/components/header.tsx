'use client';
import { useAppStore } from '@/components/common/app-provider';
import { formatCurrency, handleErrorApi } from '@/lib/utils';
import { useGuestLogoutMutation } from '@/queries/useGuest';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Header() {
    const totalPriceCart = useAppStore((state) => state.totalPriceCart)
    const guestName = useAppStore((state) => state.guestName)
    const logoutMutation = useGuestLogoutMutation()
    const router = useRouter()
    const setRole = useAppStore((state) => state.setRole)
    const disconnectSocket = useAppStore((state) => state.disconnectSocket)
    const handleGuestLogout = async () => {
    if (logoutMutation.isPending) return
    try {
      await logoutMutation.mutateAsync()
      disconnectSocket()
      router.push('/')
    } catch (error: any) {
      handleErrorApi({
        error
      })
    }
  }
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between p-2 bg-gray-100 ">
            <button className="flex items-center gap-2">
                <Image
                    src="/avatar.png"
                    alt="user"
                    width={45}
                    height={45}
                    className="bg-orange-400 rounded-full"
                />
                <h5 className="text-base font-medium">{guestName}</h5>
            </button>
            <div className="flex items-center justify-center p-2 bg-orange-400 rounded-full ">
                <span className="text-xs text-white">
                    {formatCurrency(totalPriceCart)}
                </span>
            </div>
            <Link
                href="/menu"
                className="relative overflow-hidden p-2 rounded-sm group flex  items-center z-10 bg-[#fc791a] opacity-80"
            >
                <LogOut className='w-4 h-4 text-white' />
            </Link>
        </header>
    );
}
