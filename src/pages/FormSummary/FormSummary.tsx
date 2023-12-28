import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { FormContext } from '../../contexts/FormContext'

const FormSummary: React.FC = () => {
	const formContext = useContext(FormContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!formContext?.formData.fullName || !formContext?.formData.budgetMinimum || !formContext?.formData.budgetMaksimum) {
			navigate('/')
		}
	}, [formContext?.formData.fullName, formContext?.formData.budgetMinimum, formContext?.formData.budgetMaksimum, navigate])

	const handleValidationForm = () => {
		const { fullName, budgetMinimum, plan, price, type } = formContext?.formData ?? {
			fullName: '',
			budgetMinimum: '',
			budgetMaksimum: '',
			plan: '',
			price: '',
			type: '',

		}
		const isFormValid = fullName && budgetMinimum && budgetMinimum && plan && price && type
		if (isFormValid) {
			navigate('/thanks')
		}
	}

	const addonPrices = Object.values(formContext?.formData?.addOns ?? {})
	const total = addonPrices.reduce((sum: number, price: string) => {
		const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''))
		return sum + numericPrice
	}, 0)

	const totalPrice = formContext?.formData?.price ? parseFloat(formContext.formData.price.replace(/[^\d.-]/g, '')) : 0
	const grandTotal = total + totalPrice
	const durationLabel = formContext?.formData.type === 'monthly' ? '/k' : '/yr'
	const plusLabel = formContext?.formData.type === 'monthly' ? '+' : ''

	return (
		<>
			<div className='form__header'>
				<h1 className='form__title'>Finishing up</h1>
				<p className='form__description'>Double-check everything looks OK before confirming.</p>
			</div>
			<div className='form__body'>
				<div className='summary'>
					<div className='summary__selected'>
						<div className='summary__plan'>
							<div className='summary__plan-selected'>
								{formContext?.formData && (
									<p className='summary__plan-selected-name'>
										{formContext.formData.plan} (
										{formContext.formData.type.charAt(0).toUpperCase() + formContext.formData.type.slice(1)})
									</p>
								)}
								<Link className='summary__plan-selected-change' to='/plan'>
									Change
								</Link>
							</div>
							<p className='summary__plan-price'>{formContext?.formData.price}</p>
						</div>
						<div className='summary__services'>
							{Object.entries(formContext?.formData.addOns ?? {}).map(([addOnName, addOnPrice], index) => (
								<div className='summary__service' key={index}>
									<p className='summary__service-name'>{addOnName}</p>
									<p className='summary__service-price'>{addOnPrice}</p>
								</div>
							))}
						</div>
					</div>

					<div className='summary__total'>
						<p className='summary__total-title'>{`Total (${
							formContext?.formData.type === 'monthly' ? 'Sekali Beli' : 'per year'
						})`}</p>
						<p className='summary__total-value'>{`${plusLabel}Rp.${grandTotal}${durationLabel}`}</p>
					</div>
				</div>
			</div>
			<div className='form__footer'>
				<Link className='form__prev-page' to={'/addons'}>
					Go Back
				</Link>
				<div className='form__spacer'></div>
				<button className='form__next-page confirm' onClick={handleValidationForm}>
					Confirm
				</button>
			</div>
		</>
	)
}

export default FormSummary
