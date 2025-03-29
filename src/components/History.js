import React, { useState, useEffect } from 'react';
import { optionsData } from '../assets/data/OptionData';
import axios from 'axios';
import '../styles/history.styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

function History({ triggerFetch }) {
  // State to store fetched history data
  const [historyData, setHistoryData] = useState([]);

  // Initialize AOS (Animate On Scroll) library for animations
  useEffect(() => {
    AOS.init({ duration: 850 });
  }, []);

  // Fetch history data when 'triggerFetch' changes
  useEffect(() => {
    let isMounted = true; // Track if component is still mounted before updating state

    if (triggerFetch || isMounted) {
      const fetchHistory = async () => {
        try {
          // Fetch past predictions from backend API
          const response = await axios.post(
            'http://localhost:5000/api/v1/past_predictions',
            {
              userId: localStorage.getItem('userUID'), // Get user ID from local storage
            }
          );
          setHistoryData(response.data.past_predictions); // Update state with fetched data
          console.log(response.data.past_predictions); // Log the fetched data for debugging
        } catch (error) {
          console.error('Error fetching past predictions:', error); // Handle error during fetch
        }
      };

      fetchHistory(); // Call the function to fetch data
    }
    // Cleanup function to prevent memory leaks if component unmounts
    return () => {
      isMounted = false;
    };
  }, [triggerFetch]); // Dependency array to re-fetch history when 'triggerFetch' changes

  return (
    <div data-aos="fade-up" className="history__outer pb-2 id" id="history">
      <div className="container w-100 my-4 pt-1 history__inner">
        <h2 className="text-center fw-bold history__header">
          View&nbsp;
          <span className="history__span">Past Predictions</span>
        </h2>
        {
          <div>
            {historyData.length === 0 ? (
              // Display a message if no past history is available
              <p className="text-center">No past history available</p>
            ) : (
              <div
                className="table-responsive"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                {/* Table displaying the prediction history */}
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Prediction Date</th>
                      <th>Cap Shape</th>
                      <th>Cap Surface</th>
                      <th>Cap Color</th>
                      <th>Gill Attachment</th>
                      <th>Gill Color</th>
                      <th>Stem Color</th>
                      <th>Ring Type</th>
                      <th>Cap Diameter</th>
                      <th>Stem Height</th>
                      <th>Stem Width</th>
                      <th>Value</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Loop through each prediction and display it */}
                    {historyData.map((prediction, index) => (
                      <tr key={index}>
                        <td>{prediction.predictionDate}</td>
                        <td>
                          {
                            optionsData.capShape.find(
                              (item) =>
                                item.value === prediction.capShape.toString()
                            ).label
                          }
                        </td>
                        <td>
                          {
                            optionsData.capSurface.find(
                              (item) =>
                                item.value === prediction.capSurface.toString()
                            ).label
                          }
                        </td>
                        <td>
                          {
                            optionsData.capColor.find(
                              (item) =>
                                item.value === prediction.capColor.toString()
                            ).label
                          }
                        </td>
                        <td>
                          {
                            optionsData.gillAttachment.find(
                              (item) =>
                                item.value ===
                                prediction.gillAttachment.toString()
                            ).label
                          }
                        </td>
                        <td>
                          {
                            optionsData.gillColor.find(
                              (item) =>
                                item.value === prediction.gillColor.toString()
                            ).label
                          }
                        </td>
                        <td>
                          {
                            optionsData.stemColor.find(
                              (item) =>
                                item.value === prediction.stemColor.toString()
                            ).label
                          }
                        </td>
                        <td>
                          {
                            optionsData.ringType.find(
                              (item) =>
                                item.value === prediction.ringType.toString()
                            ).label
                          }
                        </td>
                        <td>{prediction.capDiameter}</td>
                        <td>{prediction.stemHeight}</td>
                        <td>{prediction.stemWidth}</td>
                        <td>{prediction.value}</td>
                        <td>{prediction.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default History;
