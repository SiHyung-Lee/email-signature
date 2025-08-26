import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputWrapper = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.error ? "#FF4D4F" : "#DFE1E5")};
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #adb5bd;
  }

  &:focus {
    outline: none;
    border-color: #5383e8;
    box-shadow: 0 0 0 3px rgba(83, 131, 232, 0.15);
  }
`;

const Suffix = styled.span`
  margin-left: 12px;
  color: #666;
  font-size: 15px;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 13px;
  margin-top: 6px;
`;

/**
 * 입력 필드 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.label - 입력 필드 레이블
 * @param {string} props.value - 입력 필드 값
 * @param {Function} props.onChange - 값 변경 핸들러
 * @param {string} [props.error] - 오류 메시지
 * @param {boolean} [props.required] - 필수 여부
 * @param {string} [props.suffix] - 접미사
 * @param {string} [props.placeholder] - 플레이스홀더
 * @param {string} [props.type] - 입력 타입
 */
export const InputField = memo(({ label, value, onChange, error, required = false, suffix, placeholder, type = "text" }) => {
  return (
    <InputWrapper>
      <Label htmlFor={`input-${label}`}>
        {label}
        {required && <span style={{ color: "#dc3545" }}> *</span>}
      </Label>
      <InputContainer>
        <StyledInput
          id={`input-${label}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          aria-invalid={!!error}
          aria-required={required}
        />
        {suffix && <Suffix>{suffix}</Suffix>}
      </InputContainer>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    </InputWrapper>
  );
});

// PropTypes 정의
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  suffix: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

// 컴포넌트 이름 설정
InputField.displayName = "InputField";
