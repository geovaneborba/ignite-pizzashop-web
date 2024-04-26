import { HttpResponse, http } from "msw"
import { GetMonthRevenueResponse } from "../../../../src/api/metrics/get-month-revenue"

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>("/metrics/month-receipt", async () => {
  return HttpResponse.json({
    receipt: 20000,
    diffFromLastMonth: 10,
  })
})
