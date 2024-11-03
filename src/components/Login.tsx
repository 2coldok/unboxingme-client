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
        <CloseButtonWrapper>
          <BsX onClick={handleCancel} />
        </CloseButtonWrapper>

        <TitleWrapper>
          <img src="/logo.png" alt="logo" />
          <span>RiddleNote App 로그인</span>
        </TitleWrapper>
        
        
        <LoginButtonWrapper onClick={handleLogin}>
          <img src='/google_logo.svg' alt='google logo' />
          <span>Google 계정으로 계속하기</span>
        </LoginButtonWrapper>
        
        <MessageWrapper>
          계속 진행시 riddlenote의 <Link href='/'>이용약관</Link>과 <Link href='/'>개인정보 처리방침</Link>에 동의하게 됩니다.
        </MessageWrapper>
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
  justify-content: center;
  align-items: center;
  padding: 10px;
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

const CloseButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  font-size: 1.5em;

  svg {
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  color: var(--font);
  margin-bottom: 40px;
  margin-left: 10px;
  img {
    width: 25px;
    height: 25px;
    margin-right: 0.5em;
  }

  span {
    font-size: 18px;
    margin-top: 0.2em;
    /* font-family: "Grandstander", cursive; */
    font-weight: 500;
  }
`;

// color: #4285F4;

const LoginButtonWrapper = styled.span`
  display: flex;
  align-items: center;
  background-color: #4285F4;
  border-radius: 4.2px;
  font-weight: 600;
  width: auto;
  cursor: pointer;

  img {
    border: 1px solid #4285F4;
    border-radius: 6px;
  }

  span {
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    margin-left: 12px;
    margin-right: 12px;
  }

  :hover {
    filter: brightness(115%);
  }
`;

const MessageWrapper = styled.div`
  align-items: center;
  font-size: 0.8em;
  margin-top: 30px;
`;

const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})`
  color: #4285F4;
  text-decoration: underline;
  :hover {
    filter: brightness(125%);
  }
`;
