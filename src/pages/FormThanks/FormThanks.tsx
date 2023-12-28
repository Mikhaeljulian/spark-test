import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormContext } from '../../contexts/FormContext'
import completion from '../../assets/images/icon-thank-you.svg'

const FormThanks: React.FC = () => {
	const formContext = useContext(FormContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!formContext?.formData?.fullName || !formContext?.formData?.budgetMinimum || !formContext?.formData?.budgetMaksimum) {
			navigate('/')
		}
	}, [formContext?.formData?.fullName, formContext?.formData?.budgetMinimum, formContext?.formData?.budgetMaksimum, navigate])

	return (
		<div className='form__body'>
			<div className='gratitude'>
				<img className='gratitude__icon' id='completionImg' src={completion} alt='Order placed' aria-hidden='true' />
				<h2 className='gratitude__title'>Thank you!</h2>
				<p className='gratitude__text'>
					Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support,
					please feel free to email us at thiomikael@gmail.com.
				</p>
			</div>
		</div>
	)
}

export default FormThanks
