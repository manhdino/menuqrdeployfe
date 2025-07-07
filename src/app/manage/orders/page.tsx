import OrderTable from '@/app/manage/orders'
import PageBreadcrumb from '@/components/common/bread-crumb'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import ComponentCard from '@/app/manage/components/wrapper-card'
import { Suspense } from 'react'




export default function AccountsPage() {
  return (
    <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='space-y-2'>
        <Card x-chunk='dashboard-06-chunk-0' className='bg-transparent border-none shadow-none outline-none'>
          <CardHeader className='py-2'>
            <PageBreadcrumb pageTitle="Đơn đặt" />
          </CardHeader>
          <CardContent>
            <Suspense>
              <div className="space-y-6">
                <ComponentCard title="Quản lý đơn đặt món">
                  <OrderTable />
                </ComponentCard>
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
