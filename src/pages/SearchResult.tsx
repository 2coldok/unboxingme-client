import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import PageLoading from "../loading/PageLoading";
import { IPandoraService } from "../service/PandoraService";
import { HttpError } from "../network/HttpClient";
import { getInSession, saveInSession } from "../util/storage";
import { useLoading } from "../hook/LoadingHook";


interface ISearchResultProps {
  pandoraService: IPandoraService;
}

interface IPandoraSearched {
  id: string;
  writer: string;
  title: string;
  description: string;
  coverViewCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function SearchResult({ pandoraService }: ISearchResultProps) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const [pandoras, setPandoras] = useState<IPandoraSearched[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();
  
  useEffect(() => {
    startLoading();
    if (keyword && keyword.length > import.meta.env.VITE_MAX_LENGTH_SEARCH_KEYWORD) {
      navigate('/fallback/404', { state: { message: '잘못된 접근: 검색 키워드 글자수 오류' } });
      return;
    }

    if (!keyword || keyword.length === 0) {
      navigate('/fallback/404', { state: { message: '잘못된 접근: 존재하지 않는 검색' } });
      return;
    }

    const fetchSearchResult = async () => {
      try {
        const data = await pandoraService.getPandoraSearchResult(keyword, 1);
        const { pandoras /** , total */ } = data.payload;
        const saveState = saveInSession<IPandoraSearched[]>(`search-${keyword}-1`, pandoras);
        if (saveState !== 'success') {
          return navigate('/fallback/session', { state: { type: saveState } });
        }
        setPandoras(pandoras);
      } catch (error) {
        if (error instanceof HttpError) {
          navigate('/fallback/error', { state: { error: error, type: error.payload } });
        }
      } finally {
        stopLoading();
      }
    }

    /**
     * 페이지네이션 구현시 page,상태를 중앙관리
     */
    const page = 1;
    
    const cachedPandoras = getInSession<IPandoraSearched[]>(`search-${keyword}-${page}`);
    if (cachedPandoras) {
      setPandoras(cachedPandoras);
      stopLoading()
    } else {
      fetchSearchResult();
    }
  }, [keyword, navigate, pandoraService, startLoading, stopLoading]);

  const handleClick = (id: string) => {
    return navigate(`/pandora/${id}`);
  }

  return (
    <StyledContainer>
      <SearchWrapper>
        <Search keyword={keyword as string} />
      </SearchWrapper>
     
      {isLoading ? (
        <PageLoading type={'limpidity'} />
      ) : ( 
      <>
        {pandoras.length > 0 ? (
          <ul>
            {pandoras.map((pandora) => (
              <li key={pandora.id} onClick={() => handleClick(pandora.id)}>
                <h1>uuid: {pandora.id}</h1>
                <h3>제목: {pandora.title}</h3>
                <h2>작성자: {pandora.writer}</h2>
                <p>설명: {pandora.description}</p>
                <p>생성일: {pandora.createdAt}</p>
                <p>수정일: {pandora.updatedAt}</p>
                <p>조회수: {pandora.coverViewCount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h1>검색 결과를 찾을 수 없습니다.</h1>
        )}
      </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 100%;
  padding-left: 0.8em;
  padding-right: 0.8em;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 70%;
  margin-top: 1.5em;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
