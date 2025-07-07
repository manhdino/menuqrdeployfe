'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GuestLoginBody,
  GuestLoginBodyType
} from '@/validations/guest.schema'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGuestLoginMutation } from '@/queries/useGuest'
import { useAppStore } from '@/components/common/app-provider'
import { generateSocketInstace, handleErrorApi } from '@/lib/utils'
import { LoaderCircle, MoveRight } from 'lucide-react'

export default function GuestLoginForm() {
  const setSocket = useAppStore((state) => state.setSocket)
  const setRole = useAppStore((state) => state.setRole)
  const setGuestName = useAppStore((state) => state.setGuestName)
  const searchParams = useSearchParams()
  const params = useParams()
  const tableNumber = Number(params.number)
  const token = searchParams.get('token')
  const router = useRouter()
  const loginMutation = useGuestLoginMutation()

  const form = useForm<GuestLoginBodyType>({
    resolver: zodResolver(GuestLoginBody),
    defaultValues: {
      name: '',
      token: token ?? '',
      tableNumber
    }
  })

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [token, router])

  async function onSubmit(values: GuestLoginBodyType) {
    if (loginMutation.isPending) return
    try {
      const result = await loginMutation.mutateAsync(values)
      setRole(result.payload.data.guest.role)
      setGuestName(result.payload.data.guest.name)
      setSocket(generateSocketInstace(result.payload.data.accessToken))
      router.push('/guest/menu')
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
    <section className="flex flex-col justify-center items-center px-5 py-8 bg-white max-w-[600px] rounded-t-[10px]">
      <h1 className="mb-[14px] text-2xl font-bold text-black">Đăng nhập</h1>
      <p className="mb-[30px] text-[15px] text-[#748ba0]">Nhập tên của bạn để gọi món</p>
      <Form {...form}>
        <form
          className="space-y-4 max-w-[600px] w-full"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Họ và tên:</Label>
                    <Input
                      type="text"
                      id="name"
                      required
                      {...field}
                      placeholder="Nhập tên của bạn..."
                      className='py-3 text-sm bg-white border border-gray-300 shadow-sm  focus:border-[#fc791a] focus:ring-[#fc791a] focus:ring-1 focus-visible:ring-[#fc791a]'
                    />

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="relative overflow-hidden w-full group text-sm py-[13px] px-[25px] flex items-center justify-center z-10 bg-[#EB0029]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                <span className="relative z-10 flex items-center gap-3 text-white">
                  {loginMutation.isPending ? (
                    <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <>
                      Đăng nhập
                    </>
                  )}
                </span>
              </span>

              {/* Top animation */}
              <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
              {/* Bottom animation */}
              <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
