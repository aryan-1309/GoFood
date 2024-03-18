import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import axios from 'axios'

function Home() {

  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/foodData');
      // console.log(response.data); 
      setFoodItem(response.data[0]);
      setFoodCat(response.data[1]);
    } catch (error) {
      console.error('Error loading data:', error.message);
    }
  };

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div> <Navbar /></div>
      {/*Crousel starts here*/}
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </form>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?cake" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/*Cards functionality starts here*/}
      <div className='container'>
        {
          foodCat !== [] ? foodCat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                  return (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'><Card fooditems={filterItems}></Card></div>
                  )
                }) : <div>No Usch Data Found</div>}
              </div>
            )
          }) : ""
        }
      </div>

      <div><Footer /></div>
    </div>
  )
}

export default Home