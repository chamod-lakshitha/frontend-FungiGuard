import React, { useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

import '../styles/result.style.scss';

function Result(props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.showLoader) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 10000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [props.showLoader]);

  return (
    <div className="mt-3 mb-4">
      <div className="container result__outer">
        <h2 className="text-center fw-bold result__header mb-3">
          Prediction&nbsp;
          <span className="result__span">Results</span>
        </h2>
        <p className="text-center" style={{ height: '30px' }}>
          {console.log(props)}
          {props.showLoader === false ? (
            'Undergo a prediction to get the edibility results.'
          ) : isLoading || !props.predicted ? (
            <ScaleLoader
              height={20}
              cssOverride={{ display: 'inline-block' }}
            />
          ) : props.response.prediction === 'True' ? (
            `Mushroom type is ${props.response.result}.`
          ) : (
            'Error some thing happens. Please try again later.' + props.response
          )}
        </p>
      </div>
      <div className="container explanation__outer">
        <div className="explanation__inner">
          {props.imageData && (
            <div className="results__outer">
              <div className="image__container">
                <h3 className="mb-3">Generated Explanation Image</h3>
                <img
                  src={`data:image/png;base64,${props.imageData}`}
                  alt="Explanation Visualization"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
              <table
                border="1"
                class="table table-striped feature__value__table"
              >
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {props.featureValues.map(([feature, value], index) => (
                    <tr key={index}>
                      <td>{feature}</td>
                      <td>{value.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
