import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";
// import { FcGoogle } from "react-icons/fc";
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
    <>
      <LogoWrapper onClick={handleLogoClick}>
        <img src="/logo.png" alt="logo" />
        <p>iddleNote</p>
      </LogoWrapper>

      {(profile === null && !isLoading) &&  (
        <LoginWrapper onClick={handleGoogleLoginClick}>
          <img src="/google.png" alt="google" />
          <span>Login</span>
        </LoginWrapper>
      )}
      
      {(profile && !isLoading) && <Profile profile={profile} />}
    </>
  );
}

const LogoWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  p {
    font-size: 1.3em;
    margin-bottom: 0.7em;  

  }

  img {
    width: 1.6em;
    height: auto;
    margin-left: 1em;
    border-radius: 0.2em;
  }
  

  &:hover {
    cursor: pointer;
  }
`;

const LoginWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0.7em;
  font-size: 1.2em;
  border-radius: 1.5em;
  color: white;
  margin-right: 0.2em;

  img {
    width: 1.5em;
    height: auto;
  }

  :hover {
    cursor: pointer;
  }
`;
