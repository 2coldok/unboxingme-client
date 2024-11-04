import { useEffect, useState } from "react";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../util/Pagination";
import { getInSession, saveInSession } from "../../util/storage";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";
import { IMyPandoras, IPandoraList } from "../../types/pandora";
import styled from "styled-components";


interface IMyPandorasProps {
  pandoraService: IPandoraService;
}

export default function MyPandoras({ pandoraService }: IMyPandorasProps) {
  const [pandoras, setPandoras] = useState<IPandoraList[] | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(getInSession<number>(`mine_currentPage`) || 1);
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchMyPandoras = async () => {
      try {
        startLoading();
        const data = await pandoraService.getMyPandoras(currentPage);
        const { total, pandoras } = data.payload;
        setPandoras(pandoras);
        setTotalItems(total);
        saveInSession<IMyPandoras>(`mine_${currentPage}`, data.payload);
      } catch (error) {
        navigate('/fallback/error', { state: { error: error } });
      } finally {
        stopLoading();
      }
    }

    const cachedPandoras = getInSession<IMyPandoras>(`mine_${currentPage}`);
    if (cachedPandoras) {
      setPandoras(cachedPandoras.pandoras);
      setTotalItems(cachedPandoras.total);
    } else {
      fetchMyPandoras();
    }
  }, [pandoraService, navigate, startLoading, stopLoading, currentPage]);

  if (!pandoras || isLoading) {
    return (
      <LoadingSpinner />
    );
  }
  
  return (
    <>
      <Title>나의 게시물 {`(${totalItems})`}</Title>
      <PandoraList
          action="detail"
          keyword=""
          pandoras={pandoras}
        />
      
      <PaginationWrapper>
        <Pagination 
          type='mine'
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={5}
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