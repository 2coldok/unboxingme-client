import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { env } from "../config/env";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading/LoadingSpinner";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const currentUrl = searchParams.get('current') || env.url.clientBaseURL;
  
  const [imageLoadDelay, setImageLoadDelay] = useState(false);
  const [startLoginLoading, setStartLoginLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    const imageLoadDelay = setTimeout(() => {
      setImageLoadDelay(true);
    }, 1500);

    return () => clearTimeout(imageLoadDelay);
  }, []);

  const handleLoginButton = (provider: 'google' | 'naver' | 'kakao') => {
    setStartLoginLoading(true);
    const serverBaseUrl = env.url.serverBaseURL;

    if (provider === 'google') {
      return window.location.href = `${serverBaseUrl}/auth/google?redirect_uri=${encodeURIComponent(currentUrl)}`;
    }
    if (provider === 'naver') {
      return window.location.href = `${serverBaseUrl}/auth/naver?redirect_uri=${encodeURIComponent(currentUrl)}`;
    }
    if (provider === 'kakao') {
      return window.location.href = `${serverBaseUrl}/auth/kakao?redirect_uri=${encodeURIComponent(currentUrl)}`;
    }
  }

  if (startLoginLoading) {
    return (
      <StyledContainer>
        <LoadingSpinner />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      {!imageLoadDelay && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}

      <LoginContainer visible={imageLoadDelay}>
        <TitleWrapper>
          <RiddleNoteLogoWrapper>
            <img src="/logo.png" alt="riddlenote logo" />
            <span>RiddleNote</span>
          </RiddleNoteLogoWrapper>
          <p>리들노트 소셜 계정 로그인</p>
        </TitleWrapper>
        
        <LoginButton 
          style={{ backgroundColor: '#FFFFFF', color: 'rgba(0, 0, 0, 0.54)' }}
          onClick={() => handleLoginButton('google')}
        >
          <LogoImage src="/google_logo.svg" alt="google logo" />
          <LogoText>Google 계정으로 계속하기</LogoText>
        </LoginButton>
        
        <LoginButton 
          style={{ backgroundColor: '#03c75a', border: 'none'}}
          onClick={() => handleLoginButton('naver')}
        >
          <LogoImage src="/naver_logo.png" alt="naver logo" />
          <LogoText>네이버 로그인</LogoText>
        </LoginButton>

        <KakaoLoginButtonImage 
          src="/kakao_login_button.png" 
          alt="kakao"
          onClick={() => handleLoginButton('kakao')} 
        />

        <MessageWrapper>
          계속 진행시 리들노트의
          <a href="https://riddlenote.com/about/terms-of-service" target="_blank" rel="noopener noreferrer"> 이용약관</a> 및
          <a href="https://riddlenote.com/about/privacy-policy" target="_blank" rel="noopener noreferrer"> 개인정보처리방침</a>에 동의하게 됩니다.
        </MessageWrapper>
      
      </LoginContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
`;

const LoginContainer = styled.div<{ visible: boolean }>`
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  border: 1px solid #353535;
  border-radius: 0.4em;
  width: auto;

  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: #252932;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 2em;

  p {
    font-size: 1.2em;
    color: #ececec;
  }
`;

const RiddleNoteLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 40px;
    width: auto;
    margin-right: 10px;
    margin-bottom: 7px;
  }

  span {
    font-weight: bold;
    font-size: 24px;
    font-family: 'Grandstander', cursive;
  }
`;


const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 332px;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  margin-bottom: 11px;
  border-radius: 6px;
  
  :hover {
    cursor: pointer;
    filter: brightness(111%);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  @media (max-width: 600px) {
    width: 268px;
    height: 40px;
  }
`;

const LogoImage = styled.img`
  width: auto;
  height: 50px;
  border-radius: 50%;
  @media (max-width: 600px) {
    height: 40px;
  }
`;

const LogoText = styled.span`
  text-align: center;
  padding-right: 30px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 13px;
    padding-right: 23px;
  }
`;

const KakaoLoginButtonImage = styled.img`
  width: auto;
  height: 50px;
  
  :hover {
    cursor: pointer;
    filter: brightness(111%);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  @media (max-width: 600px) {
    height: 40px;
  }
`;

const MessageWrapper = styled.div`
  margin: 1.7em 1.5em 1.8em 1.5em;
  font-size: 0.9em;

  a {
    color: #4e85ec;
  }
`;