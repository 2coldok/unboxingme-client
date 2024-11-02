import styled from 'styled-components';
import { BsX } from "react-icons/bs";
import { useAuth } from '../hook/AuthHook';

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const { login } = useAuth();

  const handleCancel = () => {
    onClose();
  };

  const handleLogin = () => {
    onClose();
    const currentUrl = window.location.href;
    login(currentUrl);
  };

  return (
    <StyledContainer>
      <LoginContainer>
        <LogoWrapper>
          <Logo>
            <img src="/logo.png" alt="logo" />
            <span>RiddleNote</span>
          </Logo>
          <Close onClick={handleCancel}>
            <BsX />
          </Close>
        </LogoWrapper>
        <MessageWrapper>
          리들노트 앱은 Google 계정을 통해 사용자를 인증합니다.<br></br>
          Google 로그인 진행시 리들노트 <span className='terms-of-service'>이용약관</span>에 동의하게 됩니다.<br></br>
          자세한 내용은 <span className='privacy-policy'>개인정보 처리방침</span>을 확인하세요.
        </MessageWrapper>
        <LoginButtonWrapper>
          <LoginButton onClick={handleLogin}>
            <img src='/google_logo.svg' alt='google logo' />
            <span>Google 계정으로 계속하기</span>
          </LoginButton>
        </LoginButtonWrapper>
      </LoginContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1004;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 0.4rem;
  background-color: #252932;
  /* background-color: white; */
  /* border: 1px solid #797c7a; */
  border: 1px solid var(--border);

  width: 500px;
  max-width: 500px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: red; */
`;

const Logo = styled.div`
  display: flex;
  /* color: #1f1f1f; */
  color: var(--font);
  img {
    width: 1.5em;
    height: auto;
    margin-right: 0.5em;
  }

  span {
    font-size: 1.3em;
    margin-top: 0.2em;
    font-family: "Grandstander", cursive;
    font-weight: 600;
  }
`;

const Close = styled.div`
  display: flex;
  font-size: 1.9em;
  cursor: pointer;

  svg {
    /* color: #1f1f1f; */
    color: var(--font);
  }
`;

const MessageWrapper = styled.div`
  font-size: 1em;
  /* color: #1f1f1f; */
  color: var(--font);
  margin: 2em 0 2em 0;
  

  .terms-of-service {
    cursor: pointer;
    /* color: #1a73e8; */
    color: #4285F4;
  }

  .privacy-policy {
    cursor: pointer;
    /* color: #1a73e8; */
    color: #4285F4;
  }
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.span`
  display: flex;
  align-items: center;
  background-color: #4285F4;
  /* color: #1f1f1f; */
  /* border: 1px solid #747775; */
  color: #ffffff;
  border-radius: 6px;
  padding-right: 13px;
  font-weight: 600;
  cursor: pointer;

  img {
    border: 1px solid #4285F4;
    border-radius: 6px;
    margin-right: 13px;
  }

  :hover {
    filter: brightness(115%);
  }
`;
