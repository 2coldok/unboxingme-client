import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPandoraSearchResult } from "../types/pandora";
import Search from "../components/Search";
import PageLoading from "../loading/PageLoading";
import { IPandoraService } from "../service/PandoraService";
import { HttpError } from "../network/HttpClient";

interface ISearchResultProps {
  pandoraService: IPandoraService;
}

export default function SearchResult({ pandoraService }: ISearchResultProps) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const [pandoras, setPandoras] = useState<IPandoraSearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
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
        const data = await pandoraService.getPandoraSearchResult(keyword);
        if (data.success && data.payload) {
          setPandoras(data.payload);
        }
        if (data.success && data.payload?.length === 0) {
          setPandoras(null);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } })
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchResult();
  }, [keyword, navigate, pandoraService]);

  const handleClick = (id: string) => {
    navigate(`/pandora/${id}`);
  }

  if (!pandoras) {
    return (
      <StyledContainer>
        <Search />
        {isLoading ? (
          <PageLoading />
        ) : (
          <>
            <h1>"{keyword}" 으(로) 검색된 판도라 리스트들</h1>
            <h1>검색 결과를 찾을 수 없습니다.</h1>
          </>
        )  
        }
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Search />
      {isLoading ? (
        <PageLoading />
      ) : ( 
      <>
        <h1>"{keyword}" 으(로) 검색된 판도라 리스트들</h1>
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
      </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  border: 1px solid white;
  width: 80%;
  height: 800px;
`;

