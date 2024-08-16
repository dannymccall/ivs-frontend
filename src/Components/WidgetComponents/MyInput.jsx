import React from "react";
import "../../App.css";

export default function MyInput({
  value,
  onChange,
  className,
  type,
  name,
  min,
  max,
  disabled,
  focus,
  placeholder,
  style
}) {
  return (
    <>
      <input
        type={type}
        value={value}
        className={className}
        onChange={onChange}
        name={name}
        min={min}
        max={max}
        disabled={disabled}
        onFocus={focus}
        placeholder={placeholder}
        style={style}
      />
    </>
  );
}

export function MyLabel({ labelType, labelName, className }) {
  return (
    <label htmlFor={labelType} className={className} >
      {labelName}
    </label>
  );
}

export function MyButton({ buttonName, type, onClick, className, disabled, style }) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {buttonName}
    </button>
  );
}
