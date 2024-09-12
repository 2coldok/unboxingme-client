import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { IDashboardService } from "../service/DashboardService";
import MyPandoras from "../components/mypage/MyPandoras";
import MyChallenges from "../components/mypage/MyChallenges";
import MyConquered from "../components/mypage/MyConquered";
import PreCreationGuidelines from "../components/form/PreCreationGuidelines";

interface IMypageProps {
  pandoraService: IPandoraService;
  dashboardService: IDashboardService;
}

export default function MyPage({ pandoraService, dashboardService }: IMypageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'mine';

  const handleNavigation = (tab: string) => {
    setSearchParams({ tab });
  };
  
  return (
    <StyledContainer>
      <NavigateWrapper>
        <button onClick={() => handleNavigation('mine')}>mine</button>
        <button onClick={() => handleNavigation('challenges')}>challenges</button>
        <button onClick={() => handleNavigation('conquered')}>conquered</button>
        <button onClick={() => handleNavigation('make')}>make</button>
      </NavigateWrapper>

      <ContentWrapper>
        { currentTab === 'mine' && <MyPandoras pandoraService={pandoraService} /> }
        { currentTab === 'challenges' && <MyChallenges dashboardService={dashboardService} /> }
        { currentTab === 'conquered' && <MyConquered />}
        { currentTab === 'make' && <PreCreationGuidelines /> }
      </ContentWrapper>
      
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const NavigateWrapper = styled.div`
  width: 150px;
  padding: 2rem;
  background-color: gray;
  color: yellow;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  background-color: black;
  color: white;
  padding: 2rem;
`;
