import styled from "styled-components";
import { IDashboardService } from "../../service/DashboardService";
import { useEffect, useState } from "react";
import { IMyChallenge } from "../../types/dashboard";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";
import { IoPerson } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { formatTimeAgo } from "../../util/formatTimeAgo";
import { IoIosFingerPrint } from "react-icons/io";
import RiddleProgress from "../../util/RiddleProgress";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
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

  const handleClick = (id: string) => {
    return navigate(`/pandora/${id}`);
  };

  return (
    <StyledContainer>
      <h1>진행중</h1>
      <p>최근 최대 10개의 목록</p>
      {isLoading && <LoadingSpinner />}
      <ul>
        {myChallenges.map((challenge) => (
          <ChallengeList key={challenge.id}>
            <h2 className="title" onClick={() => handleClick(challenge.id)}>{challenge.title}</h2>
            <p className="writer"> <IoPerson /> {challenge.writer}</p>
            <span className="viewcount"> <LuEye />  {challenge.coverViewCount}</span>
            <span className="created"> · {formatTimeAgo(challenge.createdAt)}</span>
            <p className="label"><IoIosFingerPrint /> {challenge.label}</p>
            
            <div className="progress-wrapper">
              <RiddleProgress currentStep={challenge.unsealedQuestionIndex} totalSteps={challenge.totalProblems} />
            </div>
           
  
            {challenge.isPenaltyPeriod && (
              <p className="penalty">{challenge.restrictedUntil} 까지 접근이 제한됩니다.</p>
            )}
            <p className="br"></p>
          </ChallengeList>
        ))}
      </ul>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin-left: 0.5em;
`;

const ChallengeList = styled.li`
  .title {
    color: #3b90f9;
    margin: 0 0 0.3em 0;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
  
  .writer {
    color: #cbcbcb;
    font-weight: bold;
    margin: 0 0 0.2em 0;
  }

  .viewcount {
    color: #686868;
  }

  .created {
    color: #686868;
  }

  .total {
    color: #686868;
    margin: 0;
  }

  .br {
    width: 100%;
    height: 0.5px;
    background-color: #606060;
  }

  .label {
    margin: 0.1em 0 0 0;
    font-size: 0.8em;
    color: #646464;
  }

  .penalty {
    color: red;
  }

  .progress-wrapper {
    margin: 1em 0 1em 0;    
  }
`
