import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISearchService } from "../service/SearchService";
import { ISearchedPandoraByKeyword } from "../types/pandora";
import Search from "../components/Search";

interface ISearchResultProps {
  searchService: ISearchService;
}

export default function SearchResult({ searchService }: ISearchResultProps) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const [pandoras, setPandoras] = useState<ISearchedPandoraByKeyword[]>([]);
  
  useEffect(() => {
    if (keyword && keyword.length > import.meta.env.VITE_MAX_LENGTH_SEARCH_KEYWORD) {
      navigate('/404', { state: { message: '잘못된 접근: 검색 키워드 글자수 오류' } });
      return;
    }

    if (!keyword || keyword.length === 0) {
      navigate('/404', { state: { message: '잘못된 접근: 존재하지 않는 검색' } });
      return;
    }

    searchService.getSearchedPandorasByKeyword(keyword)
      .then((pandoras) => setPandoras(pandoras))
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
        console.log(error);
      })
  }, [keyword, navigate, searchService]);

  const handleClick = (pandoraId: string) => {
    navigate(`/pandora/${pandoraId}`);
  }

  return (
    <StyledContainer>
      <Search />
      <h1>"{keyword}" 으(로) 검색된 판도라 리스트들</h1>
      <ul>
        {pandoras.map((pandora) => (
          <li key={pandora.id} onClick={() => handleClick(pandora.id)}>
            <h3>제목: {pandora.title}</h3>
            <p>설명: {pandora.description}</p>
            <p>생성일: {pandora.createdAt}</p>
            <p>수정일: {pandora.updatedAt}</p>
            <p>조회수: {pandora.viewCount}</p>
          </li>
        ))}
      </ul>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  border: 1px solid white;
  width: 80%;
  height: 800px;
`;
