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
import { Helmet } from "react-helmet-async";

type Ttab = 'mines' | 'challenges' | 'conquereds' | 'create';

export default function MyPage() {
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
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
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

      <ContentWrapper>
        { tab === 'mines' && <MyPandoras /> }
        { tab === 'challenges' && <MyChallenges /> }
        { tab === 'conquereds' && <MyConquered />}
        { tab === 'create' && <CreationGuidelines /> }
      </ContentWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
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

const ContentWrapper = styled.div`
  flex-grow: 1;
`;
