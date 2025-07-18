'use client'
import { useAppStore } from '@/components/common/app-provider'
import { Role } from '@/constants/type'
import { cn, handleErrorApi } from '@/lib/utils'
import { useLogoutMutation } from '@/queries/useAuth'
import { RoleType } from '@/types/jwt.types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const menuItems: {
  title: string
  href: string
  role?: RoleType[]
  hideWhenLogin?: boolean
}[] = [
    {
      title: 'home',
      href: '/'
    },
    {
      title: 'menu',
      href: '/guest/menu',
      role: [Role.Guest]
    },
    {
      title: 'orders',
      href: '/guest/orders',
      role: [Role.Guest]
    },
    {
      title: 'login',
      href: '/login',
      hideWhenLogin: true
    },
    {
      title: 'manage',
      href: '/manage/dashboard',
      role: [Role.Owner, Role.Employee]
    }
  ]

export default function NavItems({ className }: { className?: string }) {
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)
  const disconnectSocket = useAppStore((state) => state.disconnectSocket)
  const logoutMutation = useLogoutMutation()
  const router = useRouter()
  const logout = async () => {
    if (logoutMutation.isPending) return
    try {
      await logoutMutation.mutateAsync()
      setRole()
      disconnectSocket()
      router.push('/')
    } catch (error: any) {
      handleErrorApi({
        error
      })
    }
  }
  return (
    <>
      {menuItems.map((item) => {
        const isAuth = item.role && role && item.role.includes(role)
        const canShow =
          (item.role === undefined && !item.hideWhenLogin) ||
          (!role && item.hideWhenLogin)
        if (isAuth || canShow) {
          return (
            <Link href={item.href} key={item.href} className={`${className}`}>
              {item.title as any}
            </Link>
          )
        }
        return null
      })}
      {role && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className={cn(className, 'cursor-pointer')}>Logout</div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Signing out may result in loss of your orders
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={logout}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
