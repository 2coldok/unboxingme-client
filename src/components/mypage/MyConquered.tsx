import { useEffect, useState } from "react";
import { IDashboardService } from "../../service/DashboardService";
import { IMyConqueredPandora } from "../../types/dashboard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface IPandoraServiceProps {
  dashboardService: IDashboardService;
}

export default function MyConquered({ dashboardService }: IPandoraServiceProps) {
  const [pandoras, setPandoras] = useState<IMyConqueredPandora[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    dashboardService.getMyConqueredPandoras()
      .then(pandoras => setPandoras(pandoras))
      .catch((error) => setError(error.toStinrg()))
  }, [dashboardService]);

  const handleClick = (pandoraId: string) => {
    navigate(`/pandora/${pandoraId}/solverAlias`);
  }
  
  return (
    <StyledContainer>
      {pandoras.map((pandora) => (
        <PandoraWrapper onClick={() => handleClick(pandora.uuid)}>
          <h1>{pandora.label}</h1>
          <p>작성자: {pandora.writer}</p>
          <p>제목: {pandora.title}</p>
          <p>간략설명 :{pandora.description}</p>
          <p>조회수:{pandora.coverViewCount}</p>
          <p>첫번째 문제:{pandora.firstQuestion}</p>
          <p>힌트 :{pandora.firstHint}</p>
          <p>풀이 완료 시간: {pandora.solvedAt}</p>
          <p>에러내용 {String(error)}</p>
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
