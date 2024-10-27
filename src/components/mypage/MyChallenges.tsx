import styled from "styled-components";
import { IDashboardService } from "../../service/DashboardService";
import { useEffect, useState } from "react";
import { IMyChallenge } from "../../types/dashboard";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";
// import { HiOutlineDocumentText } from "react-icons/hi";

interface IMyChallengesProps {
  dashboardService: IDashboardService;
}

export default function MyChallenges({ dashboardService }: IMyChallengesProps) {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [myChallenges, setMyChallenges] = useState<IMyChallenge[]>([]);

  useEffect(() => {
    startLoading();
    const fetchMyChallenges = async () => {
      try {
        const data = await dashboardService.getMyChallenges();
        setMyChallenges(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      } finally {
        stopLoading();
      }
    }

    fetchMyChallenges();
  }, [navigate, dashboardService, startLoading, stopLoading]);

  return (
    <StyledContainer>
      <h1>진행중</h1>
      <small>최근 최대 10개의 목록</small>
      {isLoading && <LoadingSpinner />}
      <PandoraList
        action="cover"
        keyword=""
        pandoras={myChallenges}
       />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin-left: 0.5em;
`;
