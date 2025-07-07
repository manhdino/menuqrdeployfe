'use client'
import menuItems from '@/constants/menuItems'
import { useAppStore } from '@/components/common/app-provider'
import {
  TooltipProvider
} from '@/components/ui/tooltip'
import { UserRoundCog } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


export default function NavLinks() {
  const pathname = usePathname()
  const role = useAppStore((state) => state.role)
  return (
    <TooltipProvider>
      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 w-[290px]`}
      >
        <nav className='flex flex-col gap-2 px-3 py-4'>
          <Link
            href='/'
            className='w-3/4 mb-8'
          >
            <Image
              src="/logo/logoBlack.svg"
              width={230}
              height={80}
              quality={80}
              loading='lazy'
              className='contain'
              alt='Banner'
            />
          </Link>
          <div>
            <h2
              className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 lg:justify-start`}
            >
              Quản lý
            </h2>
            {menuItems.map((Item, index) => {
              const isActive = pathname === Item.href
              if (!Item.roles.includes(role as any)) return null
              return (
                <Link
                  key={index}
                  href={Item.href}
                  className={`relative flex items-center w-full gap-3 px-3 py-3 mb-3 font-medium rounded-lg text-sm
                     group ${isActive ? "bg-[#ecf3ff] text-[#465fff] dark:bg-brand-500/[0.12] dark:text-brand-400" :
                      " text-gray-700 hover:bg-gray-100 group-hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    }`}
                >
                  <span
                    className={`${isActive
                      ? " bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400"
                      : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"}`}
                  >
                    <Item.Icon className='w-5 h-5' />
                  </span>
                  <span>{Item.title}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <nav className='flex flex-col gap-1 px-3 py-4 '>
          <h2
            className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 lg:justify-start`}
          >
            Cài đặt
          </h2>
          <Link
            href='/manage/setting'
            className={`relative flex items-center w-full gap-3 px-3 py-3 mb-3 font-medium rounded-lg text-sm
                     group ${pathname === '/manage/setting' ? "bg-[#ecf3ff] text-[#465fff] dark:bg-brand-500/[0.12] dark:text-brand-400" :
                " text-gray-700 hover:bg-gray-100 group-hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300"
              }`}
          >
            <UserRoundCog className='w-5 h-5' />
            <span>Tài khoản </span>
          </Link>
        </nav>
      </aside>
    </TooltipProvider>
  )
}

