import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem,clearCart } from '../utils/cartSlice'
import { Trash2 } from 'lucide-react';

function Cart() {

    const dispatch = useDispatch()
    let cartItems = useSelector((store) => store.cart.items)

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
                            <button className='btn bg-success mt-5 px-4' style={{ marginLeft: '40px'}}>Check Out</button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Cart