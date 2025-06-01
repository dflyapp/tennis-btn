import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />)
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument()
  })
})
