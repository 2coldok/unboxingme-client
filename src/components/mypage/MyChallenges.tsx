import styled from "styled-components";
import { IDashboardService } from "../../service/DashboardService";
import { useEffect, useState } from "react";
import { IMyChallenge } from "../../types/dashboard";
import { useNavigate } from "react-router-dom";

interface IMyChallengesProps {
  dashboardService: IDashboardService;
}

export default function MyChallenges({ dashboardService }: IMyChallengesProps) {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<IMyChallenge[]>([]);

  useEffect(() => {
    dashboardService.getMyChallenges()
      .then((pandoras) => setChallenges(pandoras))
      .catch((error) => console.log(error.toString()));      
  }, [dashboardService]);

  const handleClick = (uuid: string) => {
    navigate(`/pandora/${uuid}`);
  };

  return (
    <StyledContainer>
      {challenges.map((pandora) => (
        <ChallengeWrapper onClick={() => handleClick(pandora.uuid)}>
          <h1>{pandora.title}</h1>
          <h2>{pandora.label}</h2>
          <p>{pandora.writer}</p>
          <p>{pandora.description}</p>
          <p>{pandora.writer}</p>
          <h4>{pandora.firstQuestion}</h4>
          <h4>{pandora.firstHint}</h4>
          <p>{pandora.totalProblems}</p>
          <p>{pandora.coverViewCount}</p>
          <p>{pandora.createdAt}</p>
          <p>{pandora.updatedAt}</p>
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
