import React from 'react'

const Card = (props) => {

    let options = props.options;
    let priceOptions = Object.keys(options)

    const haldleAddToCart = () => {

    }

    return (
        <div>
            <div>
                <div className="card m-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.imgsrc} className="card-img-top" style={{ height: 200, objectFit: 'fill' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        {/* <p className="card-text">Food details written here</p> */}
                        <div className='container w-100'>

                            <select className='m-2 h-100 bg-success rounded'>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded'>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                Total Price
                            </div>
                        </div>
                        <hr/>
                        <button className='btn btn-success justify-center ms-2' onClick={haldleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card