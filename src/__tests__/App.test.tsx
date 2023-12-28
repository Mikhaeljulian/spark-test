import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

describe('App', () => {
	test('renders Form component', () => {
		render(<App />)

		const formElement = screen.getByText('Simulasi Spark Fashion Academy')
		expect(formElement).toBeInTheDocument()

		const fullNameInput = screen.getByLabelText('Nama') as HTMLInputElement
		expect(fullNameInput).toBeInTheDocument()

		const budgetMinimumInput = screen.getByLabelText('Budget Minimum') as HTMLInputElement
		expect(budgetMinimumInput).toBeInTheDocument()

		const budgetMaksimumInput = screen.getByLabelText('Budget Maksimum') as HTMLInputElement
		expect(budgetMaksimumInput).toBeInTheDocument()

		const nextButton = screen.getByRole('button', { name: 'Next Step' })
		expect(nextButton).toBeInTheDocument()
	})
})
