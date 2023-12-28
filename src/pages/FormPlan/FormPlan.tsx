import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import arcade from '../../assets/images/icon-arcade.svg'
import advanced from '../../assets/images/icon-advanced.svg'
import pro from '../../assets/images/icon-pro.svg'
import { FormContext } from '../../contexts/FormContext'

interface Price {
	monthly: string
	yearly: string
	image: string
}

interface Prices {
	[key: string]: Price
}

const prices: Prices = {
	Designer: {
		monthly: '9/mo',
		yearly: '90/yr',
		image: arcade,
	},
	Bisnis: {
		monthly: '12/mo',
		yearly: '120/yr',
		image: advanced,
	},
	Hobby: {
		monthly: '15/mo',
		yearly: '150/yr',
		image: pro,
	},
}

const FormPlan: React.FC = () => {
	const formContext = useContext(FormContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!formContext?.formData?.fullName || !formContext?.formData?.budgetMinimum || !formContext?.formData?.budgetMaksimum) {
			navigate('/')
		}
	}, [formContext?.formData?.fullName, formContext?.formData?.budgetMinimum, formContext?.formData?.budgetMaksimum, navigate])

	useEffect(() => {
		const selectedLabel = document.querySelector(
			`label[for="${formContext?.formData.plan.toLowerCase()}"]`
		) as HTMLLabelElement | null
		if (selectedLabel) {
			selectedLabel.classList.add('selected')
		}

		const planLabels = document.querySelectorAll('.plan__container')
		planLabels.forEach(label => {
			if (label !== selectedLabel) {
				label.classList.remove('selected')
			}
		})
	}, [formContext?.formData.plan])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		const { type } = formContext?.formData ?? { type: '' }
		const price = prices[value as keyof typeof prices][type as keyof Price]
		formContext?.updateFormData({ ...formContext?.formData, [name]: value, price })
	}

	const handleToggle = () => {
		const { plan, type } = formContext?.formData ?? { plan: '', type: '' }
		const newType = type === 'monthly' ? 'yearly' : 'monthly'
		const price = prices[plan][newType]
		formContext?.updateFormData({ ...formContext?.formData, type: newType, price, addOns: {} })
	}

	return (
		<>
			<div className='form__header'>
				<h1 className='form__title'>Pilih Kategori</h1>
				<p className='form__description'>Silakan Pilih Kategori Yang Cocok Dengan Anda</p>
			</div>
			<div className='form__body'>
				<div className='plan'>
					{Object.keys(prices).map(plan => (
						<label htmlFor={plan.toLowerCase()} className='plan__container' key={plan}>
							<input
								type='radio'
								id={plan.toLowerCase()}
								className='plan__radios'
								name='plan'
								value={plan}
								onChange={handleInputChange}
							/>
							<img
								className='plan__icon'
								id={`${plan.toLowerCase()}Img`}
								alt={`${plan} Icon`}
								src={prices[plan].image}
							/>
							<div className='plan__text'>
								<h2 className='plan__title'>{plan}</h2>
							</div>
						</label>
					))}
				</div>
			</div>
			<div className='form__footer'>
				<Link className='form__prev-page' to={'/'}>
					Go Back
				</Link>
				<div className='form__spacer'></div>
				<Link to={'/addons'}>
					<button className='form__next-page'>Next Step</button>
				</Link>
			</div>
		</>
	)
}

export default FormPlan
