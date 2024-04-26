import { api } from "@/lib/axios"

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export type GetDailyRevenueInPeriodParams = {
  to?: Date
  from?: Date
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodParams) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: { from, to },
    }
  )

  return response.data
}
