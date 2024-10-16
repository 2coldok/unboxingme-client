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
import { GoClock } from "react-icons/go"; // created
import { HiOutlineDocumentText } from "react-icons/hi"; // totalProblems
import { LoadingSpinner } from "../loading/LoadingSpinner";

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
    <StyledContainer>
      {isLoading || !pandoraCover ? (
        <LoadingSpinner />
      ) : (
        <CoverWrapper>
          <HeadWrapper>
            <h1 className="title">{pandoraCover.title}</h1>
            <p className="writer"><IoPerson /> {pandoraCover.writer}</p>
            <p className="view-created"><LuEye /> {pandoraCover.coverViewCount} &nbsp;·&nbsp; <GoClock /> {pandoraCover.createdAt}</p>
            <p className="total"><HiOutlineDocumentText /> {pandoraCover.totalProblems} 문제</p>
            <p className="label"><IoIosFingerPrint /> {pandoraCover.label}</p>
          </HeadWrapper>
          
          <DescriptionWrapper>
            <pre>{pandoraCover.description}</pre>
          </DescriptionWrapper>
          
          <RiddleWrapper>
            <div className="question">
              <p className="index">질문 1. &nbsp;</p>
              <p className="content">{pandoraCover.firstQuestion}</p>
            </div>
            {/* */}
            <button className="button" onClick={handleChallengeClick}>노트 확인하기</button>
          </RiddleWrapper>  
        </CoverWrapper>
      )}

      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </StyledContainer>
  );
}
    
const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  
  width: 100%;
  /* margin: 3em; */
  /* padding-left: 0.4rem;
  padding-right: 0.4rem; */
  padding: 4em;
  @media (max-width: 768px) {
    padding: 0;
  }

  .description {
    font-size: 1rem;
    font-weight: bold;
  }
`;

const CoverWrapper = styled.div`
  border: 1px solid #5a5a5a;;
  border-radius: 1em;
  overflow: hidden;
`

const HeadWrapper = styled.div`
  background-color: #1c1f24;
  padding: 1.5rem;
  /* border-bottom: 0.5px solid #757575; */

  .title {
    color: #1775d9;
    margin: 0;
  }

  .writer {
    margin: 0.1em 0 0 0;
  }

  .view-created {
    margin: 0.1em 0 0 0;
    color: #686868;
  }

  .label {
    margin: 0.1em 0 0 0;
    color: #686868;
  }

  .total {
    margin: 0.1em 0 0 0;
    color: #686868;
  }
`

const DescriptionWrapper = styled.div`
  padding: 1.5em 1em 5em 1em;
  font-size: 1.5em;
  & > pre {
    white-space: pre-wrap;
  }
`

const RiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #d1d7e0;
  padding: 1rem;
  margin-top: auto;
  margin-left: 2em;
  margin-right: 2em;
  margin-bottom: 2em;
  border: 1px dashed #626262;
  border-radius: 1em;

  .question {
    display: flex;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 1.2rem;

    .index {
      white-space: nowrap;
      color: #767676;
    }

    .content {
      font-size: 1.2rem;
    }
  }

  .hint {
    display: flex;
    margin-bottom: 0;
    font-size: 1.2rem;
    font-weight: bold;

    .bulb {
      color: #f4ff7f;
      white-space: nowrap;
    }

    .content {

    }
  }

  .button {
    margin-top: 2em;
  }
`;
