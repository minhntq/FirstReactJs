import React, { Component } from "react";
class Input extends Component {
  state = {};
  render() {
    const {
      inputRef,
      id,
      label,
      labelSize,
      frmField,
      err,
      errMessage,
      ...others
    } = this.props;
    const size = labelSize ? labelSize : 3;
    const classLeft = `col-sm-${size} col-form-label`;
    const classRight = `col-sm-${12 - size}`;
    const inputClass = `form-control ${err ? "is-invalid" : ""}`;
    return (
      <div className="form-group row my-2">
        <label htmlFor={id} className={classLeft}>
          {label}
        </label>
        <div className={classRight}>
          {/* <input id={id} className="form-control" {...others} /> */}
          {others["rows"] > 1 ? (
            <textarea
              ref={inputRef}
              id={id}
              className={inputClass}
              {...others}
              {...frmField}
            ></textarea>
          ) : (
            <input
              ref={inputRef}
              id={id}
              className={inputClass}
              {...others}
              {...frmField}
            />
          )}
          {err ? <div className="invalid-feedback">{errMessage}</div> : null}
        </div>
      </div>
    );
  }
}

export default Input;
