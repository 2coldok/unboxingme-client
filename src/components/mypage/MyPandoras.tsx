import styled from "styled-components";
import React, { Dispatch, useEffect, useState } from "react";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../util/Pagination";
import { saveInSession } from "../../util/storage";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";


interface IMyPandorasProps {
  pandoraService: IPandoraService;
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

export interface IMyPandora {
  id: string;
  label: string;
  writer: string;
  title: string;
  totalProblems: number;
  coverViewCount: number;
  createdAt: string;
  isCatUncovered: boolean;
}

export default function MyPandoras({ pandoraService, currentPage, setCurrentPage }: IMyPandorasProps) {
  const [pandoras, setPandoras] = useState<IMyPandora[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); 
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const fetchMyPandoras = async () => {
      try {
        const data = await pandoraService.getMyPandoras(currentPage);
        saveInSession<number>('mine-currentPage', currentPage);
        const { total, pandoras } = data.payload;
        
        setPandoras(pandoras);
        setTotalItems(total);
      } catch (error) {
        navigate('/fallback/error', { state: { error: error } });
      } finally {
        stopLoading();
      }
    }

    fetchMyPandoras();
  }, [pandoraService, navigate, currentPage, startLoading, stopLoading]);
  
  return (
    <StyledContainer>
      <h1>나의 게시물 {`(${totalItems})`}</h1>
      {isLoading ? <LoadingSpinner /> : (
        <PandoraList
          action="detail"
          keyword=""
          pandoras={pandoras}
        />
      )}
      {!isLoading && (
        <Pagination 
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={5}
          maxVisibleTotalPages={5}
          onPageChange={setCurrentPage}
        />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  /* background-color: #4dda59; */
  color: white;
  & > p {
    color: #b5b5b5;
    font-size: 1.5em;
    font-weight: bold;
  }

`;
