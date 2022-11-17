import { render, screen } from "@testing-library/react"
import DashboardAppPage from "../pages/DashboardAppPage"
import CCRun from "../sections/@dashboard/app/CCRun"

describe ("DashboardPage", () => {
  test ("render correctly", () => {
    render(<DashboardAppPage />)
    const textElement = screen.getByText("Calistir")
    expect (textElement).toBeInTheDocument()
  })
})
