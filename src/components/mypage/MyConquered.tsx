import {useEffect, useState } from "react";
import { IDashboardService } from "../../service/DashboardService";
import { useNavigate } from "react-router-dom";
import { HttpError } from "../../network/HttpClient";
import { Pagination } from "../../util/Pagination";
import { getInSession, saveInSession } from "../../util/storage";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";
import { IMyConquereds } from "../../types/dashboard";
import { IPandoraList } from "../../types/pandora";
import styled from "styled-components";

interface IPandoraServiceProps {
  dashboardService: IDashboardService;
}

export default function MyConquered({ dashboardService }: IPandoraServiceProps) {
  const [pandoras, setPandoras] = useState<IPandoraList[] | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrnetPage] = useState(getInSession<number>('conquered_currentPage') || 1);
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  
  useEffect(() => {
    const fetchMyConqueredPandoras = async () => {
      try {
        startLoading();
        const data = await dashboardService.getMyConqueredPandoras(currentPage);
        const { pandoras, total} = data.payload;
        setPandoras(pandoras);
        setTotalItems(total);
        saveInSession<IMyConquereds>(`conquered_${currentPage}`, data.payload);
      } catch (error) {
        if(error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      } finally {
        stopLoading();
      }
    }

    const cachedPandoras = getInSession<IMyConquereds>(`conquered_${currentPage}`);
    if (cachedPandoras) {
      setPandoras(cachedPandoras.pandoras);
      setTotalItems(cachedPandoras.total);
    } else {
      fetchMyConqueredPandoras();
    }
  }, [dashboardService, navigate, currentPage, startLoading, stopLoading]);

  if (!pandoras || isLoading) {
    return (
      <LoadingSpinner />
    )
  }
  
  return (
    <>
      <Title>열람 ({totalItems})</Title>
      <PandoraList 
        action="conquered"
        pandoras={pandoras}
        keyword=""
      />
      <PaginationWrapper>
        <Pagination
          type='conquered'
          currentPage={currentPage}
          setCurrentPage={setCurrnetPage}
          totalItems={totalItems}
          itemsPerPage={10}
          maxVisibleTotalPages={5}
        />
      </PaginationWrapper>
    </>
  );
}

const Title = styled.h3`
  margin-left: 1em;
`;

// 모바일 화면시 하단 네비게이션 바와 떨어뜨리기 위함
const PaginationWrapper = styled.div`
  margin-bottom: 100px;
`;
