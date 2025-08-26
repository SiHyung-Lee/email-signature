/**
 * 이메일 유효성 검사 함수
 * @param {string} email - 검사할 이메일 문자열
 * @returns {boolean} 유효성 검사 결과
 */
export const validateEmail = (email) => {
  // 빈 문자열 체크
  if (!email) return false;

  // 특수문자와 알파벳, 숫자만 허용
  const emailRegex = /^[a-zA-Z0-9._-]+$/;
  return emailRegex.test(email);
};

/**
 * 전화번호 유효성 검사 함수
 * @param {string} phone - 검사할 전화번호 문자열 (000-0000-0000 형식)
 * @returns {boolean} 유효성 검사 결과
 */
export const validatePhone = (phone) => {
  // 빈 문자열 체크
  if (!phone) return false;

  // 전화번호 형식 체크 (000-0000-0000)
  const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

  // 하이픈이 포함된 전화번호 형식 체크
  if (!phoneRegex.test(phone)) return false;

  // 하이픈 제거 후 숫자만 남았는지 체크
  const digitsOnly = phone.replace(/-/g, "");
  return /^\d+$/.test(digitsOnly);
};

/**
 * 한글 이름 유효성 검사 함수
 * @param {string} name - 검사할 한글 이름
 * @returns {boolean} 유효성 검사 결과
 */
export const validateKoreanName = (name) => {
  // 빈 문자열 체크
  if (!name) return false;

  // 한글과 공백만 포함되어 있는지 체크
  const koreanNameRegex = /^[가-힣\s]+$/;
  return koreanNameRegex.test(name);
};

/**
 * 영문 이름 유효성 검사 함수
 * @param {string} name - 검사할 영문 이름
 * @returns {boolean} 유효성 검사 결과
 */
export const validateEnglishName = (name) => {
  // 빈 문자열 체크
  if (!name) return false;

  // 영문과 공백만 포함되어 있는지 체크
  const englishNameRegex = /^[a-zA-Z\s]+$/;
  return englishNameRegex.test(name);
};
