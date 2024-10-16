import React, { Dispatch, useEffect, useState } from "react";
import { IDashboardService } from "../../service/DashboardService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";
import { IoPerson } from "react-icons/io5";
import { IoIosFingerPrint } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { formatTimeAgo } from "../../util/formatTimeAgo";
import { Pagination } from "../../util/Pagination";
import { saveInSession } from "../../util/storage";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";

interface IPandoraServiceProps {
  dashboardService: IDashboardService;
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

interface IPandoraConquered {
  id: string;
  label: string;
  writer: string;
  title: string;
  coverViewCount: number;
  solvedAt: string;
  createdAt: string;
}

export default function MyConquered({ dashboardService, currentPage, setCurrentPage }: IPandoraServiceProps) {
  const [pandoras, setPandoras] = useState<IPandoraConquered[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  

  useEffect(() => {
    startLoading();
    const fetchMyConqueredPandoras = async () => {
      try {
        const data = await dashboardService.getMyConqueredPandoras(currentPage);
        saveInSession('conquered-currentPage', currentPage);
        const { pandoras, total} = data.payload;
        setPandoras(pandoras);
        setTotalItems(total);
      } catch (error) {
        if(error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      } finally {
        stopLoading();
      }
    }

    fetchMyConqueredPandoras();
  }, [dashboardService, navigate, currentPage, startLoading, stopLoading]);

  const handleClick = (pandoraId: string) => {
    navigate(`/pandora/${pandoraId}/solveralias`);
  }
  
  return (
    <StyledContainer>
      <h1>열람 ({totalItems})</h1>
      {isLoading ? <LoadingSpinner /> : (
        <>
          <ul>
            {pandoras.map((pandora) => (
              <ConqueredList key={pandora.id}>
                <h2 className="title" onClick={() => handleClick(pandora.id)}>{pandora.title}</h2>
                <p className="writer"><IoPerson /> {pandora.writer}</p>
                <span className="viewcount"> <LuEye /> {pandora.coverViewCount}</span>
                <span className="created"> · {formatTimeAgo(pandora.createdAt)}</span>
                <p className="label"><IoIosFingerPrint /> {pandora.label}</p>
                <p className="solved-at">{pandora.solvedAt} 완료</p>
                <p className="br"></p>
              </ConqueredList>
            ))}
         </ul>
         <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={10}
            maxVisibleTotalPages={5}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  background-color: green;
  color: white; */
`;

const ConqueredList = styled.li`
  h2 {
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
`;
