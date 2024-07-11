import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { removeItem,clearCart } from '../utils/cartSlice'
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { message } from 'antd';
import StripeCheckout from 'react-stripe-checkout';

function Cart() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let cartItems = useSelector((store) => store.cart.items)
    let user = useSelector((store)=> store.user.user)

    if (cartItems.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    let totalPrice = cartItems.reduce((total, food) => {
        let itemPrice = food[0].options[0][food[1]] * food[2];
        return total + itemPrice;
    }, 0);

    const handleDeleteBtn = (item) => {
        dispatch(removeItem(item))
    }

    const handleClearAll = () => {
        dispatch(clearCart())
    }

    const handleCheckOut = async (req, res) => { 
        try {
            let userEmail = user.data.data.email
            let data = {
                email : userEmail,
                order_data: cartItems,
                order_date: new Date().toString()
            }
            res = axios.post('http://localhost:5000/api/orderData', data) 
            dispatch(clearCart())
            navigate('/')

            message.success(`CheckOut Successfull!`)
        } catch (error) {
            console.log(error)
            res.send({message: `Handle checkout error`})  
        }
    }

    return (
        <div className='text-center m-1 p-10'>
            <h1 className='text-2xl font-bold'>Cart</h1>
            <div>
                <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                    <table className='table table-hover '>
                        <thead className=' text-success fs-4'>
                            <tr>
                                <th scope='col' >#</th>
                                <th scope='col' >Name</th>
                                <th scope='col' >Quantity</th>
                                <th scope='col' >Option</th>
                                <th scope='col' >Amount</th>
                                <th scope='col' >Remove</th>
                            </tr>
                        </thead>
                        <tbody>

                            {cartItems.map((food, index) => (
                                <tr>
                                    <th scope='row' >{index + 1}</th>
                                    <td >{food[0].name}</td>
                                    <td>{food[2]}</td>
                                    <td>{food[1]}</td>
                                    <td>{(food[0].options[0][food[1]] * food[2])}</td>
                                    <td ><button type="button" className="btn p-0" onClick={() => handleDeleteBtn(index)}><Trash2/></button> </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className='d-flex justify-content-between'>
                        <div className='m-3 p-4'>
                            <h1>Total Price: {totalPrice}/-</h1>
                        </div>
                        <div>
                            <button className='btn bg-danger mt-5 ml-2' onClick={handleClearAll}>Clear All</button>
                            <StripeCheckout
                                stripeKey={"pk_test_51PbHWXFjAScFsYZp0CKDbNhrDx6NQQb4N5A4K5RgJlpgFFEhcGi8mHnIS1eCaq3BHf5UbS6L6DS3FScjd0ZW70Ny00XO08wa4C"}
                                token={handleCheckOut}
                                amount={totalPrice * 100}
                                currency="INR"
                                name="Food Ordering App"
                                email={user.data.data.email}
                                billingAddress
                                shippingAddress
                                zipCode
                            >
                            <button className='btn bg-success mt-5 px-4' style={{ marginLeft: '40px'}} onClick={handleCheckOut}>Check Out</button>
                            </StripeCheckout>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart