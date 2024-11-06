import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import { Pagination } from "../util/Pagination";
import PandoraListSkeleton from "../loading/PandoraListSkeleton";
import PandoraList from "../components/PandoraList";
import { useSearchResultQuery } from "../hook/QueryHook";
import { useLoading } from "../hook/LoadingHook";
import { ITEMS_PER_PAGE } from "../constant/pageItems";

export default function SearchResult() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const page = searchParams.get('page') || '1';
  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const { startLoading, stopLoading } = useLoading();

  const { 
    isLoading, 
    data = { payload: { total: 0, pandoras: []} }, 
    error 
  } = useSearchResultQuery(keyword, Number(page));

  useEffect(() => {
    setSearchParams({ keyword: keyword, page: String(currentPage) });
  }, [currentPage, keyword, setSearchParams]);

  // Top loading bar
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
      <>
        <SearchWrapper>
          <Search keyword={keyword} />
        </SearchWrapper>
        <PandoraListSkeleton />
      </>
    )
  }

  return (
    <>
      <SearchWrapper>
        <Search keyword={keyword} />
      </SearchWrapper>
      {data.payload.total > 0 ? (
        <>
          <PandoraList
            action="cover"
            keyword={keyword}
            pandoras={data.payload.pandoras}
          />
          <Pagination
            type='search'
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={data.payload.total}
            itemsPerPage={ITEMS_PER_PAGE.searchResult}
            maxVisibleTotalPages={5}
          />
        </>
      ) : (
        <NoContent>
          <h1>검색 결과가 없습니다.</h1>
          <p>* 게시글 작성자가 설정한 키워드를 통해서만 검색할 수 있습니다.</p>
          <p>* 열람된 게시물은 검색 결과에서 제외됩니다.</p>
          <p>* 키워드는 대소문자 및 띄어쓰기를 구분합니다.</p>
        </NoContent>
      )}
    </>
  );
}

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.4em;
`;
