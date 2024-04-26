import { api } from "@/lib/axios"

export type RegisterRestaurantBody = {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  managerName,
  restaurantName,
  email,
  phone,
}: RegisterRestaurantBody) {
  await api.post("/restaurants", { managerName, restaurantName, email, phone })
}
