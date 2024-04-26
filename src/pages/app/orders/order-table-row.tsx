import { formatDistanceToNow, intlFormat } from "date-fns"
import { ArrowRight, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { OrderDetails } from "./order-details"
import { OrderStatus } from "../../../components/order-status"

import { ptBR } from "date-fns/locale"
import { priceFormatter } from "@/utils/price-formatter"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "@/api/orders/cancel-order"
import { GetOrdersResponse } from "@/api/orders/get-orders"
import { approveOrder } from "@/api/orders/approve-order"
import { deliverOrder } from "@/api/orders/deliver-order"
import { dispatchOrder } from "@/api/orders/dispatch-order"

type OrderTableRow = {
  order: {
    orderId: string
    createdAt: string
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered"
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRow) {
  const queryClient = useQueryClient()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const updateOrderStatusOnCache = (orderId: string, status: OrderStatus) => {
    // Recupera a lista de pedidos do cache
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    })

    // Atualizada cada pedido no cache
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      // Verifica se os dados existem antes de atualizar o cache
      if (!cacheData) {
        return
      }

      // Atualiza os dados do cache com o status cancelado
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          // Se não encontrou o pedido
          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "canceled")
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing")
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering")
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered")
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {priceFormatter(order.total / 100)}
      </TableCell>

      <TableCell>
        {order.status === "pending" && (
          <Button
            variant="outline"
            disabled={isApprovingOrder}
            size="xs"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant="outline"
            disabled={isDispatchingOrder}
            size="xs"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            variant="outline"
            disabled={isDeliveringOrder}
            size="xs"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
