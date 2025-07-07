import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import TableTable from '@/app/manage/tables'
import { Suspense } from 'react'
import PageBreadcrumb from '@/components/common/bread-crumb'
import ComponentCard from '@/app/manage/components/wrapper-card'


export default function TablesPage() {
  return (
    <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='space-y-2'>
        <Card x-chunk='dashboard-06-chunk-0' className='bg-transparent border-none shadow-none outline-none'>
          <CardHeader className='py-2'>
            <PageBreadcrumb pageTitle="Bàn ăn" />
          </CardHeader>
          <CardContent>
            <Suspense>
              <div className="space-y-6">
                <ComponentCard title="Quản lý bàn ăn">
                  <TableTable />
                </ComponentCard>
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
