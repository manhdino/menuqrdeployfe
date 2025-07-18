'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { LoginBody, LoginBodyType } from '@/validations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '@/queries/useAuth'
import toast from 'react-hot-toast';
import { generateSocketInstace, handleErrorApi } from '@/lib/utils'
import { useEffect } from 'react'
import { useAppStore } from '@/components/common/app-provider'
import SearchParamsLoader, {
  useSearchParamsLoader
} from '@/components/common/search-params-loader'
import { LoaderCircle } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const errorMessageT = {
    invalidEmail: "Email không hợp lệ",
    required: "Trường này không được để trống",
    minmaxPassword: "Mật khẩu phải ít nhất 6 kí tự",
  };
  const { searchParams, setSearchParams } = useSearchParamsLoader()
  const loginMutation = useLoginMutation()
  const clearTokens = searchParams?.get('clearTokens')
  const setSocket = useAppStore((state) => state.setSocket)
  const setRole = useAppStore((state) => state.setRole)

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter()
  useEffect(() => {
    if (clearTokens) {
      setRole()
    }
  }, [clearTokens, setRole])
  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return
    try {
      const result = await loginMutation.mutateAsync(data)
      console.log('RESULT',result)
      toast.success(result.payload.message);
      setRole(result.payload.data.account.role)
      router.push('/manage/dashboard')
      setSocket(generateSocketInstace(result.payload.data.accessToken))
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
    <Card className="mx-auto w-full max-w-[500px]  border-none outline-none shadow-none my-20 pb-8 pt-2">
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <CardHeader>
        <CardTitle className='mb-2 text-3xl'>ĐĂNG NHẬP</CardTitle>
        <CardDescription>Nhập email và mật khẩu để đăng nhập!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <button className="inline-flex items-center justify-center gap-3 px-5 py-4 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z" fill="#4285F4"></path><path d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z" fill="#34A853"></path><path d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z" fill="#FBBC05"></path><path d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z" fill="#EB4335"></path></svg>
            Đăng nhập với Google
          </button>
          <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"><svg width="21" className="fill-current" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z"></path></svg>
            Đăng nhập với X
          </button>
        </div>
        <div className="relative py-3 sm:py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
              Or
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
            noValidate
            onSubmit={form.handleSubmit(onSubmit, (err) => {
              console.log(err)
            })}
          >
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
                        className='h-[42px] p-2.5 focus:border-[#fc791a] focus:ring-[#fc791a] focus:ring-1 focus-visible:ring-[#fc791a]'
                        {...field}
                      />
                      <FormMessage>
                        {errors.email?.message && errorMessageT[errors.email.message as keyof typeof errorMessageT]}
                      </FormMessage>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <div className='flex items-center'>
                        <Label htmlFor='password'>Mật khẩu</Label>
                      </div>
                      <Input
                        id='password'
                        type='password'
                        required
                        className='h-[42px] p-2.5 focus:border-[#fc791a] focus:ring-[#fc791a] focus:ring-1 focus-visible:ring-[#fc791a]'
                        {...field}
                      />
                      <FormMessage>
                        {errors.password?.message && errorMessageT[errors.password.message as keyof typeof errorMessageT]}
                      </FormMessage>
                    </div>
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <Checkbox />
                  <span className='ms-2 text-[15px]'>Lưu đăng nhập</span>
                </div>
                <span className='text-[15px] text-[#465fff]'>Quên mật khẩu?</span>
              </div>
              <Button
                className="relative overflow-hidden w-full group text-sm p-[20px] flex gap-2 items-center z-10 bg-[#EB0029]"
              >
                <span className="relative z-10 flex items-center gap-3 text-white">
                  {loginMutation.isPending ? (
                    <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <>
                      Đăng nhập
                    </>
                  )}
                </span>

                {/* Top half animation */}
                <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />

                {/* Bottom half animation */}
                <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


