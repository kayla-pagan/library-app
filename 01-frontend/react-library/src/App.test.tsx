import { render, screen, within } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"
import App from "./App"
import { MemoryRouter } from "react-router-dom"

describe('App Componenet', () => {
    it('should render "Search Books" link', async () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )

        const navbar = await screen.findByRole("navigation")
        const searchBooksLink = within(navbar).getByRole('link', { name: /Search Books/i })
        expect(searchBooksLink).toBeInTheDocument()
        expect(searchBooksLink).toHaveAttribute("href", "/search")
    })

    it('should render "Home" link', async () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )

        const navbar = await screen.findByRole("navigation")
        const homeLink = within(navbar).getByRole('link', { name: /home/i })
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute("href", "/")
    })
})