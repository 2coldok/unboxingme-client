import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "../../util/Pagination";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";
import styled from "styled-components";
import { ITEMS_PER_PAGE } from "../../constant/pageItems";
import { useMinesQuery } from "../../hook/QueryHook";

export default function MyPandoras() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const { 
    isLoading, 
    data = { payload: { total: 0, pandoras: [] } },
    error 
  } = useMinesQuery(Number(page));

  useEffect(() => {
    setSearchParams({ tab: 'mines', page: String(currentPage) });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
   isLoading ? startLoading() : stopLoading(); 
  }, [isLoading, startLoading, stopLoading]);

  useEffect(() => {
    if (error) {
      return navigate('/fallback/error', { state: { error: error }, replace: true });
    }
  }, [navigate, error]);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }
  
  return (
    <>
      <Title>나의 메시지 ({data.payload.total})</Title>
      {data.payload.total === 0 && (
        <Empty>
          내가 만든 메시지가 없습니다.
        </Empty>
      )}
      <PandoraList
        action="detail"
        pandoras={data.payload.pandoras}
      />

      {data.payload.total > 0 && (
        <PaginationWrapper>
        <Pagination 
          type='mine'
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={data.payload.total}
          itemsPerPage={ITEMS_PER_PAGE.mine}
          maxVisibleTotalPages={5}
        />
        </PaginationWrapper>
      )}
    </>
  );
}

const Empty = styled.div`
  border: 1px dashed #676767;
  background-color: var(--background-riddle);
  margin: 1em;
  padding: 1em;
  border-radius: 0.7rem;
  min-height: 100px;
`;

const Title = styled.h3`
  margin-left: 1em;
`;

// 모바일 화면시 하단 네비게이션 바와 떨어뜨리기 위함
const PaginationWrapper = styled.div`
  margin-bottom: 100px;
`;