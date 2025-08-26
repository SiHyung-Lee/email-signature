import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PhoneWrapper = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PhoneInputField = styled.input`
  width: 88px;
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.error ? "#FF4D4F" : "#DFE1E5")};
  border-radius: 8px;
  text-align: center;
  font-size: 15px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #5383e8;
    box-shadow: 0 0 0 3px rgba(83, 131, 232, 0.15);
  }
`;

const PHONE_PREFIX_OPTIONS = [
  { value: "010", label: "010" },
  { value: "011", label: "011" },
  { value: "016", label: "016" },
  { value: "017", label: "017" },
  { value: "018", label: "018" },
  { value: "019", label: "019" },
];

const PhoneSelectField = styled.select`
  width: 88px;
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.error ? "#FF4D4F" : "#DFE1E5")};
  border-radius: 8px;
  text-align: center;
  font-size: 15px;
  transition: all 0.2s ease;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 30px;

  &:focus {
    outline: none;
    border-color: #5383e8;
    box-shadow: 0 0 0 3px rgba(83, 131, 232, 0.15);
  }
`;

const Separator = styled.span`
  color: #adb5bd;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 13px;
  margin-top: 6px;
`;

const getNumericValue = (value) => value.replace(/[^\d]/g, "");

export const PhoneInput = memo(({ value, onChange, error }) => {
  const handleChange = (part, e) => {
    if (part === "middle" || part === "last") {
      const newValue = getNumericValue(e.target.value);
      onChange(part, newValue);
    } else {
      onChange(part, e.target.value);
    }
  };

  return (
    <PhoneWrapper>
      <Label>
        연락처 <span style={{ color: "#dc3545" }}>*</span>
      </Label>
      <InputGroup>
        <PhoneSelectField
          value={value.first}
          onChange={(e) => onChange("first", e.target.value)}
          error={error}
          aria-label="전화번호 앞자리">
          {PHONE_PREFIX_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </PhoneSelectField>
        <Separator>-</Separator>
        <PhoneInputField
          type="text"
          value={value.middle}
          onChange={(e) => handleChange("middle", e)}
          maxLength={4}
          error={error}
          aria-label="전화번호 중간자리"
        />
        <Separator>-</Separator>
        <PhoneInputField
          type="text"
          value={value.last}
          onChange={(e) => handleChange("last", e)}
          maxLength={4}
          error={error}
          aria-label="전화번호 끝자리"
        />
      </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </PhoneWrapper>
  );
});

PhoneInput.propTypes = {
  value: PropTypes.shape({
    first: PropTypes.string.isRequired,
    middle: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

PhoneInput.displayName = "PhoneInput";
