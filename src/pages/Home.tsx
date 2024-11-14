import styled from "styled-components";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import PandoraList from "../components/PandoraList";
import PandoraListSkeleton from "../loading/PandoraListSkeleton";
import { IOpenedPandoraGlimpse } from "../types/pandora";
import { IPandoraService } from "../service/PandoraService";
import { getInSession, saveInSession } from "../util/storage";
import { HttpError } from "../network/HttpClient";
import { useNavigate } from "react-router-dom";
import AppFooter from "../components/AppFooter";

interface IHomeProps {
  pandoraService: IPandoraService;
}

export default function Home({ pandoraService }: IHomeProps) {
  const navigate = useNavigate();
  const [pandoras, setPandoras] = useState<IOpenedPandoraGlimpse[]>([]);
  const [glimpseLoading, setGlimpseLoading] = useState(false);

  useEffect(() => {
    const fetchPandoraPreview = async () => {
      try {
        setGlimpseLoading(true);
        const data = await pandoraService.getOpenedPandorasGlimpse();
        saveInSession<IOpenedPandoraGlimpse[]>('glimpse', data.payload);
        setPandoras(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error }, replace: true });
        }
      } finally {
        setGlimpseLoading(false);
      }
    };

    const cachedGlimpse = getInSession<IOpenedPandoraGlimpse[]>('glimpse');
    if (cachedGlimpse) {
      setPandoras(cachedGlimpse);
    } else {
      fetchPandoraPreview();
    }
  }, [pandoraService, navigate]);

  return (
    <StyledContainer>
      <Search keyword={''} />
      <div className="nav">
      </div>
      <h2 className="today">최근 열람된 노트</h2>
      <GlimpseWrapper>
        {glimpseLoading ? (
          <>
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
            <PandoraListSkeleton />
          </>
        ) : (
          <PandoraList
            action="glimpse"
            pandoras={pandoras}
            keyword=""
          />
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
  
  margin-top: 50px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }

  .today {
    width: 100%;
    font-weight: 900;
    margin-bottom: 0.4em;
    margin-top: 4rem;
    padding-left: 0.4em;
  }

  // PandoraList 의 제목 클레스 네임.
  // glimpse 임으로 클릭을 지양하는 메세지 전달
  .title {
    cursor: not-allowed;
  }
`;

/**
 * 흰색배경 shadow
 * 
 *box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; 
 */
const GlimpseWrapper = styled.div`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  padding: 0.6em;
  background-color: var(--background-block);
  box-shadow: rgba(2, 2, 2, 0.1) 0px 4px 12px;

  @media (max-width: 768px) {
    width: 95%;
  }
`;
