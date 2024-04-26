import { render } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router-dom"
import { SignIn } from "../../src/pages/auth/sign-in"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { HelmetProvider } from "react-helmet-async"

vi.mock("react-router-dom", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-router-dom")>()),
  useLocation: vi.fn().mockReturnValue({
    pathname: "/sign-in",
    search: "?email=johndoe@example.com",
  }),
}))

describe("Sign In", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter
              initialEntries={["/sign-in?email=johndoe@example.com"]}
            >
              {children}
            </MemoryRouter>
          </QueryClientProvider>
        </HelmetProvider>
      ),
    })

    const location = useLocation()

    const inputEmail = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement

    expect(location.pathname).toEqual("/sign-in")
    expect(location.search).toEqual("?email=johndoe@example.com")
    expect(inputEmail.value).toEqual("johndoe@example.com")
  })
})
