import React from 'react';

function RenderSelect(props) {
  return (
    <div className="col-12 col-md-6 mb-3 mb-md-0">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <div data-bs-toggle="tooltip" title={props.tooltip}>
        <select
          className="form-select"
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          required
          disabled={props.disabled}
        >
          <option value="" disabled>
            Choose an option...
          </option>
          {/* Mapping through the options array passed as props */}
          {props.optionData.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default RenderSelect;
