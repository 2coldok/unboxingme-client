import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";
import { env } from "../config/env";
import React, { useEffect, useState } from "react";
import { IProfile } from "../types/profile";

export default function AppHeader() {
  const { profile, signOut } = useAuth();
  const [profileState, setProfileState] = useState<IProfile | undefined>(undefined);
  const navigate = useNavigate();


  useEffect(() => {
    if (profile) {
      setProfileState(profile);
    }
    
  }, [profile]);
  
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!profile) {
      event.preventDefault();
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      window.location.href = env.url.GoogleSignIn;
    }
  }

  const handleSignOut = () => {
    signOut();
    setProfileState(undefined);
  };

  const handleMyPandora = () => {
    navigate('/issuer');
  };
  
  return (
    <StyledContainer>
      <nav>
        <ListContainer>
          <li><Link to='/'>Home</Link></li>
          <li><a href={env.url.GoogleSignIn}>구글로그인</a></li>
          <li><Link to='/pandora/new' onClick={handleClick}>문제 만들기</Link></li>
        </ListContainer>
      </nav>

      <ProfileContainer>
        { profileState && `${profileState.displayName}` }
        { profileState  &&  <ProfileAvatar src={profileState.photo} alt="avatar" />}
        { profileState && <button onClick={handleSignOut}>로그아웃</button> }
        { profileState && <button onClick={handleMyPandora}>나의 판도라</button> }
      </ProfileContainer>

    </StyledContainer>
  );
}

const StyledContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
  border: 1px solid #99C3FF;
`;

const ListContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 70px;

  & > li {
    margin-right: 27px;
  }
`;

const ProfileContainer = styled.div`
  background-color: gray;
`;

const ProfileAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
`;
