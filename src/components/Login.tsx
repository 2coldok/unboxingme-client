import styled from 'styled-components';
import { BsX } from "react-icons/bs";
import { useAuth } from '../hook/AuthHook';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../loading/LoadingSpinner';

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const { login } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    onClose();
  };

  const handleLogin = () => {
    onClose();
    const currentUrl = window.location.href;
    login(currentUrl);
  };

  return (
    <>
      <StyledContainer>
        <LoginContainer>
          <CloseButtonWrapper>
            <BsX onClick={handleCancel} />
          </CloseButtonWrapper>
  
          <TitleWrapper>
            <span>리들노트 앱 로그인</span>
          </TitleWrapper>

          {!visible && (
            <LoadingSpinnerWrapper>
              <LoadingSpinner />
            </LoadingSpinnerWrapper>
          )}
          <LoginButtonWrapper onClick={handleLogin} visible={visible}>
            <img  
              src='/google_logo.svg'
              alt='google logo'
              loading='eager'
            />
            <span>Google 계정으로 계속하기</span>
          </LoginButtonWrapper>
          
          <MessageWrapper>
            구글은 보안을 위해 웹뷰(Webview) 내에서의 사용자 인증을 허용하지 않습니다.
          </MessageWrapper>

          <MessageWrapper>
            크롬, 사파리, 또는 인터넷 익스플로러 브라우저 환경에서 로그인 해주세요.
          </MessageWrapper>
         
          <MessageWrapper>
            계속 진행시 RiddleNote의 
            <Link href="/about/terms-of-service" target="_blank" rel="noopener noreferrer"> 이용약관</Link> 및
            <Link href="/about/privacy-policy" target="_blank" rel="noopener noreferrer"> 개인정보처리방침</Link> 에 동의하게 됩니다.
          </MessageWrapper>
        </LoginContainer>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
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
  padding: 16px;
  border-radius: 0.4rem;
  background-color: #252932;
  border: 1px solid #43484e; // var(--border)

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
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  color: #fafaff; // var(--font-main);

  span {
    font-size: 18px;
    margin-top: 0.2em;
    font-weight: 800;
  }
`;

const LoadingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 10px;
  margin-top: 50px;
  margin-bottom: 0;
`;

const LoginButtonWrapper = styled.span<{ visible: boolean }>`
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  display: flex;
  align-items: center;
  background-color: #4285F4;
  border-radius: 4.2px;
  font-weight: 600;
  width: auto;
  margin-top: 80px;
  margin-bottom: 50px;
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
