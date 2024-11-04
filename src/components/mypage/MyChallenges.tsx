import styled from "styled-components";
import { IDashboardService } from "../../service/DashboardService";
import { useEffect, useState } from "react";
import { IMyChallenge } from "../../types/dashboard";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";
import { getInSession, saveInSession } from "../../util/storage";
// import { HiOutlineDocumentText } from "react-icons/hi";

interface IMyChallengesProps {
  dashboardService: IDashboardService;
}

export default function MyChallenges({ dashboardService }: IMyChallengesProps) {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [myChallenges, setMyChallenges] = useState<IMyChallenge[] | null>(null);

  useEffect(() => {
    const fetchMyChallenges = async () => {
      try {
        startLoading();
        const data = await dashboardService.getMyChallenges();
        setMyChallenges(data.payload);
        saveInSession<IMyChallenge[]>('challenge', data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      } finally {
        stopLoading();
      }
    }

    const cachedPandoras = getInSession<IMyChallenge[]>('challenge');
    if (cachedPandoras) {
      setMyChallenges(cachedPandoras);
    } else {
      fetchMyChallenges();
    }
  }, [navigate, dashboardService, startLoading, stopLoading]);

  if (!myChallenges || isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      <Title>진행중</Title>
      <PandoraList
        action="cover"
        keyword=""
        pandoras={myChallenges}
       />
    </>
  );
}

const Title = styled.h3`
  margin-left: 1em;
`;