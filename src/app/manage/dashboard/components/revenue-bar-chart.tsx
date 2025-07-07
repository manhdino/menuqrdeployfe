import { Bar, CartesianGrid, BarChart, Tooltip, XAxis, YAxis, Legend, TooltipProps, Cell } from 'recharts'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
} from '@/components/ui/chart'
import { DashboardIndicatorResType } from '@/validations/indicator.schema'
import { formatCurrency } from '@/lib/utils'


const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function RevenueBarChart({
  chartData
}: {
  chartData: DashboardIndicatorResType['data']['revenueByDate']
}) {

  const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      const revenue = payload[0].value
      const date = payload[0].payload.date
      return (
        <div className="bg-gray-100 shadow-inner rounded-md p-3 flex flex-col gap-1">
          <p className="text-sm text-orange-500">{`Doanh thu: ${formatCurrency(revenue)}`}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      )
    }
    return null
  }
  return (
    <Card className="pt-8 border-0 shadow-none">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) =>
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  minimumFractionDigits: 0
                }).format(value)
              }
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="revenue" name="Doanh thu" barSize={20} fill="#fc791a" />

          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
