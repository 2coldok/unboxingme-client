import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";
// import { FcGoogle } from "react-icons/fc";
import Profile from "./Profile";
import { useEffect, useState } from "react";
export default function AppHeader() {
  const { profile, login } = useAuth();
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile === undefined) {
      setReady(false);
    }
    if (profile === null) {
      setReady(true);
    }
  }, [profile])

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

      {profile === undefined && (
        <LoginWrapper $ready={ready}>
          <img src="/google.png" alt="google" />
          <span>Login</span>
        </LoginWrapper>
      )}

      {profile === null && (
        <LoginWrapper onClick={handleGoogleLoginClick} $ready={ready}>
          <img src="/google.png" alt="google" />
          <span>Login</span>
        </LoginWrapper>
      )}
      
      {profile && <Profile profile={profile} />}
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

const LoginWrapper = styled.nav<{ $ready: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0.7em;
  font-size: 1.2em;
  border-radius: 1.5em;
  color: white;
  margin-right: 0.2em;
  cursor: ${({ $ready }) => ($ready ? 'pointer' : 'not-allowed')};

  img {
    width: 1.5em;
    height: auto;
    filter: ${({ $ready }) => ($ready ? 'none' : 'grayscale(100%)')};
  }

  span {
    color: ${({ $ready }) => ($ready ? 'var(--white100)' : 'gray')};
  }
`;
