import styled from "styled-components";
import { IDashboardService } from "../service/DashboardService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLoading from "../loading/PageLoading";
import { HttpError } from "../network/HttpClient";

interface IMyPandoraLogProps {
  dashboardService: IDashboardService;
}

interface IPandoraTarget {
  label: string;
  totalProblems: number;
  coverViewCount: number;
  solverAlias: string | null;
  solvedAt: string | null;
  isCatUncovered: boolean;
}

interface ILog {
  failCount: number,
  restrictedUntil: string | null,
  unsealedQuestionIndex: number,
  unboxing: boolean,
  createdAt: string,
  updatedAt: string
}

export default function PandoraLog({ dashboardService }: IMyPandoraLogProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [pandora, setPandora] = useState<IPandoraTarget | null>(null);
  const [logs, setLogs] = useState<ILog[]>([]);
  // const [myPandoraLog, setMyPandoraLog] = useState<IMyPandoraLog | null>(null);

  useEffect(() => {
    if (!id) {
      return navigate('fallback/404', { state: { message: '판도라 id가 존재하지 않습니다.' } });
    }

    const fetchMyPandoraLog = async () => {
      try {
        /**
         * pagination 구현시 page중앙 관리
         */
        const page = 1
        const data = await dashboardService.getMyPandoraLog(id, page);
        const { total, records, ...pandora } = data.payload;
        setPandora(pandora);
        setLogs(records);
        
        /**
         * total pagination구현시 사용
         */
        console.log(total);

      } catch (error) {
        if (error instanceof HttpError) {
          navigate('/fallback/error', { state: { error: error, payload: error.payload } });
        }
      }
    }

    fetchMyPandoraLog();
  }, [id, dashboardService, navigate]);

  if (!pandora) {
    return <PageLoading type={'opacity'} />
  }

  return (
    <StyledContainer>
      <span>라벨: {pandora.label}</span>
      <p>내가만든 수수께끼 총 문제수: {pandora.totalProblems}개</p>
      <p>조회수: {pandora.coverViewCount}</p>
      <p>풀이자 별명: {String(pandora.solverAlias)}</p>
      <p>풀이를 완료한 시점: {String(pandora.solvedAt)}</p>
      <p>note 열람 여부: {String(pandora.isCatUncovered)}</p>
      <br />
      <h1>도전자 현황</h1>
      {logs.map((log) => (
        <LogWrapper>
          <p>실패횟수: {log.failCount}</p>
          <p>접근 제한 기간: {String(log.restrictedUntil)}</p>
          <p>풀이중인 문제: {log.unsealedQuestionIndex + 1}</p>
          <p>모든 문제 풀이 여부: {String(log.unboxing)}</p>
          <p>도전 시작 시간: {log.createdAt}</p>
          <p>최근 도전 시간: {log.updatedAt}</p>
        </LogWrapper>
      ))}
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