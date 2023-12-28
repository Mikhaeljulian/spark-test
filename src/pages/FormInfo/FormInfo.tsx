import { useNavigate } from 'react-router-dom'
import React, { useState, useContext, ChangeEvent } from 'react'
import { FormContext } from '../../contexts/FormContext'


interface Errors {
    fullName: string
    budgetMinimum: string
    budgetMaksimum: string
    [key: string]: string
}

const FormInfo: React.FC = (): JSX.Element => {
    const formContext = useContext(FormContext)
    const navigate = useNavigate()

    const [errors, setErrors] = useState<Errors>({
        fullName: '',
        budgetMinimum: '',
        budgetMaksimum: '',
    })

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        const updatedFormData = {
            ...formContext?.formData,
            [name]: value,
        }
        formContext?.updateFormData(updatedFormData)
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }))
    }

    const validateField = (name: string, value: string): string => {
        if (!value) {
            return 'Bagian ini belum di-isi'
        }
        if (name === 'fullName') {
            if (!/^[A-Za-z ]+$/.test(value)) {
              return 'Nama hanya boleh mengandung huruf dan spasi';
            }
            if (value.length <= 2) {
              return 'Nama harus mengandung setidaknya 3 huruf';
            }
          }          
          if (name === 'budgetMinimum') {
            const numericValue = parseFloat(value.replace('Rp. ', '').replace('.', ''))
            if (isNaN(numericValue) || numericValue < 500000) {
                return 'Nominal minimal harus Rp. 500.000'
            }
        }
        
        if (name === 'budgetMaksimum') {
            const numericValue = parseFloat(value.replace('Rp. ', '').replace('.', ''))
            if (isNaN(numericValue) || numericValue <= 500000) {
                return 'Nominal maksimal harus lebih dari Rp. 500.000'
            }
        
            const budgetMinElement = document.getElementsByName('budgetMinimum')[0] as HTMLInputElement | undefined;
            if (budgetMinElement) {
                const minValue = parseFloat(budgetMinElement.value.replace('Rp. ', '').replace('.', ''))
                if (isNaN(minValue)) {
                    return 'Nilai minimal tidak valid';
                }
        
                if (numericValue <= minValue) {
                    return 'Nilai Kurang Dari Jumlah Minimum'
                }
            } else {
                return 'Elemen budgetMinimum tidak ditemukan';
            }
        }
        
        return ''
        
        
        
    }

    const validateFormInfo = (): boolean => {
        const { fullName, budgetMinimum, budgetMaksimum } = formContext?.formData || {}
        const newErrors: Errors = {
            fullName: validateField('fullName', fullName || ''),
            budgetMinimum: validateField('budgetMinimum', budgetMinimum || ''),
            budgetMaksimum: validateField('budgetMaksimum', budgetMaksimum || ''),
        }

        setErrors(newErrors)
        const errorValues = Object.keys(newErrors).map(key => newErrors[key])

        return errorValues.some(error => error !== '')
    }

    const handleNextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const hasErrors = validateFormInfo()
        if (!hasErrors) {
            navigate('/plan')
        }
    }

    return (
        <>
            <div className='form__header'>
                <h1 className='form__title'>Simulasi Spark Fashion Academy</h1>
                <p className='form__description'>Tolong isikan data yang diperlukan dibawah ini.</p>
            </div>
            <div className='form__body'>
                <div className='form-info'>
                    <label htmlFor='fullName' className='form-info__label'>
                        Nama
                        {errors.fullName && <div className='error-message'>{errors.fullName}</div>}
                    </label>
                    <input
                        type='text'
                        id='fullName'
                        className={`form-info__input ${errors.fullName ? 'error' : ''}`}
                        name='fullName'
                        placeholder='Contoh: Johanesv'
                        value={formContext?.formData?.fullName || ''}
                        onChange={handleInputChange}
                        aria-label='Full Name'
                        required
                    />

                    <label htmlFor='budgetMinimum' className='form-info__label'>
                        Budget Minimum
                        {errors.budgetMinimum && <div className='error-message'>{errors.budgetMinimum}</div>}
                    </label>
                    <input
                        type='text'
                        id='budgetMinimum'
                        className={`form-info__input ${errors.budgetMinimum ? 'error' : ''}`}
                        name='budgetMinimum'
                        placeholder='Contoh: Rp. 500.000'
                        value={formContext?.formData?.budgetMinimum || ''}
                        onChange={handleInputChange}
                        aria-label='Budget Minimum'
                        required
                    />

                    <label htmlFor='budgetMaksimum' className='form-info__label'>
                        Budget Maksimum
                        {errors.budgetMaksimum && <div className='error-message'>{errors.budgetMaksimum}</div>}
                    </label>
                    <input
                        type='text'
                        id='budgetMaksimum'
                        className={`form-info__input ${errors.budgetMaksimum ? 'error' : ''}`}
                        name='budgetMaksimum'
                        placeholder='Contoh: Rp. 1.000.000'
                        value={formContext?.formData?.budgetMaksimum || ''}
                        onChange={handleInputChange}
                        aria-label='Budget Maksimum'
                        required
                    />
                </div>
            </div>
            <div className='form__footer'>
                <div className='form__spacer'></div>
                <button className='form__next-page' onClick={handleNextPage}>
                    Next Step
                </button>
            </div>
        </>
    )
}

export default FormInfo
