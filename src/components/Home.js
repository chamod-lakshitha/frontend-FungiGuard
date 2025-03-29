import React, { useState } from 'react';
import Header from './Header';
import Info from './Info';
import Gallery from './Gallery';
import Prediction from './Prediction';
import History from './History';
import Footer from './Footer';

function Home() {
  // State to trigger fetching prediction history
  const [triggerFetch, setTriggerFetch] = useState(false);

  // Function to toggle the fetch state when prediction is submitted
  const handlePredictionSubmit = () => {
    setTriggerFetch((prev) => !prev); // Toggle the state to trigger fetch for history
  };

  return (
    <>
      {/* Header component */}
      <Header />
      {/* Info section explaining the importance of mushroom edibility prediction */}
      <Info />
      {/* Gallery section (for displaying images or related content) */}
      <Gallery />
      {/* Prediction component with a callback to handle prediction submission */}
      <Prediction onPredictionSubmit={handlePredictionSubmit} />
      {/* History section that fetches data when 'triggerFetch' state changes */}
      <History triggerFetch={triggerFetch} />
      <Footer />
    </>
  );
}

export default Home;
