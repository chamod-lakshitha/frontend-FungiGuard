import React, { useState, useEffect, useRef } from 'react';
import '../styles/prediction.style.scss';
import { optionsData } from '../assets/data/OptionData';
import RenderSelect from './helpers/RenderSelect';
import RenderInput from './helpers/RenderInput';
import { CiWarning } from 'react-icons/ci';
import axios from 'axios';
import Result from './Result';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Prediction({ onPredictionSubmit }) {
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
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 850 }); // Initialize AOS animations
  }, []);

  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach(
      (tooltip) => new window.bootstrap.Tooltip(tooltip)
    );
  }, []);

  // Predict edibility according to the input data
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
      userId: localStorage.getItem('userUID'),
    };

    try {
      const res = await axios.post(
        'http://127.0.0.1:5000/api/v1/predict',
        mushroomFeatures
      );
      setPredicted(true); // Set predicted to true
      setResponse(res.data); // Set the response
      setPredictionData(res.data.inputs); // Set the prediction data
      setTriggerFetch(true); // Trigger the history fetch
      console.log('Response:', res.data);
    } catch (error) {
      setPredicted(true); // Set predicted to true
      setResponse({ prediction: 'False' }); // Set the response
      console.error('Error during POST request:', error); // Log the error
    }
  };

  // Fetch explanation LIME
  const fetchExplanationLIME = async (e) => {
    setImageData('');
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/explain_LIME',
        predictionData
      );
      setImageData(response.data.image_data); // Set the image data
      setFeatureValues(response.data.feature_values); // Set the feature values
    } catch (error) {
      console.error('Error fetching explanation:', error); // Log the error
    }
  };

  // Fetch explanation SHAP
  const fetchExplanationSHAP = async (e) => {
    setImageData('');
    e.preventDefault();
    console.log('shap called');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/explain_SHAP',
        predictionData
      );
      setImageData(response.data.image_data); // Set the image data
    } catch (error) {
      console.error('Error fetching explanation:', error); // Log the error
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Set the corresponding field in formData
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Clear inputs
  const clearInputs = () => {
    predictRef.current.disabled = false;
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

  // Handle form submission
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
    if (
      Number(formData.capDiameter) < 0 ||
      Number(formData.stemHeight) < 0 ||
      Number(formData.stemWidth) < 0
    ) {
      setError(
        <>
          <CiWarning />
          &nbsp;Cap Diameter, Stem Height and Stem Width cannot be negative.
        </>
      );
      return;
    }
    setShowLoader(true);
    console.log('Form submitted successfully:', formData);
    predictEdibility();
  };

  useEffect(() => {
    if (triggerFetch) {
      onPredictionSubmit();
      setTriggerFetch(false);
    }
  }, [triggerFetch, onPredictionSubmit]);

  return (
    <>
      <div
        data-aos="fade-up"
        className="prediction__outer pb-2 id"
        id="prediction"
      >
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
                  tooltip="The shape of the mushroom cap"
                />
                <RenderSelect
                  id="capSurface"
                  label="Cap-Surface"
                  optionData={optionData.capSurface}
                  value={formData.capSurface}
                  onChange={handleChange}
                  disabled={disabled}
                  tooltip="The surface texture of the mushroom cap"
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
                  tooltip="The color of the mushroom cap"
                />
                <RenderSelect
                  id="gillAttachment"
                  label="Gill-Attachment"
                  optionData={optionData.gillAttachment}
                  value={formData.gillAttachment}
                  onChange={handleChange}
                  disabled={disabled}
                  tooltip="How the mushroom gills are attached to the stem"
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
                  tooltip="The color of the gills underneath the mushroom cap"
                />
                <RenderSelect
                  id="stemColor"
                  label="Stem-Color"
                  optionData={optionData.stemColor}
                  value={formData.stemColor}
                  onChange={handleChange}
                  disabled={disabled}
                  tooltip="The color of the mushroom stem"
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
                  tooltip="The type of ring on the mushroom stem"
                />
                <RenderInput
                  type="number"
                  id="capDiameter"
                  label="Cap-Diameter"
                  value={formData.capDiameter}
                  onChange={handleChange}
                  disabled={disabled}
                  tooltip="The diameter of the mushroom cap in cm"
                />
              </div>
              <div className="row mb-3">
                <RenderInput
                  type="number"
                  id="stemHeight"
                  label="Stem-Height"
                  value={formData.stemHeight}
                  onChange={handleChange}
                  disabled={disabled}
                  tooltip="The height of the mushroom stem in cm"
                />
                <RenderInput
                  type="number"
                  id="stemWidth"
                  label="Stem-Width"
                  value={formData.stemWidth}
                  onChange={handleChange}
                  disabled={disabled}
                  tooltip="The width of the mushroom stem in cm"
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
        explanationRef={explanationRef}
        fetchExplanationLIME={fetchExplanationLIME}
        fetchExplanationSHAP={fetchExplanationSHAP}
      />
    </>
  );
}

export default Prediction;
