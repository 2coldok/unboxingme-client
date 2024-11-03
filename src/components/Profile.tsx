// import { AiFillCaretDown } from "react-icons/ai";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProfile } from "../types/auth";
import { useAuth } from "../hook/AuthHook";

interface IProfileProps {
  profile: IProfile;
}

export default function Profile({ profile }: IProfileProps) {
  const { logout, getTokenStatus } = useAuth();
  const navigate = useNavigate();
  const [showPopper, setShowPopper] = useState(false);

  const handleProfileClick = () => {
    return setShowPopper(prev => !prev);
  };

  const handleMyPageClick = async () => {
    const status = await getTokenStatus();
    if (status === 'invalid') {
      return alert('세션이 만료되었습니다.');
    }
    if (status === 'none') {
      return alert('구글 로그인이 필요한 서비스 입니다.');
    }
    if (status === 'valid') {
      return navigate('/dashboard');
    }
  };

  const handleLogoutClick = async () => {
    await logout();
    return navigate('/');
  };
 
  return (
    <StyledContainer>
      <ProfileWrapper onClick={handleProfileClick}>
        <img src={profile.photo} alt="avatar" />
        <span>{profile.displayName}</span>
      </ProfileWrapper>
      {showPopper && (
        <Popper>
          <button onClick={handleMyPageClick}>마이페이지</button>
          <button onClick={handleLogoutClick}>로그아웃</button>
        </Popper>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  padding: 0.2em 0.7em;
  margin-right: 1rem;
  cursor: pointer;

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.4em;
  }

  & > span {
    font-weight: bold;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Popper = styled.div`
  position: absolute;
  top: 50px;
  left: calc(50% - 100px);
  max-width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  
  padding: 10px;
  z-index: 10;

  @media (max-width: 400px) {
    left: auto; 
    right: 10px;
  }
  
  & > button {
    display: block;
    width: 100%;
    padding: 10px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;