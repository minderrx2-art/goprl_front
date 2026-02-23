import { render, screen } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import App from './App.svelte'

describe('App', () => {
    it('renders Vite + Svelte heading', () => {
        render(App)
        expect(screen.getByText(/Vite \+ Svelte/i)).toBeInTheDocument()
    })
})
