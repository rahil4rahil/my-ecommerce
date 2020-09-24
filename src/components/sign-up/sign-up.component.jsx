import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.style.scss'

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const { displayName, email, password, confirmPassword } = this.state

        if (password !== confirmPassword) {
            alert('Password dont match')
            return
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName })
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (error) {
            console.log(error)
        }

    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={ this.handleSubmit } className="sign-up-form">
                    <FormInput
                        type='text'
                        name='displayName'
                        value={ displayName }
                        label='Display Name'
                        required
                        handleChange={ this.handleChange }
                    ></FormInput>
                    <FormInput
                        type='email'
                        name='email'
                        value={ email }
                        label='Email'
                        required
                        handleChange={ this.handleChange }
                    ></FormInput>
                    <FormInput
                        type='password'
                        name='password'
                        value={ password }
                        label='Password'
                        required
                        handleChange={ this.handleChange }
                    ></FormInput>
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={ confirmPassword }
                        label='Confirm Password'
                        required
                        handleChange={ this.handleChange }
                    ></FormInput>
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        ) 
    }
}

export default SignUp