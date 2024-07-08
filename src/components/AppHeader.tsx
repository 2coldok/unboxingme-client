import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";
import { useEffect, useState } from "react";
import { IProfile } from "../types/profile";
import { FcGoogle } from "react-icons/fc";
import Profile from "./Profile";

export default function AppHeader() {
  const { profile, status, signOut, signIn } = useAuth();
  const [myProfile, setMyProfile] = useState<IProfile | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setMyProfile(profile);
    } else {
      setMyProfile(undefined);
    }
  }, [profile]);

  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleGoogleSignInClick = () => {
    const currentUrl = window.location.href;
    signIn(currentUrl);
  };
  
  return (
    <StyledContainer>
      <LogoWrapper onClick={handleLogoClick}>
        <h1>츄츄판도라</h1>
      </LogoWrapper>

      {!myProfile && (
        <LoginWrapper onClick={handleGoogleSignInClick}>
          <FcGoogle />
          <span>Google 로그인</span>
        </LoginWrapper>
      )}
      
      {myProfile && <Profile profile={profile} status={status} signOut={signOut} myProfile={myProfile} setMyProfile={setMyProfile} />}
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
