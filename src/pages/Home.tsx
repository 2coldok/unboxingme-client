import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import PandoraList from "../components/PandoraList";
import PandoraListSkeleton from "../loading/PandoraListSkeleton";
import HomeFooter from "../components/HomeFooter";
import { IOpenedPandoraGlimpse } from "../types/pandora";
import { IPandoraService } from "../service/PandoraService";
import { getInSession, saveInSession } from "../util/storage";
import { HttpError } from "../network/HttpClient";
import { useNavigate } from "react-router-dom";

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
      <Helmet>
        <title>리들노트 | 수수께끼 노트.</title>
      </Helmet>
      {/* <Guide><IoHelpCircleOutline /> 가이드</Guide> */}
      <Search keyword={''} />
      <div className="nav">
      </div>
      <h2 className="today">최근 열람된 게시물</h2>
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
        <FooterContainer>
          <HomeFooter />
        </FooterContainer>
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

// const Guide = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   position: absolute;
//   left: 0;
//   top: 70px; // 위에 nav bar의 높이가 70px임
//   height: 40px;
//   background-color: #1e2023;
//   font-weight: bold;
//   border-bottom: 1px solid var(--gray200);

//   svg {
//     font-size: 1.2em;
//     margin-right: 0.3em;
//   }

//   :hover {
//     filter: brightness(125%);
//     cursor: pointer;
//   }
// `;

/**
 * 흰색배경 shadow
 * 
 *box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; 
 */
const GlimpseWrapper = styled.div`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 0.6em;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-top: 30px;
  padding-bottom: 0;
`;
