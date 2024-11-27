import styled from "styled-components";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import PandoraListSkeleton from "../loading/PandoraListSkeleton";
// import { getInSession, saveInSession } from "../util/storage";
import { HttpError } from "../network/HttpClient";
import { useNavigate } from "react-router-dom";
import AppFooter from "../components/AppFooter";
import { PiClockClockwiseBold } from "react-icons/pi";
import GlimpseList from "../components/GlimpseList";
import { IDashboardService } from "../service/DashboardService";
import { IGlimpse } from "../types/dashboard";

interface IHomeProps {
  dashboardService: IDashboardService;
}

export default function Home({ dashboardService }: IHomeProps) {
  const navigate = useNavigate();
  const [glimpses, setGlimpses] = useState<IGlimpse[]>([]);
  const [glimpseLoading, setGlimpseLoading] = useState(false);

  useEffect(() => {
    const fetchPandoraPreview = async () => {
      try {
        setGlimpseLoading(true);
        const data = await dashboardService.getGlimpses();
        
        // saveInSession<IOpenedPandoraGlimpse[]>('glimpse', data.payload);
        setGlimpses(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error }, replace: true });
        }
      } finally {
        setGlimpseLoading(false);
      }
    };

    // const cachedGlimpse = getInSession<IOpenedPandoraGlimpse[]>('glimpse');
    // if (cachedGlimpse) {
    //   setPandoras(cachedGlimpse);
    // } else {
    //   fetchPandoraPreview();
    // }
    fetchPandoraPreview();
  }, [dashboardService, navigate]);

  return (
    <StyledContainer>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
     
      <SubjectWrapper>
        <span>Today log</span>
        <small>
          <PiClockClockwiseBold /> 5 minute • 10 Items
          </small>
      </SubjectWrapper>
      <GlimpseWrapper>
        {glimpseLoading ? (
          <>
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
          </>
        ) : (
          <GlimpseList glimpses={glimpses} />
        )}
      </GlimpseWrapper>
      {!glimpseLoading && (
        <AppFooter />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  // PandoraList 의 제목 클레스 네임.
  // glimpse 임으로 클릭을 지양하는 메세지 전달
  .title {
    cursor: not-allowed;
  }
`;

const SubjectWrapper = styled.div`
  display: flex;
  width: 85%;
  font-weight: 900;
  font-size: 1.1em;
  margin-bottom: 0.4em;
  margin-top: 4rem;
  padding-left: 0.4em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid var(--border);
  color: #ececec;
  @media (max-width: 950px) {
    width: 95%;
  }

  span {
    font-size: 1.2em;
  }
  
  small {
    display: flex;
    color: var(--font-info);
    margin-left: 0.5em;
    border: 1px solid var(--border);
    padding: 0.3em;
    border-radius: 0.5rem;
    svg {
      margin-right: 0.3em;
      
    }

  }
`

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

/**
 * 흰색배경 shadow
 * 
 *box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; 
 */
const GlimpseWrapper = styled.div`
  width: 85%;
  /* border: 1px solid var(--border); */
  border-radius: 1rem;
  /* padding: 0.6em; */
  /* background-color: var(--background-block); */
  /* box-shadow: rgba(2, 2, 2, 0.1) 0px 4px 12px; */

  @media (max-width: 950px) {
    width: 95%;
  }
`;
