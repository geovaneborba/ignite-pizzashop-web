import { HttpResponse, http } from "msw"
import { GetMonthCanceledOrdersAmountResponse } from "../../../../src/api/metrics/get-month-canceled-orders-amount"

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", async () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})
