import { HttpResponse, http } from "msw"
import { GetProfileResponse } from "../../../../src/api/profile/get-profile"

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "custom-user-id",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "999999999",
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    })
  }
)
