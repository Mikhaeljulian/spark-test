import React, { createContext, useState, ReactNode } from 'react'

interface FormData {
	fullName: string
	budgetMinimum: string
	budgetMaksimum: string
	plan: string
	price: string
	type: string
	addOns: Record<string, any>
}

interface FormContextValue {
	formData: FormData
	updateFormData: (newData: Partial<FormData>) => void
}

export const FormContext = createContext<FormContextValue | undefined>(undefined)

interface FormContextProviderProps {
	children: ReactNode
}

export const FormContextProvider: React.FC<FormContextProviderProps> = ({ children }) => {
	const [formData, setFormData] = useState<FormData>({
		fullName: '',
		budgetMinimum: '',
		budgetMaksimum: '',
		plan: 'Arcade',
		price: '$9/mo',
		type: 'monthly',
		addOns: {},
	})

	const updateFormData = (newData: Partial<FormData>) => {
		setFormData(prevData => ({ ...prevData, ...newData }))
	}

	return <FormContext.Provider value={{ formData, updateFormData }}>{children}</FormContext.Provider>
}
