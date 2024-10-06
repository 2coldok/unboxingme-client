import { useEffect, useState } from "react";
import { IDashboardService } from "../../service/DashboardService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";

interface IPandoraServiceProps {
  dashboardService: IDashboardService;
}

interface IPandoraConquered {
  id: string;
  label: string;
  writer: string;
  title: string;
  description: string;
  firstQuestion: string;
  firstHint: string;
  totalProblems: number;
  solvedAt: string | null;
}

export default function MyConquered({ dashboardService }: IPandoraServiceProps) {
  const [pandoras, setPandoras] = useState<IPandoraConquered[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyConqueredPandoras = async () => {
      try {
        /**
         * pagination 구현시 page 중앙관리
         */
        const page = 1;
        const data = await dashboardService.getMyConqueredPandoras(page);
        const { pandoras /**, total */ } = data.payload
        setPandoras(pandoras);
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
