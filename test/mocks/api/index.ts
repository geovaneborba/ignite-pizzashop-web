import { env } from "@/env"
import { setupWorker } from "msw/browser"
import { signInMock } from "./auth/sign-in-mocks"
import { registerRestaurantMock } from "./restaurant/register-restaurant-mock"
import { getDayOrdersAmountMock } from "./metrics/get-day-orders-amount-mock"
import { getMonthCanceledOrdersAmountMock } from "./metrics/get-month-canceled-orders-amount-mock"
import { getMonthOrdersAmountMock } from "./metrics/get-month-orders-amount-mock"
import { getMonthRevenueMock } from "./metrics/get-month-revenue-mock"
import { getDailyRevenueInPeriodMock } from "./metrics/get-daily-revenue-in-period-mock"
import { getPopularProductsMock } from "./metrics/get-popular-products-mock"
import { getManagedRestaurantMock } from "./restaurant/get-managed-restaurant-mock"
import { getProfileMock } from "./profile/get-profile-mock"
import { updateProfileMock } from "./profile/update-profile-mock"
import { getOrdersMock } from "./orders/get-orders-mock"
import { getOrderDetailsMock } from "./orders/get-order-details-mock"
import { approveOrderMock } from "./orders/approve-order-mock"
import { cancelOrderMock } from "./orders/cancel-order-mock"
import { deliverOrderMock } from "./orders/deliver-order-mock"
import { dispatchOrderMock } from "./orders/dispatch-order-mock"

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock
)

export async function enableMSW() {
  if (env.MODE !== "test") {
    return
  }

  await worker.start()
}
