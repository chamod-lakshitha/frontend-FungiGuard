import React, { useState } from 'react';
import Header from './Header';
import Info from './Info';
import Gallery from './Gallery';
import Prediction from './Prediction';
import History from './History';
import Footer from './Footer';

function Home() {
  const [triggerFetch, setTriggerFetch] = useState(false);

  const handlePredictionSubmit = () => {
    setTriggerFetch((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Info />
      <Gallery />
      <Prediction onPredictionSubmit={handlePredictionSubmit} />
      <History triggerFetch={triggerFetch} />
      <Footer />
    </>
  );
}

export default Home;
