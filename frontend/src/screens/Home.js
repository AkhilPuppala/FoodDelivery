import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const backendUrl = window.location.hostname === 'localhost' ? 
  'http://localhost:5000' : 
  'http://192.168.49.2:30010';


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState(""); // Define `search` state

  const loadData = async () => {
    let response = await fetch(`${backendUrl}/api/foodData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
      <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
      <div className="carousel-inner" id='carousel'>
        <div className='carousel-caption' style={{ zIndex: "10" }}>
          <div className="d-flex justify-content-center form-inline">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} // Update search state on input change
            />
            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
          </div>
        </div>
        <div className="carousel-item active">
          <img src="/burger.jpeg" className="d-block w-100" alt="Burger" style={{ filter: "brightness(30%)" }} />
        </div>
        <div className="carousel-item">
          <img src="free-photo-of-assorted-gourmet-neapolitan-pizzas-on-marble-table.jpeg" className="d-block w-100" alt="Placeholder 1" style={{ filter: "brightness(30%)" }} />
        </div>
        <div className="carousel-item">
          <img src="free-photo-of-meat-with-rice.jpeg" className="d-block w-100" alt="Placeholder 2" style={{ filter: "brightness(30%)" }} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
      </div>
      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => (
                <div className='row mb-3' key={data._id}>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem.length > 0 
                      ? foodItem
                          .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())) 
                          .map(filterItems => (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card foodItem={filterItems}
                                options={filterItems.options[0]}
                              />
                            </div>
                          ))
                      : <div>No Data Found</div>
                  }
                </div>
              ))
            : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  );
}
