import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { useEffect, useState } from "react";
import { IPandoraCover } from "../types/pandora";
import { useAuth } from "../hook/AuthHook";
import { HttpError } from "../network/HttpClient";
import { getInSession, saveInSession } from "../util/storage";
import { useLoading } from "../hook/LoadingHook";
import Alert from "../util/Alert";

import { IoPerson } from "react-icons/io5"; // writer
import { LuEye } from "react-icons/lu"; // coverViewCount
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { formatTime, formatTimeAgo } from "../util/formatTimeAgo";
import { AiFillLock } from "react-icons/ai";
import { BsUpc } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import Search from "../components/Search";
import Login from "../components/Login";

interface IPandoraCoverProps {
  pandoraService: IPandoraService;
}

export default function PandoraCover({ pandoraService }: IPandoraCoverProps) {
  const { id } = useParams<{ id: string }>(); 
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const [showLoginPop, setShowLoginPop] = useState(false);
  const [pandoraCover, setPandoraCover] = useState<IPandoraCover | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { getTokenStatus } = useAuth();
  const { isLoading, startLoading, stopLoading} = useLoading();
  const navigate = useNavigate();

  // fallback from riddle page
  const location = useLocation();
  const state = location.state as { userColor?: string; restrictedUntil?: string };

  useEffect(() => {
    if (state?.userColor === 'penalty' && state.restrictedUntil) {
      return setAlertMessage(`${formatTime(state.restrictedUntil)} 까지 접근이 제한됩니다.`);
    }
    if (state?.userColor === 'maker') {
      return setAlertMessage('게시물 생성자는 "마이페이지"에서 열람할 수 있습니다.');
    }
  }, [state]);

  useEffect(() => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: 'id를 찾을 수 없습니다' } });
    }
    
    const fetchPandoraCover = async () => {
      try {
        startLoading();
        const data = await pandoraService.getPandoraCover(id);
        const pandoraCover = data.payload;
        if (pandoraCover === null) {
          return navigate('/fallback/404', { state : { message: '존재하지 않는 판도라id 입니다.' } });
        }
        saveInSession<IPandoraCover>(`cover-${pandoraCover.id}`, pandoraCover);
        setPandoraCover(pandoraCover);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      } finally {
        stopLoading();
      }
    };

    const cachedPandoraCover = getInSession<IPandoraCover>(`cover-${id}`);
    if (cachedPandoraCover) {
      setPandoraCover(cachedPandoraCover);
    } else {
      fetchPandoraCover();
    }
  }, [id, pandoraService, navigate, startLoading, stopLoading]);

  const handleChallengeClick = async () => {
    try {
      const tokenStatus = await getTokenStatus();

      if (tokenStatus === 'valid') {
        return navigate(`/pandora/${id}/riddle`);
      }
      
      if (tokenStatus == 'none') {
        return setShowLoginPop(true);
      }
    } catch (error) {
      if (error instanceof HttpError) {
        return navigate('/fallback/error', { state: { error: error } })
      }
    }
  };

  if (isLoading || !pandoraCover) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <SearchWrapper>
        <Search keyword={keyword ? keyword : ''} />
      </SearchWrapper>
     
      <CoverWrapper>
        <Title>{pandoraCover.title}</Title>
        <InfoWrapper>
          <div>
            <Writer> <IoPerson /> {pandoraCover.writer}</Writer>                  
            <MainInfo> 
              <AiFillLock /> {pandoraCover.totalProblems} ·&nbsp;
              <LuEye /> {pandoraCover.coverViewCount} ·&nbsp;
              {formatTimeAgo(pandoraCover.createdAt)}
            </MainInfo>
            <Label><BsUpc /> {pandoraCover.label}</Label>
          </div>
          <div>
            <State $open={pandoraCover.isCatUncovered}><GoDotFill/> {pandoraCover.isCatUncovered ? '열람됨' : '미열람'}</State>
          </div>
        </InfoWrapper>
        <Description>{pandoraCover.description}</Description>
        <FirstRiddleWrapper>
          <div>
            <p className="index">질문 1. &nbsp;</p>
            <p>{pandoraCover.firstQuestion}</p>
          </div>
          <button onClick={handleChallengeClick}>게시물 열람하기</button>
        </FirstRiddleWrapper>  
      </CoverWrapper>

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

const CoverWrapper = styled.main`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5em;
  @media (max-width: 768px) {
    border-style: none;
  }
`;

const Title = styled.h2`
  color: var(--list-title);
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
  color: var(--list-info);
`;

const Writer = styled.p`
  display: flex;
  color: var(--font);
  font-weight: 500;
  font-size: 1em;
  margin: 0.9em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const MainInfo = styled.p`
  display: flex;
  font-size: 0.9em;
  font-weight: 500;
  margin: 0.3em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const Label = styled.p`
  display: flex;
  margin: 0.6em 0 0 0;
  font-weight: 500;
  font-size: 0.9em;
  svg {
    margin-right: 0.3em;
  }
`;

const State = styled.p<{ $open: boolean }>`
  display: flex;
  font-weight: 600;
  svg {
    margin-right: 0.3em;
    color: ${({ $open }) => $open ? '#4caf50' : '#ffd54f '}
  }
`;

const Description = styled.pre`
  font-size: 1.1em;
  padding-top: 3em;
  padding-bottom: 5em;
  padding-left: 0.4em;
  border-radius: 0;
  white-space: pre-wrap;
`;

const FirstRiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #252932;
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
