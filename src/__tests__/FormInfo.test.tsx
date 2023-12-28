import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FormInfo from '../pages/FormInfo/FormInfo'
import { FormContextProvider } from '../contexts/FormContext'

describe('FormInfo', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<FormContextProvider>
					<FormInfo />
				</FormContextProvider>
			</MemoryRouter>
		)
	})

	test('render form dengan input field', () => {
		expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
		expect(screen.getByLabelText('Budget Minimum')).toBeInTheDocument()
		expect(screen.getByLabelText('Budget Maksimum')).toBeInTheDocument()
	})

	describe('error handling', () => {
		test('Tampilkan Error Jika pengisian tidak sesuai', () => {
			const fullNameInput = screen.getByLabelText('Full Name') as HTMLInputElement
			const budgetMinimumInput = screen.getByLabelText('Budget Minimum') as HTMLInputElement
			const budgetMaksimumInput = screen.getByLabelText('Budget Maksimum') as HTMLInputElement

			fireEvent.change(fullNameInput, { target: { value: 'AB' } })
			fireEvent.change(budgetMinimumInput, { target: { value: '1' } })
			fireEvent.change(budgetMaksimumInput, { target: { value: 'abc' } })

			expect(screen.getByText('Nama harus mengandung setidaknya 3 huruf')).toBeInTheDocument()
			expect(screen.getByText('Nominal minimal harus Rp. 500.000')).toBeInTheDocument()
			expect(screen.getByText('Mohon masukkan nilai angka')).toBeInTheDocument()
		})

		test('prevents moving to FormPlan without filling inputs', () => {
			const nextStepButton = screen.queryAllByText('Next Step')
			fireEvent.click(nextStepButton[0])

			expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
			expect(screen.getByLabelText('Budget Minimum')).toBeInTheDocument()
			expect(screen.getByLabelText('Budget Maksimum')).toBeInTheDocument()
			expect(screen.queryByText('Plan')).not.toBeInTheDocument()
		})
	})
})
