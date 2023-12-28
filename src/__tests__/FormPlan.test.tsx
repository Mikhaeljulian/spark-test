import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FormPlan from '../pages/FormPlan/FormPlan'
import { FormContextProvider } from '../contexts/FormContext'

describe('FormPlan', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<FormContextProvider>
					<FormPlan />
				</FormContextProvider>
			</MemoryRouter>
		)
	})

	test('renders plan options', () => {
		const planOptions = screen.getAllByRole('radio')
		expect(planOptions).toHaveLength(3)
	})

})
