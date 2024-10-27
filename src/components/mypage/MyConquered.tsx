import React, { Dispatch, useEffect, useState } from "react";
import { IDashboardService } from "../../service/DashboardService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";
import { Pagination } from "../../util/Pagination";
import { saveInSession } from "../../util/storage";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";

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
  totalProblems: number;
  coverViewCount: number;
  createdAt: string;
  isCatUncovered: boolean;
  solverAlias: string | null;
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
  
  return (
    <StyledContainer>
      <h1>열람 ({totalItems})</h1>
      {isLoading ? <LoadingSpinner /> : (
        <>
          <PandoraList 
            action="conquered"
            pandoras={pandoras}
            keyword=""
          />
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

