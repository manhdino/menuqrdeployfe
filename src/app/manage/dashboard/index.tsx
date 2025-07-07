'use client'
import { RevenueBarChart } from '@/app/manage/dashboard/components/revenue-bar-chart'
import { formatCurrency } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { endOfDay, format, startOfDay } from 'date-fns'
import { useState } from 'react'
import { useDashboardIndicator } from '@/queries/useIndicator'
import RevenueCard from './components/revenue-card'
import { Box, CircleDollarSign, Soup, Users } from 'lucide-react'
import { RevenueProductChart } from './components/revenue-product-chart'


const initFromDate = startOfDay(new Date())
const initToDate = endOfDay(new Date())
export default function DashboardMain() {
  const [fromDate, setFromDate] = useState(initFromDate)
  const [toDate, setToDate] = useState(initToDate)
  const { data } = useDashboardIndicator({
    fromDate,
    toDate
  })
  const revenue = data?.payload.data.revenue ?? 0
  const guestCount = data?.payload.data.guestCount ?? 0
  const orderCount = data?.payload.data.orderCount ?? 0
  const servingTableCount = data?.payload.data.servingTableCount ?? 0
  const revenueByDate = data?.payload.data.revenueByDate ?? []
  const dishIndicator = data?.payload.data.dishIndicator ?? []

  const resetDateFilter = () => {
    setFromDate(initFromDate)
    setToDate(initToDate)
  }

  return (
    <div className='space-y-4'>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <RevenueCard
          title="Tổng doanh thu"
          value={formatCurrency(revenue)}
          Icon={<CircleDollarSign className="w-6 h-6 text-gray-800 dark:text-white/90" />}
        />

        <RevenueCard
          title="Khách hàng gọi món"
          value={guestCount}
          Icon={<Users className="w-6 h-6 text-gray-800 dark:text-white/90" />}
        />

        <RevenueCard
          title="Đơn hàng"
          value={orderCount}
          Icon={<Box className="w-6 h-6 text-gray-800 dark:text-white/90" />}
        />

        <RevenueCard
          title="Bàn đang phục vụ"
          value={servingTableCount}
          Icon={<Soup className="w-6 h-6 text-gray-800 dark:text-white/90" />}
        />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <div className='lg:col-span-4'>
          <div className="rounded-2xl  border w-full border-gray-200 bg-white p-2">
            <div className='border-b border-b-gray-200 flex items-center justify-between p-2'>
              <h4 className='text-gray-900 text-[18px] font-bold  px-4 pt-3 pb-2'>
                Doanh thu
              </h4>
              <div className='flex flex-wrap gap-2'>
                <div className='flex items-center'>
                  <span className='mr-2'>Từ</span>
                  <Input
                    type='datetime-local'
                    placeholder='Từ ngày'
                    className='text-sm'
                    value={format(fromDate, 'yyyy-MM-dd HH:mm').replace(' ', 'T')}
                    onChange={(event) => setFromDate(new Date(event.target.value))}
                  />
                </div>
                <div className='flex items-center'>
                  <span className='mr-2'>Đến</span>
                  <Input
                    type='datetime-local'
                    placeholder='Đến ngày'
                    value={format(toDate, 'yyyy-MM-dd HH:mm').replace(' ', 'T')}
                    onChange={(event) => setToDate(new Date(event.target.value))}
                  />
                </div>
                <Button className='' variant={'outline'} onClick={resetDateFilter}>
                  Hôm nay
                </Button>
              </div>
            </div>

            <RevenueBarChart chartData={revenueByDate} />
          </div>

        </div>
        <div className='lg:col-span-3 flex flex-col gap-4 items-center'>
          <div className="rounded-2xl  border w-full border-gray-200 bg-white p-2">
            <h4 className='text-gray-900 text-[17px] font-bold  px-4 pt-3 pb-[6px]'>
              Xếp hạng món ăn
            </h4>
            <h6 className='text-gray-500 text-sm border-b border-b-gray-200 p-4 pt-0'>Những món ăn được gọi nhiều nhất</h6>

            <RevenueProductChart chartData={dishIndicator} />
          </div>
        </div>
      </div>
    </div>
  )
}
