import React from 'react';
import "../SearchComponent.css";

type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type: string;
  options?: { label: string; value: string }[];
};

const SearchInputField: React.FC<InputFieldProps> = ({ value, onChange, label, type, options }) => {
  if (type === 'select' && options) {
    return (
      <>
        <label className="input-label">{label}</label>
        <select className="search-input" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  }

  return (
    <>
      <label className="input-label">{label}</label>
      <input
        className="search-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default SearchInputField;
