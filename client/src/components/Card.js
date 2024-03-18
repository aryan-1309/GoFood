import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {addItem} from '../utils/cartSlice'

const Card = (props) => {

    let options = props.fooditems.options[0];
    let priceOptions = Object.keys(options)

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("half")

    const dispatch = useDispatch();

    const haldleAddToCart = (item) => {
        //Dispatch and Action
        dispatch(addItem(item))
    }

    let finalPrice = qty * parseInt(options[size]);  

    return (
        <div>
            <div>
                <div className="card m-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.fooditems.img} className="card-img-top" style={{ height: 200, objectFit: 'fill' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooditems.name}</h5>
                        {/* <p className="card-text">Food details written here</p> */}
                        <div className='container w-100'>

                            <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className='btn btn-success justify-center ms-2' onClick={()=>haldleAddToCart([props.fooditems,size,qty])}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card