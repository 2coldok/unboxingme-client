import styled from "styled-components";
import { IDashboardService } from "../service/DashboardService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ILog, IMyPandora } from "../types/dashboard";
import PageLoading from "../loading/PageLoading";

interface IMyPandoraLogProps {
  dashboardService: IDashboardService;
}

export default function MyPandoraLog({ dashboardService }: IMyPandoraLogProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [myPandora, setMyPandora] = useState<IMyPandora | undefined>(undefined);
  const [logs, setLogs] = useState<ILog[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: pandoraId가 정의되지 않음' } });
    }

    dashboardService.getPandoraLog(id)
      .then((pandoraLog) => {
        const { logs, ...myPandora} = pandoraLog;
        setMyPandora(myPandora);
        setLogs(logs);
      }).catch((error) => setError(error.toString()));
  }, [id, dashboardService, navigate]);

  if (!myPandora || !logs) {
    return <PageLoading />
  }

  return (
    <StyledContainer>
      <span>{myPandora.label} </span>
      <h1>{myPandora.title} 의 판도라에 대한 진행 상황</h1>
      <p>조회수: {myPandora.coverViewCount}</p>
      <p>풀이를 완료한자: {String(myPandora.solverAlias)}</p>
      <p>풀이를 완료한 시점: {String(myPandora.solvedAt)}</p>
      <p>최종 메세지 열람 확인 여부:{String(myPandora.isCatUncovered)}</p>
      <br />
      <h1>도전자 현황</h1>
      {logs.map((log) => (
        <LogWrapper>
          <p>도전 시작 시간: {log.createdAt}</p>
          <p>최근 도전 시간: {log.updatedAt}</p>
          <p>실패 횟수: {log.failCount}</p>
          <p>제한이 걸린 시간:{log.restrictedUntil} 까지</p>
          <p>진행상황: {myPandora.totalProblems} 문제중 {log.unsealedQuestionIndex + 1}번 풀이중</p>
          <p>성공 여부: {String(log.unboxing)}</p>
        </LogWrapper>

      ))}
      <p>에러: {String(error)}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  backround-color: blue;
  color: white;
`;

const LogWrapper = styled.div`
  background-color: black;
  color: white;
  padding: 1rem;
  margin: 3rem;
  border: 2px solid yellow;
`;
