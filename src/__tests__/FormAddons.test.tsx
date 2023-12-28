import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FormAddons from '../pages/FormAddons/FormAddons'
import { FormContextProvider } from '../contexts/FormContext'

test('displays selected add-ons after clicking on checkbox', () => {
	render(
		<MemoryRouter>
			<FormContextProvider>
				<FormAddons />
			</FormContextProvider>
		</MemoryRouter>
	)

	const addonCheckbox = screen.getByRole('checkbox', { name: /Online service/i }) as HTMLInputElement

	fireEvent.click(addonCheckbox)

	expect(addonCheckbox.checked).toBe(true)
	expect(screen.getByText('+$1/mo')).toBeInTheDocument()
})
