import styled from "styled-components";

export default function VisitorRateLimit() {
  return (
    <StyledContainer>
      <TitleWrapper>
        <Logo src="https://riddlenote.com/logo.png" alt="리들노트 로고" />
        <span>Too many request</span>
      </TitleWrapper>
      <h4>서버 요청 한도를 초과하였습니다. 잠시 후 다시 시도해주세요.</h4>
      <p>- 공공 WiFi를 사용중인 경우 개인 WiFi 환경을 이용해주세요.</p>
      <p>- 비회원일 경우 원활한 서비스 이용을 위해 로그인 후 이용해주세요.</p>
      <LoginPageButton>로그인 페이지로 이동하기</LoginPageButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #43484e;
  border-radius: 0.5rem;
  background-color: #252932;
  max-width: 500px;
  width: 90%;
  padding: 1rem;

  p {
    color: #77aaff;
    font-weight: 600;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    margin-left: 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const Logo = styled.img`
  height: 30px;
  width: auto;
`;

const LoginPageButton = styled.button`
  margin-top: 30px;
  border: 1px solid #485f88;
  background-color: #324055;
  color: #8ab4f8;
  padding: 0.4em 1.5em;
  border-radius: 0.5rem;
  font-size: 1em;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
`;
