import React, { useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

import '../styles/result.style.scss';

function Result(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [explanationType, setExplanationType] = useState(null);

  // Handle loader visibility when prediction starts
  useEffect(() => {
    if (props.showLoader) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [props.showLoader]);

  // Handle LIME explanation request
  const handleLIMEExplanation = (event) => {
    event.preventDefault();
    setExplanationType('LIME');
    props.fetchExplanationLIME(event);
  };

  // Handle SHAP explanation request
  const handleSHAPExplanation = (event) => {
    event.preventDefault();
    setExplanationType('SHAP');
    props.fetchExplanationSHAP(event);
  };

  return (
    <div className="mt-3 mb-4">
      <div className="container result__outer">
        <h2 className="text-center fw-bold result__header mb-3">
          Prediction&nbsp;
          <span className="result__span">Results</span>
        </h2>
        <div className="text-center" style={{ height: 'max-content' }}>
          {console.log(props)}
          {props.showLoader === false ? (
            'Undergo a prediction to get the edibility results.'
          ) : isLoading || !props.predicted ? (
            <ScaleLoader
              height={20}
              cssOverride={{ display: 'inline-block' }}
            />
          ) : props.response.prediction === 'True' ? (
            <>
              <p>{`Mushroom type is ${props.response.result}.`}</p>
              <button
                type="submit"
                ref={props.explanationRef}
                className="btn btn-outline-success mx-3"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  marginTop: '-5px',
                  marginBottom: '15px',
                }}
                onClick={(event) => handleLIMEExplanation(event)}
              >
                Generate LIME Report
              </button>
              <button
                type="submit"
                ref={props.explanationRef}
                className="btn btn-outline-success mx-3"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  marginTop: '-5px',
                  marginBottom: '15px',
                }}
                onClick={(event) => handleSHAPExplanation(event)}
              >
                Generate SHAP Report
              </button>
            </>
          ) : (
            'Error some thing happens. Please try again later.' + props.response
          )}
        </div>
      </div>
      <div className="container explanation__outer">
        <div className="explanation__inner">
          {props.imageData && (
            <div className="results__outer">
              <div
                className="image__container"
                style={{
                  width: explanationType === 'SHAP' ? '75%' : '57%',
                  textAlign: explanationType === 'SHAP' ? 'center' : '',
                  margin: 'auto',
                }}
              >
                <h3 className="mb-3 explanation__header">
                  Generated Explanation&nbsp;
                  {explanationType === 'LIME' ? 'LIME' : 'SHAP'} Image
                </h3>
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
              {/* Render feature importance table for LIME explanations */}
              {explanationType === 'LIME' && props.featureValues && (
                <table
                  border="1"
                  className="table table-striped feature__value__table"
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
