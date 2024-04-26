import { HttpResponse, http } from "msw"
import type { GetOrdersResponse } from "../../../../src/api/orders/get-orders"

type Orders = GetOrdersResponse["orders"]
type OrderStatus = GetOrdersResponse["orders"][number]["status"]

const statuses: OrderStatus[] = [
  "canceled",
  "delivered",
  "delivering",
  "pending",
  "processing",
]

const STATUS_CYCLE_LENGTH = 5
const ORDERS_PER_PAGE = 10

const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: statuses[i % STATUS_CYCLE_LENGTH],
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = Number(searchParams.get("pageIndex")) ?? 0
    const customerName = searchParams.get("customerName")
    const orderId = searchParams.get("orderId")
    const status = searchParams.get("status")

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName)
      )
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId)
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * ORDERS_PER_PAGE,
      (pageIndex + 1) * ORDERS_PER_PAGE
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: ORDERS_PER_PAGE,
        totalCount: filteredOrders.length,
      },
    })
  }
)
