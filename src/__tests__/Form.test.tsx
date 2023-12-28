import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FormInfo from '../pages/FormInfo/FormInfo'
import FormPlan from '../pages/FormPlan/FormPlan'
import FormAddons from '../pages/FormAddons/FormAddons'
import FormSummary from '../pages/FormSummary/FormSummary'
import FormThanks from '../pages/FormThanks/FormThanks'
import { FormContextProvider } from '../contexts/FormContext'

describe('Proper completion and submission of the form', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<FormContextProvider>
					<FormInfo />
					<FormPlan />
					<FormAddons />
					<FormSummary />
					<FormThanks />
				</FormContextProvider>
			</MemoryRouter>
		)
	})

	const fillFormInfo = () => {
		const fullNameInput = screen.getByLabelText('Nama') as HTMLInputElement
		const budgetMinimumInput = screen.getByLabelText('Budget Minimum') as HTMLInputElement
		const budgetMaksimumInput = screen.getByLabelText('Budget Maksimum') as HTMLInputElement

		fireEvent.change(fullNameInput, { target: { value: 'Mikhael' } })
		fireEvent.change(budgetMinimumInput, { target: { value: '500000' } })
		fireEvent.change(budgetMaksimumInput, { target: { value: '1234567890' } })
	}

	const proceedToNextStep = () => {
		const nextStepButton = screen.queryAllByText('Next Step')
		fireEvent.click(nextStepButton[0])
	}

	const selectPlan = () => {
		expect(screen.getByText('Pilih Kategori')).toBeInTheDocument()

		expect(screen.getByText('Designer')).toBeInTheDocument()
		const advancedRadio = screen.getByText('Bisnis') as HTMLInputElement
		fireEvent.click(advancedRadio)

		proceedToNextStep()
	}

	const selectAddons = () => {
		expect(screen.getByText('Paket Tersedia')).toBeInTheDocument()

		const addonCheckbox = screen.getByRole('checkbox', { name: /Online service/i }) as HTMLInputElement
		fireEvent.click(addonCheckbox)

		proceedToNextStep()
	}

	const reviewSummary = () => {
		expect(screen.getByText('Finishing up')).toBeInTheDocument()
	}

	const submitForm = () => {
		const confirmButton = screen.getByRole('button', { name: 'Confirm' })
		fireEvent.click(confirmButton)
		expect(
			screen.getByText(
				'Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at thiomikael@gmail.com.'
			)
		).toBeInTheDocument()
	}

	it('should complete and submit the form', () => {
		fillFormInfo()
		proceedToNextStep()
		selectPlan()
		selectAddons()
		reviewSummary()
		submitForm()
	})
})
