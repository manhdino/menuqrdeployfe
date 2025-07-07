'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { getVietnameseTableStatus, handleErrorApi } from '@/lib/utils'
import {
  CreateTableBody,
  CreateTableBodyType
} from '@/validations/table.schema'
import { TableStatus, TableStatusValues } from '@/constants/type'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAddTableMutation } from '@/queries/useTable'
import toast from 'react-hot-toast';

export default function AddTable() {
  const [open, setOpen] = useState(false)
  const addTableMutation = useAddTableMutation()
  const form = useForm<CreateTableBodyType>({
    resolver: zodResolver(CreateTableBody),
    defaultValues: {
      number: 0,
      capacity: 2,
      status: TableStatus.Hidden
    }
  })
  const reset = () => {
    form.reset()
  }
  const onSubmit = async (values: CreateTableBodyType) => {
    if (addTableMutation.isPending) return
    try {
      const result = await addTableMutation.mutateAsync(values)
      toast.success(
        result.payload.message
      )
      reset()
      setOpen(false)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }
  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          reset()
        }
        setOpen(value)
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size='sm' className='h-9 bg-[#465FFF] hover:bg-blue-700 gap-1'>
          <PlusCircle className='w-4 h-6' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Thêm bàn
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[700px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Thêm bàn</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit, (e) => {
              console.log(e)
            })}
            onReset={reset}
            className='grid items-start gap-4 auto-rows-max md:gap-8'
            id='add-table-form'
          >
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='number'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid items-center grid-cols-4 gap-4 justify-items-start'>
                      <Label htmlFor='name'>Số hiệu bàn</Label>
                      <div className='w-full col-span-3 space-y-2'>
                        <Input
                          id='number'
                          type='number'
                          className='w-full'
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='capacity'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid items-center grid-cols-4 gap-4 justify-items-start'>
                      <Label htmlFor='price'>Lượng khách cho phép</Label>
                      <div className='w-full col-span-3 space-y-2'>
                        <Input
                          id='capacity'
                          className='w-full'
                          {...field}
                          type='number'
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid items-center grid-cols-4 gap-4 justify-items-start'>
                      <Label htmlFor='description'>Trạng thái</Label>
                      <div className='w-full col-span-3 space-y-2'>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn trạng thái' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TableStatusValues.map((status) => (
                              <SelectItem key={status} value={status}>
                                {getVietnameseTableStatus(status)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='add-table-form' className='mt-4 bg-green-500 hover:bg-green-700'>
            Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
