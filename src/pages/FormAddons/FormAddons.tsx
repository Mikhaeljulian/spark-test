import React from 'react'
import { useState,useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormContext } from '../../contexts/FormContext'

interface AddonData {
	title: string
	details: string
	monthly: string
}

const addonsData: { [key: string]: AddonData } = {
	paket_a: {
		title: 'Paket Spark A',
		details: 'Nanti ini buat detail',
		monthly: '100/k',
	},
	paket_b: {
		title: 'Paket Spark B',
		details: 'Nanti ini buat detail',
		monthly: '200/k',
	},
	paket_c: {
		title: 'Paket Spark C',
		details: 'nanti ini buat detail',
		monthly: '300/k',
	},
}

const FormAddons = (): JSX.Element => {
	const formContext = useContext(FormContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!formContext?.formData?.fullName || !formContext?.formData?.budgetMinimum || !formContext?.formData?.budgetMaksimum) {
			navigate('/')
		}
	}, [formContext?.formData?.fullName, formContext?.formData?.budgetMinimum, formContext?.formData?.budgetMaksimum, navigate])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = event.target
		const { title, monthly } = addonsData[value]
	  
		if (checked) {
		  const updatedAddOns = { ...formContext?.formData.addOns, [title]: monthly }
		  formContext?.updateFormData({ ...formContext?.formData, [name]: updatedAddOns })
		} else {
		  const { [title]: _, ...updatedAddOns } = formContext?.formData.addOns as Record<string, string>
		  formContext?.updateFormData({ ...formContext?.formData, [name]: updatedAddOns })
		}
	  }
	  

	return (
		<>
			<div className='form__header'>
				<h1 className='form__title'>Paket Tersedia</h1>
				<p className='form__description'>Berdasarkan Data Yang Di Inputkan Berikut Paket Yang Cocok Untukmu</p>
			</div>
			<div className='form__body'>
				<div className='addons'>
					{Object.keys(addonsData).map(key => {
						const addon = addonsData[key]
						return (
							<label
								htmlFor={key}
								className={`addon${
									formContext?.formData.addOns && formContext?.formData.addOns[addon.title] ? ' checked' : ''
								}`}
								key={key}>
								<input
									type='checkbox'
									id={key}
									className='addons__checkbox'
									name='addOns'
									value={key}
									onChange={handleInputChange}
									checked={formContext?.formData.addOns?.hasOwnProperty(addon.title)}
								/>
								<div className='addons__text'>
									<h2 className='addons__title'>{addon.title}</h2>
									<p className='addons__details'>{addon.details}</p>
									<p className='addons__price'>{addon.monthly}</p>
								</div>
								<p className='addons__price'>
									{formContext?.formData.type === 'monthly' }
								</p>
							</label>
						)
					})}
				</div>
			</div>
			<div className='form__footer'>
				<Link className='form__prev-page' to={'/plan'}>
					Go Back
				</Link>
				<div className='form__spacer'></div>
				<Link to='/summary'>
					<button className='form__next-page'>Next Step</button>
				</Link>
			</div>
		</>
	)
}

export default FormAddons
