import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components 정의
const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  max-width: 600px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignatureOutput = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  white-space: pre-wrap;
  border-radius: 4px;
`;

const App = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [signature, setSignature] = useState('');

    const generateSignature = () => {
        const newSignature = `
    --
    ${name}
    ${department}

    Email: ${email}
    `;
        setSignature(newSignature);
    };

    return (
        <Container>
            <h1>메일 서명 자동 생성기</h1>

            <InputGroup>
                <Label>이름</Label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                />
            </InputGroup>

            <InputGroup>
                <Label>메일 아이디</Label>
                <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="메일 아이디를 입력하세요"
                />
            </InputGroup>

            <InputGroup>
                <Label>부서명</Label>
                <Input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="부서명을 입력하세요"
                />
            </InputGroup>

            <Button onClick={generateSignature}>서명 생성</Button>

            {signature && <SignatureOutput>{signature}</SignatureOutput>}
        </Container>
    );
};

export default App;