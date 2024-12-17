import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
// import { useAuth } from "../hook/AuthHook";
import { HttpError } from "../network/HttpClient";

import { useLoading } from "../hook/LoadingHook";
import Alert from "../util/Alert";

import { IoPerson } from "react-icons/io5"; // writer
// import { LuEye } from "react-icons/lu"; 조회수
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { formatTime } from "../util/formatTimeAgo";
import { AiFillLock } from "react-icons/ai";
// import { BsUpc } from "react-icons/bs"; 라벨
// import Search from "../components/Search";
import Login from "../components/Login";
import { useCoverQuery } from "../hook/QueryHook";
import AppFooter from "../components/AppFooter";
import NonPandoraCover from "../components/NonPandoraCover";
import { FiSend } from "react-icons/fi";

export default function PandoraCover() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { isLoading, data = { payload: null }, error } = useCoverQuery(id);
  // const { getTokenStatus } = useAuth();
  const { startLoading, stopLoading} = useLoading();
  // const [searchParams] = useSearchParams();
  // const keyword = searchParams.get('keyword');
  const [showLoginPop, setShowLoginPop] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [checkTokenLoading, setCheckTokenLoading] = useState(false);

  // fallback from riddle page
  const location = useLocation();
  const state = location.state as { userColor?: string; restrictedUntil?: string };
  useEffect(() => {
    if (state?.userColor === 'penalty' && state.restrictedUntil) {
      return setAlertMessage(`${formatTime(state.restrictedUntil)} 까지 접근이 제한됩니다.`);
    }
    if (state?.userColor === 'maker') {
      // return setAlertMessage('나의 수수께끼는 마이페이지에서 확인할 수 있습니다.');
      return setAlertMessage('나의 메시지는 풀이할 수 없습니다.');
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
    setCheckTokenLoading(true);
    try {
      // const status = await getTokenStatus();
      // if (!status) {
      //   if (window.location.href.startsWith('http://localhost:5173')) {
      //     return setShowLoginPop(true);
      //   }

      //   window.location.href = `https://riddlenote.com/login?redirect=${encodeURIComponent(window.location.href)}`;
      // }

      return navigate(`/pandora/${id}/riddle`);
    } catch (error) {
      if (error instanceof HttpError) {
        return navigate('/fallback/error', { state: { error: error } })
      }
    } finally {
      setCheckTokenLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (data.payload === null) {
    return <NonPandoraCover />
  }

  return (
    <>   
      <CoverContainer>
        <CoverWrapper>
          <Title>{data.payload.title}</Title>
          <InfoWrapper>
            <div>
              <Writer> <IoPerson /> {data.payload.writer}</Writer>                  
              <MainInfo> 
                <AiFillLock /> {data.payload.totalProblems} ·&nbsp;
                <FiSend /> {formatTime(data.payload.createdAt)}
              </MainInfo>              
            </div>
            <div>
              <State $open={data.payload.isCatUncovered}>{data.payload.isCatUncovered ? '열람됨' : '미열람'}</State>
            </div>
          </InfoWrapper>

          <Divider></Divider>

          <ObfuscatedMessage>{data.payload.obfuscatedCat}</ObfuscatedMessage>
          <FirstRiddleWrapper>
            <div>
              <p className="index">
                질문 1. 
                &nbsp;
              </p>
              <p>{data.payload.firstQuestion}</p>
            </div>
            <button onClick={handleChallengeClick}>
              {checkTokenLoading ? '자격 확인중...' : '메시지 내용 확인하기'}
            </button>
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

// const SearchWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 30px;
// `;

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
  padding: 1.5em;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Title = styled.h2`
  color: var(--brand);
  font-weight: 700;
  font-size: 1.6em;
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

const Divider = styled.div`
  height: 1px;
  background-color: var(--border);
  margin-top: 20px;
`

const ObfuscatedMessage = styled.pre`
  font-size: 1.1em;
  padding-top: 3em;
  padding-bottom: 5em;
  padding-left: 0.4em;
  border-radius: 0;
  min-height: 10em;
  white-space: pre-wrap;
  overflow: hidden;

  filter: blur(7px);
`;

const FirstRiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border-top: 1px solid var(--border); */
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  background-color: var(--background-riddle);
  /* margin-top: 4em; */
  /* color: #6988e3; */
  
  padding: 1em;
  border-radius: 0.4rem;

  div {
    display: flex;
    margin-bottom: 0;
    font-size: 1.1rem;
    .index {
      /* display: flex; */
      font-weight: bold;
      white-space: nowrap;
      /* color: #394365; */
    }
  }

  button {
    margin-top: 2em;
  }
`;
