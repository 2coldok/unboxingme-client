import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { useEffect, useState } from "react";
import { IPandoraCover } from "../types/pandora";
import { useAuth } from "../hook/AuthHook";
import PageLoading from "../loading/PageLoading";
import { HttpError } from "../network/HttpClient";
import { getInSession, saveInSession } from "../util/storage";
import { IUnboxingService } from "../service/UnboxingService";
import { useLoading } from "../hook/LoadingHook";
import Alert from "../util/Alert";

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
        const saveState = saveInSession<IPandoraCover>(`cover-${pandoraCover.id}`, pandoraCover);
        if (saveState !== 'success') {
          return navigate('/fallback/session', { state: { type: saveState } });
        }
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
    return <PageLoading type={'opacity'} />
  }

  return (
    <StyledContainer>
      {isLoading || !pandoraCover ? (
        <PageLoading type={'limpidity'} />
      ) : (
        <>
          <h1>판도라 uuid : {pandoraCover.id}</h1>
          <h3>고유 라벨: {pandoraCover.label}</h3>
          <p>작성자 : {pandoraCover.writer}</p>
          <p>제목: {pandoraCover.title}</p>
          <pre>설명: {pandoraCover.description}</pre>
          <p>조회수: {pandoraCover.coverViewCount}</p>
          
          <p>총 문제수: {pandoraCover.totalProblems}</p>
          <p>첫번째 질문: {pandoraCover.firstQuestion}</p>
          <p>첫번쨰 힌트: {pandoraCover.firstHint}</p>
          <p>생성일: {pandoraCover.createdAt}</p>
          <p>업데이트일: {pandoraCover.updatedAt}</p>

          <button onClick={handleChallengeClick}>도전하기</button>  
        </>
      )}

      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </StyledContainer>
  );
}
    
const StyledContainer = styled.main`
  background-color: #264283;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 3em;
  width: 100%;
  margin: 3em;
`;
