import styled from "styled-components";


export default function VisitorRateLimit() {
  return (
    <StyledContainer>
      <p>서버 요청 한도를 초과하였습니다.</p>
      <p>- 공공 WiFi일 경우 개인 WiFi 환경을 이용해주세요.</p>
      <p>- 비회원일 경우 로그인 후 이용해주세요.</p>
      

      <h1>로그인</h1>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;
