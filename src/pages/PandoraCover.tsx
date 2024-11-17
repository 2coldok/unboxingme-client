import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "../hook/AuthHook";
import { HttpError } from "../network/HttpClient";

import { useLoading } from "../hook/LoadingHook";
import Alert from "../util/Alert";

import { IoPerson } from "react-icons/io5"; // writer
import { LuEye } from "react-icons/lu"; // coverViewCount
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { formatTime, formatTimeAgo } from "../util/formatTimeAgo";
import { AiFillLock } from "react-icons/ai";
import { BsUpc } from "react-icons/bs";
import Search from "../components/Search";
import Login from "../components/Login";
import { useCoverQuery } from "../hook/QueryHook";
import AppFooter from "../components/AppFooter";

export default function PandoraCover() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { isLoading, data = { payload: null }, error } = useCoverQuery(id);
  const { getTokenStatus } = useAuth();
  const { startLoading, stopLoading} = useLoading();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const [showLoginPop, setShowLoginPop] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // fallback from riddle page
  const location = useLocation();
  const state = location.state as { userColor?: string; restrictedUntil?: string };
  useEffect(() => {
    if (state?.userColor === 'penalty' && state.restrictedUntil) {
      return setAlertMessage(`${formatTime(state.restrictedUntil)} 까지 접근이 제한됩니다.`);
    }
    if (state?.userColor === 'maker') {
      return setAlertMessage('자신의 게시물은 "마이페이지"에서 열람할 수 있습니다.');
    }
  }, [state]);

  useEffect(() => {
    isLoading ? startLoading() : stopLoading();
  }, [isLoading, startLoading, stopLoading]);

  useEffect(() => {
    if (error) {
      return navigate('/fallback/error', { state: { error: error }, replace: true });
    }
  }, [navigate, error]);

  const handleChallengeClick = async () => {
    try {
      const status = await getTokenStatus();
      if (!status) {
        return setShowLoginPop(true);
      }

      return navigate(`/pandora/${id}/riddle`);
    } catch (error) {
      if (error instanceof HttpError) {
        return navigate('/fallback/error', { state: { error: error } })
      }
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (data.payload === null) {
    return (
      <h1>
        열람 또는 삭제됨 또는 존재하지 않는 id
      </h1>
    )
  }

  return (
    <>
      
      <SearchWrapper>
        <Search keyword={keyword} />
      </SearchWrapper>
      
      
     
      <CoverContainer>
        <CoverWrapper>
          <Title>{data.payload.title}</Title>
          <InfoWrapper>
            <div>
              <Writer> <IoPerson /> {data.payload.writer}</Writer>                  
              <MainInfo> 
                <AiFillLock /> {data.payload.totalProblems} ·&nbsp;
                <LuEye /> {data.payload.coverViewCount} ·&nbsp;
                {formatTimeAgo(data.payload.createdAt)}
              </MainInfo>
              <Label><BsUpc /> {data.payload.label}</Label>
            </div>
            <div>
              <State $open={data.payload.isCatUncovered}>{data.payload.isCatUncovered ? '열람됨' : '미열람'}</State>
            </div>
          </InfoWrapper>
          <Description>{data.payload.description}</Description>
          <FirstRiddleWrapper>
            <div>
              <p className="index">질문 1. &nbsp;</p>
              <p>{data.payload.firstQuestion}</p>
            </div>
            <button onClick={handleChallengeClick}>노트 열람하기</button>
          </FirstRiddleWrapper>  
        </CoverWrapper>
     </CoverContainer>
     <AppFooter />
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}

      {showLoginPop && <Login onClose={() => setShowLoginPop(false)} />}
    </>
  );
}

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CoverWrapper = styled.main`
  background-color: var(--background-block);
  border: 1px solid var(--border);
  box-shadow: rgba(2, 2, 2, 0.1) 0px 4px 12px;
  display: flex;
  flex-direction: column;
  max-width: 950px;
  width: 100%;
  border-radius: 0.9rem;
  padding: 1.2em;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Title = styled.h2`
  color: var(--brand);
  font-weight: 700;
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
  border: ${({ $open }) => $open ? '1px solid #00FF7F' : '1px solid #445261'};
  background: ${({ $open }) => $open ? '#334a46' : '#353d44'};
  color: ${({ $open }) => $open ? '#80e5aa' : '#b7c9e1'};
`;

const Description = styled.pre`
  border-top: 1px solid var(--border);
  font-size: 1.1em;
  padding-top: 3em;
  padding-bottom: 5em;
  padding-left: 0.4em;
  border-radius: 0;
  min-height: 10em;
  white-space: pre-wrap;
`;

const FirstRiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--background-riddle);
  padding: 1em;
  border-radius: 0.4rem;

  div {
    display: flex;
    margin-bottom: 0;
    font-size: 1.1rem;
    .index {
      font-weight: bold;
      white-space: nowrap;
    }
  }

  button {
    margin-top: 2em;
  }
`;
