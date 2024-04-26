import { HttpResponse, http } from "msw"
import { DispatchOrderParams } from "../../../../src/api/orders/dispatch-order"

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  "/orders/:orderId/dispatch",
  ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  }
)
