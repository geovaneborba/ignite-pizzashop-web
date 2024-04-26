import { render } from "@testing-library/react"
import { NavLink } from "../../src/components/nav-link"
import { MemoryRouter } from "react-router-dom"

describe("Nav link", () => {
  it("should highlight the nav link when is the current page", () => {
    const wrapper = render(
      <>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
        ),
      }
    )
    // current page: 'about'
    // about nav link should be highlighted
    // home nav link should not be highlighted

    const navLinkHome = wrapper.getByText("Home")
    const navLinkAbout = wrapper.getByText("About")

    expect(navLinkHome.dataset.current).toEqual("false")
    expect(navLinkAbout.dataset.current).toEqual("true")
  })
})
