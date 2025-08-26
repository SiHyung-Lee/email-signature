import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin-top: 30px;
`;

const PreviewContainer = styled.div`
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: white;
`;

const SignatureTable = styled.table`
  width: 100%;
  line-height: 1.5;
  margin-top: 50px;
  border-collapse: collapse;
  font-size: 11px;
  font-family: "Spoqa Han Sans Neo", "맑은 고딕", sans-serif;
  font-weight: 400;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 0;
  white-space: nowrap;
`;

const Logo = styled.img`
  width: 107px;
`;

const GuideText = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;

  &::before {
    content: "*";
    margin-right: 4px;
    color: #ff4d4f;
  }
`;

const TitleSpan = styled.span`
  display: block;
  margin-top: 5px;
  margin-bottom: 12px;
  font-weight: 600;
  font-family: Pretendard-Regular, Helvetica, "맑은 고딕", sans-serif;
`;

const NameText = styled.span`
  display: inline-block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const EngNameText = styled.span`
  display: inline-block;
  margin-bottom: 5px;
  margin-left: 3px;
  font-size: 14px;
  font-weight: 600;
`;

const DepartmentText = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
`;

const ContactText = styled.span`
  margin-left: ${(props) => (props.$isEmail ? "3px" : "0")};
`;

const SampleText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 130px;
  font-weight: 600;
  color: #000;
  transform: translate(-50%, -50%);
  opacity: 0.05;
  text-transform: uppercase;
`;

export const SignaturePreview = ({ data }) => {
  const defaultInfo = {
    address: "(04778) 서울특별시 성동구 아차산로6, 누디트 서울숲 6층",
    slogan: "Life Focus Design, Hidden Solution",
  };

  return (
    <Container>
      {data ? <GuideText>아래 생성된 서명을 드래그하여 복사하세요</GuideText> : <SampleText>Sample</SampleText>}
      <PreviewContainer>
        {data ? (
          <SignatureTable>
            <tbody>
              <tr>
                <TableCell>
                  <NameText>{data.name}</NameText>
                  <EngNameText>{data.engName}</EngNameText>
                </TableCell>
              </tr>
              <tr>
                <TableCell>
                  <DepartmentText>
                    {data.department && `${data.department} | `}
                    {data.job}
                  </DepartmentText>
                </TableCell>
              </tr>
              <tr>
                <TableCell>
                  <ContactText>
                    Mobile : {data.phone.first}-{data.phone.middle}-{data.phone.last}
                  </ContactText>
                  <ContactText $isEmail>Email : {data.email}@athomecorp.com</ContactText>
                </TableCell>
              </tr>
              <tr>
                <td>{defaultInfo.address}</td>
              </tr>
              <tr>
                <td>
                  <TitleSpan>{defaultInfo.slogan}</TitleSpan>
                </td>
              </tr>
              <tr>
                <td>
                  <Logo
                    src="https://athomeimg.cafe24.com/email-signature/logo.png"
                    alt="athome"
                  />
                </td>
              </tr>
            </tbody>
          </SignatureTable>
        ) : (
          <SignatureTable>
            <tbody>
              <tr>
                <TableCell>
                  <NameText>홍길동</NameText>
                  <EngNameText>Hong Gil Dong</EngNameText>
                </TableCell>
              </tr>
              <tr>
                <TableCell>
                  <DepartmentText>브랜드팀 | 마케터</DepartmentText>
                </TableCell>
              </tr>
              <tr>
                <TableCell>
                  <ContactText>Mobile : 010-1234-5678</ContactText>
                  <ContactText $isEmail>Email : sample@athomecorp.com</ContactText>
                </TableCell>
              </tr>
              <tr>
                <td>{defaultInfo.address}</td>
              </tr>
              <tr>
                <td>
                  <TitleSpan>{defaultInfo.slogan}</TitleSpan>
                </td>
              </tr>
              <tr>
                <td>
                  <Logo
                    src="https://athomeimg.cafe24.com/email-signature/logo.png"
                    alt="athome"
                  />
                </td>
              </tr>
            </tbody>
          </SignatureTable>
        )}
      </PreviewContainer>
    </Container>
  );
};
