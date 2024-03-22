import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  
  const navigate = useNavigate()

  const onFinishHandler = async (values) => {
        try {
          const res = await axios.post('http://localhost:5000/api/login',values)
          if(res.data.success){
            localStorage.setItem("token",res.data.token)
            // localStorage.setItem("user_Email", res.data.email)
            message.success("Login Successfully!")
            navigate('/')
          }
          else{
            message.error(res.data.message)
          }
        } catch (error) {
          console.log(error)
          message.error("Something Went wrong While Loging In...")
        }
  }

  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
          <h3 className='text-center'>Sign In Form</h3>
          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>
          <button className='btn btn-primary' type="submit">Sign In</button>
          <Link to='/signup' className='ms-2'>Not a User?</Link>
        </Form>
      </div>
    </>
  )
}

export default Login