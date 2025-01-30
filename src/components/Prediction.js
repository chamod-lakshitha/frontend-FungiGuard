import React, { useState, useEffect, useRef } from 'react';
import '../styles/prediction.style.scss';
import { optionsData } from '../assets/data/OptionData';
import RenderSelect from './helpers/RenderSelect';
import RenderInput from './helpers/RenderInput';
import { CiWarning } from 'react-icons/ci';
import axios from 'axios';
import Result from './Result';

function Prediction() {
  const optionData = optionsData;

  const clearRef = useRef(null);
  const predictRef = useRef(null);
  const explanationRef = useRef(null);

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    capShape: '',
    capSurface: '',
    capColor: '',
    gillAttachment: '',
    gillColor: '',
    stemColor: '',
    ringType: '',
    capDiameter: '',
    stemHeight: '',
    stemWidth: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [predicted, setPredicted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [response, setResponse] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [showLoader, setShowLoader] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [imageData, setImageData] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [predictionData, setPredictionData] = useState(null);
  const [featureValues, setFeatureValues] = useState(null);

  const predictEdibility = async () => {
    console.log('inside axios');
    setDisabled(true);
    const mushroomFeatures = {
      capDiameter: Number(formData.capDiameter),
      capShape: Number(formData.capShape),
      capSurface: Number(formData.capSurface),
      capColor: Number(formData.capColor),
      doesBruiseOrBleed: 0,
      gillAttachment: Number(formData.gillAttachment),
      gillSpacing: 0,
      gillColor: Number(formData.gillColor),
      stemHeight: Number(formData.stemHeight),
      stemWidth: Number(formData.stemWidth),
      stemColor: Number(formData.stemColor),
      hasRing: 0,
      ringType: Number(formData.ringType),
      habitat: 0,
      season: 0,
    };

    try {
      const res = await axios.post(
        'http://127.0.0.1:5000/api/v1/predict',
        mushroomFeatures
      );
      // predictRef.current.disabled = true;
      explanationRef.current.disabled = false;
      setPredicted(true);
      setResponse(res.data);
      setPredictionData(res.data.inputs);
      console.log('Response:', res.data);
    } catch (error) {
      setPredicted(true);
      setResponse({ prediction: 'False' });
      console.error('Error during POST request:', error);
    }
  };

  const fetchExplanation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/explain',
        predictionData
      );
      setImageData(response.data.image_data);
      setFeatureValues(response.data.feature_values);
    } catch (error) {
      console.error('Error fetching explanation:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const clearInputs = () => {
    predictRef.current.disabled = false;
    explanationRef.current.disabled = true;
    setDisabled(false);
    setPredictionData(null);
    setImageData(null);
    setShowLoader(false);
    setFormData({
      capShape: '',
      capSurface: '',
      capColor: '',
      gillAttachment: '',
      gillColor: '',
      stemColor: '',
      ringType: '',
      capDiameter: '',
      stemHeight: '',
      stemWidth: '',
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPredicted(false);
    setError('');
    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ''
    );
    if (!allFieldsFilled) {
      setError(
        <>
          <CiWarning />
          Please fill in all fields before submitting.
        </>
      );
      return;
    }
    setShowLoader(true);
    console.log('Form submitted successfully:', formData);
    predictEdibility();
  };

  useEffect(() => {
    explanationRef.current.disabled = true;
  }, []);

  return (
    <>
      <div className="prediction__outer pb-2">
        <div className="container w-100 my-4 pt-1 prediction__inner">
          <h2 className="text-center fw-bold prediction__header">
            Predict&nbsp;
            <span className="prediction__span">Mushroom Edibility</span>
          </h2>
          <div className="container mt-4 form__outer">
            <form>
              <h2 className="text-center mb-4">Feature Information Form 🍄</h2>
              <div className="row mb-3">
                <RenderSelect
                  id="capShape"
                  label="Cap-Shape"
                  optionData={optionData.capShape}
                  value={formData.capShape}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <RenderSelect
                  id="capSurface"
                  label="Cap-Surface"
                  optionData={optionData.capSurface}
                  value={formData.capSurface}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>
              <div className="row mb-3">
                <RenderSelect
                  id="capColor"
                  label="Cap-Color"
                  optionData={optionData.capColor}
                  value={formData.capColor}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <RenderSelect
                  id="gillAttachment"
                  label="Gill-Attachment"
                  optionData={optionData.gillAttachment}
                  value={formData.gillAttachment}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>
              <div className="row mb-3">
                <RenderSelect
                  id="gillColor"
                  label="Gill-Color"
                  optionData={optionData.gillColor}
                  value={formData.gillColor}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <RenderSelect
                  id="stemColor"
                  label="Stem-Color"
                  optionData={optionData.stemColor}
                  value={formData.stemColor}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>
              <div className="row mb-3">
                <RenderSelect
                  id="ringType"
                  label="Ring-Type"
                  optionData={optionData.ringType}
                  value={formData.ringType}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <RenderInput
                  id="capDiameter"
                  label="Cap-Diameter"
                  value={formData.capDiameter}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>
              <div className="row mb-3">
                <RenderInput
                  id="stemHeight"
                  label="Stem-Height"
                  value={formData.stemHeight}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <RenderInput
                  id="stemWidth"
                  label="Stem-Width"
                  value={formData.stemWidth}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>
              {error && (
                <p className="text-danger text-center d-flex align-items-center justify-content-center">
                  {error}
                </p>
              )}
              <div className="d-flex justify-content-center button__outer">
                <button
                  type="button"
                  ref={clearRef}
                  className="btn btn-outline-danger mx-3"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                  onClick={clearInputs}
                >
                  Clear Fields (New Prediction)
                </button>
                <button
                  type="submit"
                  ref={predictRef}
                  className="btn btn-outline-success mx-3"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                  onClick={handleSubmit}
                >
                  Predict Edibility
                </button>
                <button
                  type="submit"
                  ref={explanationRef}
                  className="btn btn-outline-success mx-3"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                  onClick={fetchExplanation}
                >
                  Generate Explanation Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Result
        showLoader={showLoader}
        predicted={predicted}
        response={response}
        imageData={imageData}
        featureValues={featureValues}
      />
    </>
  );
}

export default Prediction;
