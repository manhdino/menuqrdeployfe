import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import DishTable from '@/app/manage/dishes'
import { Suspense } from 'react'
import PageBreadcrumb from '@/components/common/bread-crumb'
import ComponentCard from '@/app/manage/components/wrapper-card'


export default function DishesPage() {
  return (
    <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='space-y-2'>
        <Card className='bg-transparent border-none shadow-none outline-none'>
          <CardHeader className='py-2'>
            <PageBreadcrumb pageTitle="Món ăn" />
          </CardHeader>
          <CardContent>
            <Suspense>
              <div className="space-y-6">
                <ComponentCard title="Quản lý món ăn">
                  <DishTable />
                </ComponentCard>
              </div>
            </Suspense>

          </CardContent>
        </Card>
      </div>
    </main>
  )
}
