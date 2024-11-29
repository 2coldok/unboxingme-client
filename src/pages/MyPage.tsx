import styled from "styled-components";
import MyPandoras from "../components/mypage/MyPandoras";
import MyChallenges from "../components/mypage/MyChallenges";
import MyConquered from "../components/mypage/MyConquered";

import { useEffect, useState } from "react";
import CreationGuidelines from "../components/mypage/CreationGuidelines";
import { getInSession, saveInSession } from "../util/storage";

import { BsPersonCircle } from "react-icons/bs"; // 나의 게시물 2
import { BsPlusCircle } from "react-icons/bs"; // 생성
import { AiFillUnlock } from "react-icons/ai";
import { BsActivity } from "react-icons/bs";
import { useAuth } from "../hook/AuthHook";
import { IoMdSync } from "react-icons/io"; // 연동
import { IoPerson } from "react-icons/io5"; // writer


type Ttab = 'mines' | 'challenges' | 'conquereds' | 'create';

export default function MyPage() {
  const { profile } = useAuth();
  const [tab, setTab] = useState<Ttab>('mines');

  useEffect(() => {
    const cachedTab = getInSession<Ttab>('tab');
    if (cachedTab) {
      setTab(cachedTab);
    }
  }, []);

  const handleNavigation = (tab: 'mines' | 'challenges' | 'conquereds' | 'create') => {
    saveInSession<Ttab>('tab', tab);
    setTab(tab);
  };
  
  return (
    <StyledContainer>
      <ProfileDetailWrapper>
        <AccountWrapper>
          <ProfileField><IoMdSync /> 연동중인 계정</ProfileField>
          <ProfileInfo>{profile && profile.email}</ProfileInfo>
        </AccountWrapper>
        <NicknameWrapper>
          <ProfileField><IoPerson /> 고정 닉네임</ProfileField>
          <ProfileInfo>{profile && profile.email && profile.email.slice(0, 3) + "***"}</ProfileInfo>
        </NicknameWrapper>
      </ProfileDetailWrapper>
      
      <MainWrapper>
        <NavigateWrapper>
          <NavButton onClick={() => handleNavigation('mines')} $active={tab === 'mines'}>
            <BsPersonCircle />
            <span>나의 수수께끼</span>
          </NavButton>
          <NavButton onClick={() => handleNavigation('challenges')} $active={tab === 'challenges'}>
            <BsActivity />
            <span>진행중</span>
          </NavButton>
          <NavButton onClick={() => handleNavigation('conquereds')} $active={tab === 'conquereds'}>
            <AiFillUnlock />
            <span>열람</span>
          </NavButton>
          <NavButton onClick={() => handleNavigation('create')} $active={tab === 'create'}>
            <BsPlusCircle />
            <span>만들기</span>
          </NavButton>
        </NavigateWrapper>

        <VerticalDivider></VerticalDivider>
  
        <ContentWrapper>
          { tab === 'mines' && <MyPandoras /> }
          { tab === 'challenges' && <MyChallenges /> }
          { tab === 'conquereds' && <MyConquered />}
          { tab === 'create' && <CreationGuidelines /> }
        </ContentWrapper>
      </MainWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ProfileDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* height: auto; */
  border-bottom: 1px solid var(--border);
  padding-bottom: 1em;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: normal;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-left: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
  @media (max-width: 768px) {
    margin-left: 0.5em;
  }
`;

const ProfileField = styled.span`
  display: flex;
  font-weight: bold;
  margin-right: 0.4em;
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  padding: 0.3em 1em;
  background-color: var(--background-riddle);
  svg {
    margin-right: 0.3em;
  }
`;

const ProfileInfo = styled.span`
  font-weight: 600;
  font-size: 1.1em;
  color: #c1c1c1;
`;

const MainWrapper = styled.div`
  display: flex;
  width: 100%;

  /**
  자식 요소가 부모 높이를 채우도록 함.
  자식요소 VerticalDivider가 를 위함
   */
  align-items: stretch; 
`;

const NavigateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-shrink: 0;
  /* background-color: #161e2b; */
  margin-right: 1em;
  padding-top: 4em;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: var(--background);
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    padding-bottom: 1em;
    z-index: 1000;
  }
`;

const NavButton = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.7em;
  margin-top: 1em;
  border-radius: 0.5em;
  color: ${({ $active }) => $active ? 'var(--brand)' : '#acacac;'};

  font-weight: bold;
  font-size: 1.3em;
  cursor: pointer;
  transition: transform 0.2s ease;
  :hover {
    transform: scale(1.05);
  }
  
  svg {
    font-size: 1.5rem;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    background-color: ${({ $active }) => $active ? 'none' : 'none'};

    svg {
      font-size: 2rem;
      margin-right: 0;
      margin-bottom: 5px;
    }

    span {
      font-size: 0.75rem;
    }
  }
`;

const VerticalDivider  = styled.div`
  width: 1px;
  background-color: var(--border);
  min-height: 100vh;
  height: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;
