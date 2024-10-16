import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { IDashboardService } from "../service/DashboardService";
import MyPandoras from "../components/mypage/MyPandoras";
import MyChallenges from "../components/mypage/MyChallenges";
import MyConquered from "../components/mypage/MyConquered";

import { TfiDropboxAlt } from "react-icons/tfi"; // 열람
import { GiLockedBox } from "react-icons/gi"; // 나의노트
import { BiPlusCircle } from "react-icons/bi"; // 생성
import { PiNotePencil } from "react-icons/pi"; // 풀이중
import { useEffect, useState } from "react";
import CreationGuidelines from "../components/mypage/CreationGuidelines";
import { getInSession } from "../util/storage";
interface IMypageProps {
  pandoraService: IPandoraService;
  dashboardService: IDashboardService;
}

// type Ttab = 'mine' | 'challenges' | 'conquered' | 'make';

// function getTabName(tab: Ttab) {
//   if (tab === 'mine') return '나의노트';
//   if (tab === 'challenges') return '풀이중';
//   if (tab === 'conquered') return '열람';
//   if (tab === 'make') return '만들기'
// }

export default function MyPage({ pandoraService, dashboardService }: IMypageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'mine';
  const [mineCurrentPage, setMineCurrentPage] = useState(1);
  const [conqueredCurrentPage, setConqueredPage] = useState(1);
  const navigate = useNavigate();
  // const [tab, setTab] = useState<Ttab>('mine');

  useEffect(() => {
    const cachedMine = getInSession<number>('mine-currentPage');
    if (cachedMine) {
      setMineCurrentPage(cachedMine);
    }

    const cachedConquered = getInSession<number>('conquered-currentPage');
    if (cachedConquered) {
      setConqueredPage(cachedConquered);
    }

  }, []);

  useEffect(() => {
    const validTabs = ['mine', 'challenges', 'conquered', 'make'];
    
    if (!currentTab && !validTabs.includes(currentTab)) {
      return navigate('/fallback/404', { state: { message: '지원하지 않는 탭입니다.' } })
    }
  }, [navigate, currentTab]);

  const handleNavigation = (tab: 'mine' | 'challenges' | 'conquered' | 'make') => {
    if (tab === 'mine') {
      setMineCurrentPage(1);
    }
    if (tab === 'conquered') {
      setConqueredPage(1);
    }
    setSearchParams({ tab });
  };
  
  return (
    <StyledContainer>
      <NavigateWrapper>
        <NavButton onClick={() => handleNavigation('mine')}>
          <GiLockedBox />
          <span>나의 게시물</span>
        </NavButton>
        <NavButton onClick={() => handleNavigation('challenges')}>
          <PiNotePencil />
          <span>진행중</span>
        </NavButton>
        <NavButton onClick={() => handleNavigation('conquered')}>
          <TfiDropboxAlt />
          <span>열람</span>
        </NavButton>
        <NavButton onClick={() => handleNavigation('make')}>
          <BiPlusCircle />
          <span>만들기</span>
        </NavButton>
      </NavigateWrapper>

      <ContentWrapper>
        { currentTab === 'mine' && <MyPandoras pandoraService={pandoraService} currentPage={mineCurrentPage} setCurrentPage={setMineCurrentPage} /> }
        { currentTab === 'challenges' && <MyChallenges dashboardService={dashboardService} /> }
        { currentTab === 'conquered' && <MyConquered dashboardService={dashboardService} currentPage={conqueredCurrentPage} setCurrentPage={setConqueredPage} />}
        { currentTab === 'make' && <CreationGuidelines /> }
      </ContentWrapper>
      
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  /* height: 100vh; */
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2em;
  background: none;
  border: none;
  color: yellow;
  font-size: 1rem;
  cursor: pointer;

  & > svg {
    font-size: 1.5rem;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0;

    & > svg {
      font-size: 2rem;
      margin-right: 0;
    }

    & > span {
      font-size: 0.75rem;
    }
  }
`;

const NavigateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-shrink: 0;
  /* background-color: #161e2b; */
  /* border-right: 1px solid #2e353f; */
  padding: 1em;

  & > button {
    margin-top: 2em;
    color: white;
    :hover {
      background-color: #427bff;
    }

  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #161e2b;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    z-index: 1000;

    & > button {
      margin: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  /* background-color: #1d2636; */
  color: white;
  padding-left: 1em;
  padding-right: 0.5em;
  /* padding: 2rem; */
`;
