import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "react-router-dom"

const orderFilterFormSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersFormData = z.infer<typeof orderFilterFormSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get("orderId")
  const customerName = searchParams.get("customerName")
  const status = searchParams.get("status")

  const { handleSubmit, control, register, reset } =
    useForm<OrderFiltersFormData>({
      defaultValues: {
        orderId: orderId ?? "",
        customerName: customerName ?? "",
        status: status ?? "all",
      },
      resolver: zodResolver(orderFilterFormSchema),
    })

  const handleFilter = ({
    orderId,
    customerName,
    status,
  }: OrderFiltersFormData) => {
    setSearchParams((state) => {
      // Cria um objeto com os parâmetros a serem atualizados
      const paramsToUpdate = {
        orderId,
        customerName,
        status,
        page: "1",
      }

      // Itera sobre cada par chave-valor em paramsToUpdate
      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (value) {
          state.set(key, value)
        } else {
          state.delete(key)
        }
      })

      return state
    })
  }

  const handleClearFilters = () => {
    setSearchParams((state) => {
      state.delete("orderId")
      state.delete("customerName")
      state.delete("status")

      state.set("page", "1")

      return state
    })

    reset({
      customerName: "",
      orderId: "",
      status: "all",
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { name, value, onChange, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        variant="outline"
        size="xs"
        type="button"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
