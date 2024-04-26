import colors from "tailwindcss/colors"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTheme } from "@/components/theme/theme-provider"
import { useQuery } from "@tanstack/react-query"
import { getDailyRevenueInPeriod } from "@/api/metrics/get-daily-revenue-in-period"
import { Label } from "@/components/ui/label"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { priceFormatter } from "@/utils/price-formatter"
import { Loader2 } from "lucide-react"

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { theme } = useTheme()

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        to: dateRange?.to,
        from: dateRange?.from,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) => priceFormatter(value)}
              />

              <Tooltip
                labelStyle={{
                  color: theme === "dark" ? "#fafafa" : "#737373",
                  fontWeight: "500",
                }}
                itemStyle={{
                  color: theme === "dark" ? "#fafafa" : "#0a0a0a",
                  fontWeight: "bold",
                }}
                contentStyle={{
                  borderRadius: 10,
                  backgroundColor: theme === "dark" ? "#0a0a0a" : "white",
                }}
                formatter={(value: number) => [
                  value.toLocaleString("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  }),
                  "Receita",
                ]}
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                stroke={colors.violet[500]}
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
