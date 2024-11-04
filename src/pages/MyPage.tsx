import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { IDashboardService } from "../service/DashboardService";
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

interface IMypageProps {
  pandoraService: IPandoraService;
  dashboardService: IDashboardService;
}

type Ttab = 'mine' | 'challenges' | 'conquered' | 'make';

// function getTabName(tab: Ttab) {
//   if (tab === 'mine') return '나의노트';
//   if (tab === 'challenges') return '풀이중';
//   if (tab === 'conquered') return '열람';
//   if (tab === 'make') return '만들기'
// }

export default function MyPage({ pandoraService, dashboardService }: IMypageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'mine';
  const [tab, setTab] = useState<Ttab>('mine');

  useEffect(() => {
    const cachedTab = getInSession<Ttab>('tab');
    if (cachedTab) {
      setTab(cachedTab);
    }
  }, []);

  useEffect(() => {
    const validTabs = ['mine', 'challenges', 'conquered', 'make'];
    
    if (!currentTab && !validTabs.includes(currentTab)) {
      return navigate('/fallback/404', { state: { message: '지원하지 않는 탭입니다.' } })
    }

  }, [navigate, currentTab]);

  const handleNavigation = (tab: 'mine' | 'challenges' | 'conquered' | 'make') => {
    // 페이지 초기화
    if (tab === 'mine') {
      sessionStorage.removeItem('mine_currentPage');
    }
    if (tab === 'conquered') {
      sessionStorage.removeItem('conquered_currentPage');
    }

    if (tab === 'challenges') {
      sessionStorage.removeItem('challenge');
    }
    saveInSession<Ttab>('tab', tab);
    setTab(tab);
    setSearchParams({ tab });
  };
  
  return (
    <StyledContainer>
      <NavigateWrapper>
        <NavButton onClick={() => handleNavigation('mine')} $active={tab === 'mine'}>
          <BsPersonCircle />
          <span>나의 게시물</span>
        </NavButton>
        <NavButton onClick={() => handleNavigation('challenges')} $active={tab === 'challenges'}>
          <BsActivity />
          <span>진행중</span>
        </NavButton>
        <NavButton onClick={() => handleNavigation('conquered')} $active={tab === 'conquered'}>
          <AiFillUnlock />
          <span>열람</span>
        </NavButton>
        <NavButton onClick={() => handleNavigation('make')} $active={tab === 'make'}>
          <BsPlusCircle />
          <span>만들기</span>
        </NavButton>
      </NavigateWrapper>

      <ContentWrapper>
        { tab === 'mine' && <MyPandoras pandoraService={pandoraService} /> }
        { tab === 'challenges' && <MyChallenges dashboardService={dashboardService} /> }
        { tab === 'conquered' && <MyConquered dashboardService={dashboardService} />}
        { tab === 'make' && <CreationGuidelines /> }
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
    height: 60px;
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
  /* border: 1px solid var(--brand); */
  margin-top: 1em;
  border-radius: 0.5em;
  /* background-color: black; */
  color: ${({ $active }) => $active ? 'var(--brand-light)' : 'var(--font-chore)'};
  font-weight: bold;
  font-size: 1.3em;
  cursor: pointer;
  transition: transform 0.2s ease;
  :hover {
    color: var(--brand);
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
