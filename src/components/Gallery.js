import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Gallery() {
  // useEffect hook to initialize AOS animations on component mount
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="container mt-5"
      style={{ overflow: 'hidden' }}
    >
      {/* Row container for the gallery cards */}
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {/* First card with a fade-right animation */}
        <div className="col" data-aos="fade-right" data-aos-duration="500">
          <div className="card">
            <img
              src={require('../assets/cover_mushroom.jpg')}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Edible Insights</h5>
              <p className="card-text">
                Unlock the mystery of mushrooms with expert identification tools
                for safe and informed harvesting.
              </p>
            </div>
          </div>
        </div>
        {/* Second card with a fade-up animation */}
        <div className="col" data-aos="fade-up" data-aos-duration="500">
          <div className="card">
            <img
              src={require('../assets/cover_mushroom.png')}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Mushroom Mentor</h5>
              <p className="card-text">
                Your AI-powered companion for distinguishing between edible and
                toxic mushrooms.
              </p>
            </div>
          </div>
        </div>
        {/* Third card with a fade-left animation */}
        <div className="col" data-aos="fade-left" data-aos-duration="500">
          <div className="card">
            <img
              src={require('../assets/cover_mushroom2.jpg')}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Fungi Finder</h5>
              <p className="card-text">
                Discover the world of mushrooms with precision and ease,
                tailored for farmers and mycologists alike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
