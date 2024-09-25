import { AiFillCaretDown } from "react-icons/ai";
import styled from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProfile } from "../types/auth";

interface IProfileProps {
  profile: IProfile | undefined;
  logout: () => Promise<void>;
  me: () => Promise<boolean>
  myProfile: IProfile | undefined;
  setMyProfile: Dispatch<SetStateAction<IProfile | undefined>>;
}

export default function Profile({ profile, logout, me, myProfile, setMyProfile }: IProfileProps) {
  const navigate = useNavigate();
  const [showPopper, setShowPopper] = useState(false);

  if (!profile || !myProfile) {
    return null;
  }

  const handleProfileClick = () => {
    return setShowPopper(prev => !prev);
  };

  const handleMyPageClick = async () => {
    me().then((result) => {
      if (result) {
        return navigate('/dashboard');
      } else {
        alert('세션이 만료되었습니다.');
        setMyProfile(undefined);
        return navigate('/');
      }
    })
  };

  const handleSignOutClick = async () => {
    logout().then(() => {
      setMyProfile(undefined);
    })
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