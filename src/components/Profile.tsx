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
    setShowPopper(false);
    const status = await getTokenStatus();
    if (!status) {
      return alert('로그인이 필요한 서비스입니다.');
    }
    return navigate('/dashboard');
  };

  const handleLogoutClick = async () => {
    await logout();
    setShowPopper(false);
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
          <div className="mypage" onClick={handleMyPageClick}>마이페이지</div>
          <div className="logout" onClick={handleLogoutClick}>로그아웃</div>
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
  /* left: calc(50% - 100px); */
  right: 20px;
  /* max-width: 400px; */
  /* background-color: #252932; */
  background-color: var(--background-riddle);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.5em;
  z-index: 10;
  width: 140px;

  /* @media (max-width: 400px) {
    left: auto; 
    right: 10px;
  } */
  
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
    font-size: 1.1em;
    /* font-weight: bold; */
    /* border-radius: 0.4em; */
    padding: 0.2em;
    font-weight: 600;
    /* background-color: gray; */
    /* color: var(--button-font); */
    :hover {
      filter: brightness(125%);
      cursor: pointer;
    }
  }

  .mypage {
    margin-bottom: 0.5em;
  }
`;