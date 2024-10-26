import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { useEffect, useState } from "react";
import { IPandoraCover } from "../types/pandora";
import { useAuth } from "../hook/AuthHook";
import { HttpError } from "../network/HttpClient";
import { getInSession, saveInSession } from "../util/storage";
import { IUnboxingService } from "../service/UnboxingService";
import { useLoading } from "../hook/LoadingHook";
import Alert from "../util/Alert";

import { IoPerson } from "react-icons/io5"; // writer
import { LuEye } from "react-icons/lu"; // coverViewCount
import { IoIosFingerPrint } from "react-icons/io"; // label
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { formatTimeAgo } from "../util/formatTimeAgo";
import RiddleProgress from "../util/RiddleProgress";

interface IPandoraCoverProps {
  pandoraService: IPandoraService;
  unboxingService: IUnboxingService;
}

export default function PandoraCover({ pandoraService, unboxingService }: IPandoraCoverProps) {
  const { id } = useParams<{ id: string }>(); 
  const [pandoraCover, setPandoraCover] = useState<IPandoraCover | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { getTokenStatus, login } = useAuth();
  const { isLoading, startLoading, stopLoading} = useLoading();
  const [challengerLoading, setChallengeLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startLoading();
    if (!id) {
      stopLoading();
      return navigate('/fallback/404', { state: { message: 'id를 찾을 수 없습니다' } });
    }
    
    const fetchPandoraCover = async () => {
      try {
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
    }

    const cachedPandoraCover = getInSession<IPandoraCover>(`cover-${id}`);
    if (cachedPandoraCover) {
      setPandoraCover(cachedPandoraCover);
      stopLoading();
    } else {
      fetchPandoraCover();
    }
  }, [id, pandoraService, navigate, startLoading, stopLoading]);

  const handleChallengeClick = async () => {
    try {
      setChallengeLoading(true);
      const tokenStatus = await getTokenStatus();

      if (tokenStatus === 'valid') {
        const data = await unboxingService.getInitialRiddle(id as string);
        const status = data.payload.status;
  
        if (status === 'penalty') {
          setChallengeLoading(false);
          return setAlertMessage(`${data.payload.restrictedUntil}까지 패널티 기간입니다.`);
        }

        if (status === 'ineligible') {
          setChallengeLoading(false);
          if (data.payload.reason === 'MINE') {
            return setAlertMessage('자신의 수수께끼에는 도전할 수 없습니다.');
          }
          return navigate('/fallback/404', { state: { message: data.payload.reason }, replace: true });
        }

        if (status === 'riddle') {
          setChallengeLoading(false);
          return navigate(`/pandora/${id}/riddle`, { state: { payload: data.payload } });
        }
      }
      
      if (tokenStatus == 'none') {
        setChallengeLoading(false);
        const userConfirmation = confirm('구글 로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
        if (userConfirmation) {
          return login(window.location.href);
        }
        return;
      }
    } catch (error) {
      if (error instanceof HttpError) {
        return navigate('/fallback/error', { state: { error: error } })
      }
    }
  };

  if (challengerLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {isLoading || !pandoraCover ? (
        <LoadingSpinner />
      ) : (
        <CoverWrapper>
          <HeadWrapper>
            <h1 className="title">{pandoraCover.title}</h1>
            <p className="writer">
              <IoPerson /> {pandoraCover.writer}
            </p>
            <p className="view-createdat">
              <LuEye /> {pandoraCover.coverViewCount} &nbsp;·&nbsp; 
              {formatTimeAgo(pandoraCover.createdAt)}
            </p>
            <p className="label">
              <IoIosFingerPrint /> {pandoraCover.label}
            </p>
          </HeadWrapper>
          
          <Description>{pandoraCover.description}</Description>
          
          <FirstRiddleWrapper>
            <RiddleProgress totalSteps={pandoraCover.totalProblems} currentStep={0} />
            <div className="problem">
              <p className="index">질문 1. &nbsp;</p>
              <p>{pandoraCover.firstQuestion}</p>
            </div>
            <button onClick={handleChallengeClick}>게시글 내용 확인하기</button>
          </FirstRiddleWrapper>  
        </CoverWrapper>
      )}

      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </>
  );
}
    
const CoverWrapper = styled.main`
  display: flex;
  flex-direction: column;
  border: 1px solid #3a3d42;
  border-radius: 0.7rem;
  padding: 1.5em;
  overflow: hidden;
  background-color: #101114;
`;

const HeadWrapper = styled.div`
  .title {
    color: #7eaaff;
    margin: 0;
  }

  .writer {
    font-weight: bold;
    margin: 0.5em 0 0.2em 0;
    color: #d1d5da;
  }

  .view-createdat {
    display: flex;
    margin: 0.1em 0 0.2em 0;
    color: #6a737d;
    font-weight: bold;
    & > svg {
      margin-right: 0.3em;
    }
  }

  .label {
    display: flex;
    margin: 0.1em 0 0.2em 0;
    color: #6a737d;
    font-weight: bold;
    & > svg {
      margin-right: 0.3em;
    }
  }
`;

const Description = styled.pre`
  color: #cdcdcd;
  padding-top: 1.5em;
  padding-bottom: 5em;
  font-size: 1.5em;
  white-space: pre-wrap;
`;

const FirstRiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #CDD4DC;
  background-color: #16181b;
  padding: 1em;
  border: 1px dashed #3a3d42;
  border-radius: 1rem;

  .problem {
    display: flex;
    margin-bottom: 0;
    font-size: 1.1rem;
    .index {
      font-weight: bold;
      white-space: nowrap;
    }
  }

  & > button {
    background-color: #195ba3;
    color: var(--light-white);
    
    font-weight: bold;
    margin-top: 2em;
  }
`;
