import { AiFillCaretDown } from "react-icons/ai";
import styled from "styled-components";
import { IProfile } from "../types/profile";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProfileProps {
  profile: IProfile | undefined;
  status: () => Promise<boolean>;
  signOut: () => Promise<void>;
  myProfile: IProfile | undefined;
  setMyProfile: Dispatch<SetStateAction<IProfile | undefined>>;
}

export default function Profile({ profile, status, signOut, myProfile, setMyProfile }: IProfileProps) {
  const navigate = useNavigate();
  const [showPopper, setShowPopper] = useState(false);

  if (!profile || !myProfile) {
    return null;
  }

  const handleProfileClick = () => {
    setShowPopper(prev => !prev);
  };

  const handleMyPageClick = () => {
    status().then((status) => {
      if (!status) {
        alert('세션이 만료되었습니다.');
        navigate('/');
      }
      if (status) {
        navigate('/issuer');
      }
    });
  };

  const handleMakePandoraMessageClick = () => {
    status().then((status) => {
      if (!status) {
        alert('세션이 만료되었습니다.');
        navigate('/');
      }
      if (status) {
        navigate('/pandora/new');
      }
    });
  };

  const handleSignOutClick = () => {
    signOut().then(() => {
      setMyProfile(undefined);  
      navigate('/');
    });
  };
 
  return (
    <StyledContainer>
      <ProfileWrapper onClick={handleProfileClick}>
        <img src={myProfile.photo} alt="avatar" />
        <span>{myProfile.displayName}</span>
        <AiFillCaretDown />
      </ProfileWrapper>
      {showPopper && (
        <Popper>
          <button onClick={handleMyPageClick}>마이페이지</button>
          <button onClick={handleMakePandoraMessageClick}>판도라메세지 만들기</button>
          <button onClick={handleSignOutClick}>로그아웃</button>
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

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.4em;
  }

  & > span {
    font-weight: bold;
  }

  & > svg {
    margin-left: 0.5em;
  }

  &:hover {
    cursor: pointer;
    
    background-color: #141227;
  }
`

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