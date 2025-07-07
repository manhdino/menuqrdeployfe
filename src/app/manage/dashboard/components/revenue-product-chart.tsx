"use client"
import { DashboardIndicatorResType } from "@/validations/indicator.schema"
import { useMemo } from "react"
import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Cell,
    TooltipProps,
} from "recharts"

const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4",
    "#e91e63", "#4caf50", "#ff9800", "#9c27b0", "#607d8b"
]
export const CustomTooltip = ({
    active,
    payload
}: TooltipProps<any, any>) => {
    if (active && payload && payload.length > 0) {
        const item = payload[0].payload
        return (
            <div className="bg-white p-3 rounded-md shadow border text-sm">
                <p className="font-semibold text-orange-500">{item.name}</p>
                <p>{`Được đặt: ${item.successOrders} lần`}</p>
            </div>
        )
    }
    return null
}
export function RevenueProductChart({
    chartData
}: {
    chartData: Pick<
        DashboardIndicatorResType['data']['dishIndicator'][0],
        'name' | 'successOrders'
    >[]
}) {
    const chartDataWithColors = useMemo(
        () =>
            chartData.map((data, index) => ({
                ...data,
                fill: COLORS[index % COLORS.length]
            })),
        [chartData]
    )

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Pie
                    data={chartDataWithColors}
                    label={({ name }) => name}
                    dataKey="successOrders"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                >
                    {chartDataWithColors.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.fill}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}
