import styled from "styled-components";
import { IDashboardService } from "../../service/DashboardService";
import { useEffect, useState } from "react";
import { IMyChallenge } from "../../types/dashboard";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";

interface IMyChallengesProps {
  dashboardService: IDashboardService;
}

export default function MyChallenges({ dashboardService }: IMyChallengesProps) {
  const navigate = useNavigate();
  const [myChallenges, setMyChallenges] = useState<IMyChallenge[]>([]);

  useEffect(() => {
    const fetchMyChallenges = async () => {
      try {
        const data = await dashboardService.getMyChallenges();
        setMyChallenges(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      }
    }

    fetchMyChallenges();
  }, [navigate, dashboardService]);

  const handleClick = (id: string) => {
    return navigate(`/pandora/${id}`);
  };

  return (
    <StyledContainer>
      {myChallenges.map((challenge) => (
        <ChallengeWrapper onClick={() => handleClick(challenge.id)}>
          <h1>라벨:{challenge.label}</h1>
          <p>작성자: {challenge.writer}</p>
          <p>제목: {challenge.title}</p>
          <p>설명: {challenge.description}</p>
          <p>현재 진행중인 문제: {challenge.currentQuestion}</p>
          <p>현재 진행중인 문제의 힌트: {challenge.currentHint}</p>
          <p>총 문제수: {challenge.totalProblems}</p>
          <p>나의 총 실패 횟수: {challenge.failCount}</p>
          <p>나의 패널티 기간: {challenge.restrictedUntil}</p>
          <p>내가 풀이중인 문제 번호: {challenge.unsealedQuestionIndex ? `${challenge.unsealedQuestionIndex + 1}번` : '모든 문제 풀이 완료'}</p>
          <p>패널티 기간인가요? {String(challenge.isPenaltyPeriod)}</p>
          <p>나의 도전 시작시간: {challenge.createdAt}</p>
          <p>나의 최근 도전시간: {challenge.updatedAt}</p>
        </ChallengeWrapper>
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: black;
  color: white;
`;

const ChallengeWrapper = styled.div`
  background-color: blue;
  color: white;
  margin: 2rem;
  border: 5px solid yellow;
`;
