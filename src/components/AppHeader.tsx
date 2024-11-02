import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import Login from "./Login";
export default function AppHeader() {
  const { profile } = useAuth();
  const [ready, setReady] = useState(false);
  const [showLoginPop, setShowLoginPop] = useState(false);
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
  
  const handleLoginClick = () => {
    setShowLoginPop(true);
  };
  
  return (
    <>
      <LogoWrapper onClick={handleLogoClick}>
        <img src="/logo.png" alt="logo" />
        <span>RiddleNote</span>
      </LogoWrapper>

      {showLoginPop && <Login onClose={() => setShowLoginPop(false)} />}      

      {profile === undefined && (
        <LoginWrapper $ready={ready}>
          <button>로그인</button>
        </LoginWrapper>
      )}

      {profile === null && (
        <LoginWrapper onClick={handleLoginClick} $ready={ready}>
          <button>로그인</button>
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
  margin-left: 1em;
  margin-top: 0.3em;
  /* color: var(--blue500); */
  
  cursor: pointer;

  img {
    width: 1.8em;
    height: auto;
    margin-right: 0.5em;
  }

  span {
    font-size: 1.4em;
    font-family: "Grandstander", cursive;
    font-weight: 600;
    margin-top: 0.3em;
  }
`;

const LoginWrapper = styled.nav<{ $ready: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0.7em;
  font-size: 1.2em;
  border-radius: 1.5em;
  margin-right: 0.3em;
  cursor: ${({ $ready }) => ($ready ? 'pointer' : 'not-allowed')};

  button {
    
    font-size: 0.8em;
    padding: 0.3em 1em 0.3em 1em;
    opacity: ${({ $ready }) => ($ready ? 1 : 0.5)};
  }
`;
