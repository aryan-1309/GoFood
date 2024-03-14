import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, message } from 'antd'
import "../styles/Signup.css"

const Signup = () => {

    const navigate = useNavigate()

    const onFinishHandler = async (values) => {
        try {
            const res = await axios.post('http://localhost:5000/api/signup', values)
            if (res.data.success) {
                message.success("Register Successfully!")
                navigate('/login')
            }
            else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('Something went wrong while Signing Up...')
        }
    }

    return (
        <>
            <div className='form-container'>
                <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                    <h3 className='text-center'>Register Form</h3>
                    <Form.Item label="Name" name="name">
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label="Location" name="location">
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type='email' required />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type='password' required />
                    </Form.Item>
                    <button className='btn btn-primary' type="submit">Register</button>
                    <Link to='/login' className='ms-2'>Already a User ?</Link>
                </Form>
            </div>
        </>
    )
}

export default Signup