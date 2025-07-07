import ChangePasswordForm from '@/app/manage/setting/components/change-password-form'
import UpdateProfileForm from '@/app/manage/setting/components/update-profile-form'
import { Badge } from '@/components/ui/badge'


export default function Setting() {
  return (
    <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='grid flex-1 w-full gap-4 mx-auto auto-rows-max'>
        <div className='flex items-center gap-4'>
          <h1 className='flex-1 text-xl font-semibold tracking-tight shrink-0 whitespace-nowrap sm:grow-0'>
            Tài khoản cá nhân
          </h1>
          <Badge variant='outline' className='ml-auto sm:ml-0'>
            Quản lý
          </Badge>
        </div>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8'>
          <UpdateProfileForm />
          <ChangePasswordForm />
        </div>
      </div>
    </main>
  )
}
