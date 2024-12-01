import React from 'react';

export default function Carousel() {
  return (
    <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
      <div className="carousel-inner" id='carousel'>
        <div className='carousel-caption' style={{ zIndex: "10" }}>
          <form className="form-inline">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
          </form>
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
  );
}
