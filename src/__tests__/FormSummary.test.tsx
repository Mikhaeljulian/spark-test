import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FormSummary from '../pages/FormSummary/FormSummary'
import { FormContextProvider } from '../contexts/FormContext'

test('displays correct content', () => {
	render(
		<MemoryRouter>
			<FormContextProvider>
				<FormSummary />
			</FormContextProvider>
		</MemoryRouter>
	)

	expect(screen.getByText('Finishing up')).toBeInTheDocument()
	expect(screen.getByText('Double-check everything looks OK before confirming.')).toBeInTheDocument()
	expect(screen.getByText('Go Back')).toBeInTheDocument()
	expect(screen.getByText('Confirm')).toBeInTheDocument()
	expect(screen.getByText('Total (per month)')).toBeInTheDocument()
})
