import { HttpResponse, http } from "msw"
import { GetDailyRevenueInPeriodResponse } from "../../../../src/api/metrics/get-daily-revenue-in-period"

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", async () => {
  return HttpResponse.json([
    {
      date: "01/01/2024",
      receipt: 2000,
    },
    {
      date: "02/01/2024",
      receipt: 4000,
    },
    {
      date: "03/01/2024",
      receipt: 400,
    },
    {
      date: "04/01/2024",
      receipt: 3000,
    },
    {
      date: "05/01/2024",
      receipt: 200,
    },
    {
      date: "06/01/2024",
      receipt: 750,
    },
    {
      date: "07/01/2024",
      receipt: 400,
    },
  ])
})
