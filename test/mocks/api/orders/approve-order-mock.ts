import { HttpResponse, http } from "msw"
import { ApproveOrderParams } from "../../../../src/api/orders/approve-order"

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  `/orders/:orderId/approve`,
  ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  }
)
