import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";
import { FcGoogle } from "react-icons/fc";
import Profile from "./Profile";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const { profile, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (profile !== undefined) {
      setIsLoading(false);
    }
  }, [profile]);

  const handleLogoClick = () => {
    return navigate('/');
  };
  
  const handleGoogleLoginClick = () => {
    const currentUrl = window.location.href;
    login(currentUrl);
  };
  
  return (
    <StyledContainer>
      <LogoWrapper onClick={handleLogoClick}>
        <h1>리들노트</h1>
      </LogoWrapper>

      {(profile === null && !isLoading) &&  (
        <LoginWrapper onClick={handleGoogleLoginClick}>
          <FcGoogle />
          <span>Google 로그인</span>
        </LoginWrapper>
      )}
      
      {(profile && !isLoading) && <Profile profile={profile} />}
    </StyledContainer>
  );
}

const StyledContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  width: 100%;
  height: 70px;
  border: 1px solid #99C3FF;
`;

const LogoWrapper = styled.nav`
  background-color: black;

  &:hover {
    cursor: pointer;
  }    
`;

const LoginWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0.7em;
  border: 1px solid white;
  border-radius: 1.5em;
  color: white;
  font-weight: bold;

  & > svg {
    margin-right: 0.3em;
    font-size: 1.5em;
  }
`;
