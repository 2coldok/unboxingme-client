import { useEffect, useState } from "react";
import { IDashboardService } from "../../service/DashboardService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IMyConquered } from "../../types/dashboard";
import { HttpError } from "../../network/HttpClient";

interface IPandoraServiceProps {
  dashboardService: IDashboardService;
}

export default function MyConquered({ dashboardService }: IPandoraServiceProps) {
  const [pandoras, setPandoras] = useState<IMyConquered[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyConqueredPandoras = async () => {
      try {
        const data = await dashboardService.getMyConqueredPandoras(1);
        setPandoras(data.payload);
      } catch (error) {
        if(error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      }
    }

    fetchMyConqueredPandoras();
  }, [dashboardService, navigate]);

  const handleClick = (pandoraId: string) => {
    navigate(`/pandora/${pandoraId}/solveralias`);
  }
  
  return (
    <StyledContainer>
      {pandoras.map((pandora) => (
        <PandoraWrapper onClick={() => handleClick(pandora.id)}>
          <h1>라벨: {pandora.label}</h1>
          <p>작성자: {pandora.writer}</p>
          <p>제목: {pandora.title}</p>
          <p>간략설명 :{pandora.description}</p>
          <p>첫번째 문제:{pandora.firstQuestion}</p>
          <p>첫번째 힌트 :{pandora.firstHint}</p>
          <p>총 문제수: {pandora.totalProblems}</p>
          <p>풀이 완료 시간: {pandora.solvedAt}</p>
        </PandoraWrapper>
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
  color: white;
`;

const PandoraWrapper = styled.div`
  border: 4px solid yellow;
`;
