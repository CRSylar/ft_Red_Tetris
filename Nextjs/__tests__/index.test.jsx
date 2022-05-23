import {render, screen} from '@testing-library/react'
import Home from '../pages/index'

describe('HomeLogo', () => {
	it('Render the logo', () => {
		render(<Home/>)

		const logo = screen.getByRole('heading',  {
			name: 'Red Tetris',
		})

		const button = screen.getByRole('button', {
			name: 'Enter'
		})

		expect(logo).toBeInTheDocument()
		expect(button).toBeInTheDocument()

	} )
})
