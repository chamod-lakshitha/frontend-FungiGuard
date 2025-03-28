import React from 'react';

function RenderInput(props) {
  return (
    <div className="col-12 col-md-6 mb-3 mb-md-0">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <div data-bs-toggle="tooltip" title={props.tooltip}>
        <input
          type={props.type}
          className="form-control"
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          required
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default RenderInput;
