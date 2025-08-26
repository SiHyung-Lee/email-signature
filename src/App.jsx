import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { validateEmail, validatePhone, validateKoreanName, validateEnglishName } from "./utils/validation";
import { SignaturePreview } from "./components/SignaturePreview";
import { InputField } from "./components/InputField";
import { PhoneInput } from "./components/PhoneInput";
import logoImage from "./assets/logo.png";

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    background-color: #d0d3d4;
  }
  
  input, textarea, button, select {
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-border-radius: 0;
    border-radius: 0;
  }
  
  input {
    border: 1px solid #ccc;
  }
  
  /* iOS에서 input 요소의 기본 스타일 제거 */
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    -webkit-appearance: none;
    appearance: none;
  }
`;

// 스타일 컴포넌트
const Container = styled.form`
  font-family: "Pretendard-Regular", Arial, sans-serif;
  margin: 20px auto;
  max-width: 600px;
  padding: 32px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
`;

const TitleArea = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const Logo = styled.img`
  width: 110px;
  margin-left: 15px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-bottom: 12px;
  color: #1a1a1a;
  font-size: 28px;
  font-weight: 700;
`;

const Notice = styled.p`
  margin: 0;
  font-size: 15px;
  color: #666;
  line-height: 1.6;
`;

const FormSection = styled.div`
  margin-bottom: 32px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #5383e8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4876d6;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #e9ecef;
    color: #adb5bd;
    cursor: not-allowed;
    transform: none;
  }
`;

// 초기 폼 데이터
const initialFormData = {
  name: "",
  engName: "",
  department: "",
  job: "",
  phone: {
    first: "010",
    middle: "",
    last: "",
  },
  email: "",
};

// 헤더 컴포넌트
const Header = () => (
  <TitleArea>
    <Logo
      src={logoImage}
      alt="athome"
    />
    <Title>이메일 서명 생성기</Title>
    <Notice>
      아래 양식에 따라 입력하시면 회사 이메일 서명이 자동으로 생성됩니다.
      <br />
      <strong>팀을 제외한 모든 항목은 필수입니다.</strong>
    </Notice>
  </TitleArea>
);

// 폼 컴포넌트
const SignatureForm = ({ formData, errors, handleFormFieldChange, handlePhoneNumberChange }) => {
  // 입력 핸들러 - 필터링 없이 자유롭게 입력 가능
  const handleNameInput = (e) => {
    handleFormFieldChange("name", e.target.value);
  };

  const handleEngNameInput = (e) => {
    handleFormFieldChange("engName", e.target.value);
  };

  return (
    <FormSection>
      <InputField
        label="이름"
        value={formData.name}
        onChange={handleNameInput}
        error={errors.name}
        required
      />

      <InputField
        label="영문 이름"
        value={formData.engName}
        onChange={handleEngNameInput}
        error={errors.engName}
        required
      />

      <InputField
        label="팀"
        value={formData.department}
        onChange={(e) => handleFormFieldChange("department", e.target.value)}
        placeholder="소속 팀이 없는 경우 입력하지 마세요"
      />

      <InputField
        label="직무"
        value={formData.job}
        onChange={(e) => handleFormFieldChange("job", e.target.value)}
        error={errors.job}
        required
      />

      <PhoneInput
        value={formData.phone}
        onChange={handlePhoneNumberChange}
        error={errors.phone}
      />

      <InputField
        label="이메일"
        value={formData.email}
        onChange={(e) => handleFormFieldChange("email", e.target.value)}
        error={errors.email}
        required
        suffix="@athomecorp.com"
      />
    </FormSection>
  );
};

const App = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [signature, setSignature] = useState(null);

  // 폼 필드 변경 핸들러
  const handleFormFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 에러 상태 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // 전화번호 변경 핸들러
  const handlePhoneNumberChange = (part, value) => {
    setFormData((prev) => ({
      ...prev,
      phone: {
        ...prev.phone,
        [part]: value,
      },
    }));

    // 전화번호 에러 초기화
    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: null,
      }));
    }
  };

  // 폼 유효성 검사
  const validateSignatureForm = () => {
    const newErrors = {};

    // 필수 필드 검사
    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요";
    } else if (!validateKoreanName(formData.name)) {
      newErrors.name = "국문만 입력해주세요";
    }

    if (!formData.engName) {
      newErrors.engName = "영문 이름을 입력해주세요";
    } else if (!validateEnglishName(formData.engName)) {
      newErrors.engName = "영문만 입력해주세요";
    }

    if (!formData.job) newErrors.job = "직무를 입력해주세요";

    // 전화번호 검사
    const phoneNumber = `${formData.phone.first}-${formData.phone.middle}-${formData.phone.last}`;
    if (!validatePhone(phoneNumber)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다";
    }

    // 이메일 검사
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 서명 생성 핸들러
  const handleSignatureGeneration = (e) => {
    e.preventDefault();

    if (!validateSignatureForm()) {
      return;
    }

    setSignature(formData);
  };

  // 폼 초기화 핸들러
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSignature(null);
  };

  return (
    <>
      <GlobalStyle />
      <Container onSubmit={handleSignatureGeneration}>
        <Header />

        <SignatureForm
          formData={formData}
          errors={errors}
          handleFormFieldChange={handleFormFieldChange}
          handlePhoneNumberChange={handlePhoneNumberChange}
        />

        <Button type="submit">서명 생성하기</Button>

        <SignaturePreview data={signature} />
      </Container>
    </>
  );
};

export default App;
