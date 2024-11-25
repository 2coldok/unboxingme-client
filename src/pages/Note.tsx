import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import { INote } from "../types/unboxing";
import { LuEye } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { useLoading } from "../hook/LoadingHook";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { AiFillLock } from "react-icons/ai";
import { BsArrowDownRightSquare, BsUpc } from "react-icons/bs";
import { formatTimeAgo } from "../util/formatTimeAgo";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../hook/AuthHook";

interface NoteProps {
  unboxingService: IUnboxingService;
}

export default function Note({ unboxingService }: NoteProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [pandora, setPandora] = useState<INote | null>(null);
  const { csrfToken } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '판도라 id를 찾을 수 없습니다.' } });
    }

    if (!csrfToken) {
      return;
    }
  
    const fetchNote = async () => {
      try {
        startLoading();
        const data = await unboxingService.getNote(id, csrfToken);
        setPandora(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error }, replace: true });
        }
      } finally {
        stopLoading();
      }
    }

    fetchNote();
  }, [id, navigate, unboxingService, startLoading, stopLoading, csrfToken]);

  if (!pandora || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <StyledContainer>
        <SubjectWrapper>
          <BsArrowDownRightSquare />
          <span>노트 내용</span>
        </SubjectWrapper>
        <SolverAliasWrapper>
          <p>
            <SolverAlias>{pandora.solverAlias}</SolverAlias> <br/>
            님에 의해 노트가 열람되었습니다.
          </p>
        </SolverAliasWrapper>
        <CoverWrapper>
          <Title>{pandora.title}</Title>
          <InfoWrapper>
            <div>
              <Writer> <IoPerson /> {pandora.writer}</Writer>                  
              <MainInfo> 
                <AiFillLock /> {pandora.totalProblems} ·&nbsp;
                <LuEye /> {pandora.coverViewCount} ·&nbsp;
                {formatTimeAgo(pandora.createdAt)}
              </MainInfo>
              <Label><BsUpc /> {pandora.label}</Label>
            </div>
            <div>
              <State $open={pandora.isCatUncovered}>{pandora.isCatUncovered ? '열람됨' : '미열람'}</State>
            </div>
          </InfoWrapper>
          <Description>{pandora.description}</Description>
        </CoverWrapper>

        <NoteWrapper>
        {pandora.cat}
        </NoteWrapper>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SubjectWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 950px;
  @media (max-width: 900px) {
    width: 95%;
  }
  margin-left: 0.3em;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  /* color: #cecece; */

  svg {
    margin-right: 0.4em;
  }
`;

const SolverAliasWrapper = styled.div`
  max-width: 950px;
  width: 100%;
  border: 1px solid #4c7a5e;
  border-radius: 0.9rem;
  padding: 1.2em;
  background-color: #334b43;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 4px 12px;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const SolverAlias = styled.span`
  font-weight: 700;
  font-size: 1.1em;
  color: #87e89f;
`;

const CoverWrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 950px;
  width: 100%;
  background-color: var(--background-block);
  box-shadow: rgba(2, 2, 2, 0.1) 0px 4px 12px;
  border: 1px solid var(--border);
  border-radius: 0.9rem;
  padding: 1.2em;
  margin-top: 18px;
  margin-bottom: 18px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Title = styled.h2`
  color: var(--brand);
  color: #565e73;
  font-weight: 800;
  font-size: 1.8em;
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  color: var(--font-info);
  font-weight: 600;
  color: #565e73;
`;

const Writer = styled.p`
  display: flex;
  margin: 0.9em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const MainInfo = styled.p`
  display: flex;
  margin: 0.3em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const Label = styled.p`
  display: flex;
  margin: 0.6em 0 0 0;
  svg {
    margin-right: 0.3em;
  }
`;

const State = styled.p<{ $open: boolean }>`
  display: flex;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 3px 7px 3px 7px;
  border-radius: 0.7rem;
  border: ${({ $open }) => $open ? '1px solid #4c7a5e' : '1px solid #445261'};
  background: ${({ $open }) => $open ? '#334b43' : '#353d44'};
  color: ${({ $open }) => $open ? '#87e89f' : '#b7c9e1'};
`;

const Description = styled.pre`
  font-size: 1.2rem;
  min-height: 10em;
  border-top: 1px solid var(--border);
  padding: 2em 0 0 0;
  border-radius: 0;
  white-space: pre-wrap;
  color: #565e73;
`;

const NoteWrapper = styled.pre`
  border: 1px solid var(--border);
  background-color: var(--background-riddle);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 0.9rem;
  padding: 1.1em;
  font-size: 1.2rem;
  
  display: flex;
  flex-direction: column;
  max-width: 950px;
  width: 100%;
  
  margin-top: 0;
  margin-bottom: 20px;
  
  min-height: 20em;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

// color: #a6b6e3;