import styled from "styled-components";
import { IDashboardService } from "../service/DashboardService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLoading from "../loading/PageLoading";
import { IMyPandoraLog } from "../types/dashboard";
import { HttpError } from "../network/HttpClient";

interface IMyPandoraLogProps {
  dashboardService: IDashboardService;
}

export default function PandoraLog({ dashboardService }: IMyPandoraLogProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [myPandoraLog, setMyPandoraLog] = useState<IMyPandoraLog | null>(null);

  useEffect(() => {
    if (!id) {
      return navigate('fallback/404', { state: { message: '판도라 id가 존재하지 않습니다.' } });
    }

    const fetchMyPandoraLog = async () => {
      try {
        const data = await dashboardService.getMyPandoraLog(id);
        setMyPandoraLog(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          navigate('/fallback/error', { state: { error: error } });
        }
      }
    }

    fetchMyPandoraLog();
  }, [id, dashboardService, navigate]);

  if (!myPandoraLog) {
    return <PageLoading />
  }

  return (
    <StyledContainer>
      <span>라벨: {myPandoraLog.label}</span>
      <p>내가만든 수수께끼 총 문제수: {myPandoraLog.totalProblems}개</p>
      <p>조회수: {myPandoraLog.coverViewCount}</p>
      <p>풀이자 별명: {String(myPandoraLog.solverAlias)}</p>
      <p>풀이를 완료한 시점: {String(myPandoraLog.solvedAt)}</p>
      <p>note 열람 여부: {String(myPandoraLog.isCatUncovered)}</p>
      <br />
      <h1>도전자 현황</h1>
      {myPandoraLog.records.map((record) => (
        <LogWrapper>
          <p>실패횟수: {record.failCount}</p>
          <p>접근 제한 기간: {record.restrictedUntil}</p>
          <p>풀이중인 문제: {record.unsealedQuestionIndex ? `${record.unsealedQuestionIndex + 1}번` : '모든 문제 풀이 완료'}</p>
          <p>모든 문제 풀이 여부: {record.unboxing}</p>
          <p>도전 시작 시간: {record.createdAt}</p>
          <p>최근 도전 시간: {record.updatedAt}</p>
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