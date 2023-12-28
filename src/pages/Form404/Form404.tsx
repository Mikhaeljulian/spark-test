import React from 'react'
import { Link } from 'react-router-dom'

const Form404: React.FC = () => {
	return (
		<div className='form__body'>
			<div className='failed'>
				<h2 className='failed__title'>Oops! Something went wrong.</h2>
				<p className='failed__text'>
					We apologize, but an error occurred during the submission of your Simulasi Input Spark. Please try again later or
					contact our support team for assistance.
				</p>
				<Link className='failed__link' to={'/'}>
					Go back
				</Link>
			</div>
		</div>
	)
}

export default Form404
