import React, { useState, useEffect } from 'react';
import { optionsData } from '../assets/data/OptionData';
import axios from 'axios';
import '../styles/history.styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

function History({ triggerFetch }) {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 850 });
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (triggerFetch || isMounted) {
      const fetchHistory = async () => {
        try {
          const response = await axios.post(
            'http://localhost:5000/api/v1/past_predictions',
            {
              userId: localStorage.getItem('userUID'),
            }
          );
          setHistoryData(response.data.past_predictions);
          console.log(response.data.past_predictions);
        } catch (error) {
          console.error('Error fetching past predictions:', error);
        }
      };

      fetchHistory();
    }
    return () => {
      isMounted = false;
    };
  }, [triggerFetch]);

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
              <p className="text-center">No past history available</p>
            ) : (
              <div
                className="table-responsive"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
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
