import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISearchService } from "../service/SearchService";
import { Ipandora } from "../service/SearchService";
import { format } from "date-fns";

interface ISearchResultProps {
  searchService: ISearchService;
}

export default function SearchResult({ searchService }: ISearchResultProps) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const [pandoras, setPandoras] = useState<Ipandora[]>([]);
  
  useEffect(() => {
    if (keyword && keyword.length > import.meta.env.VITE_MAX_LENGTH_SEARCH_KEYWORD) {
      navigate('/404', { state: { message: '잘못된 접근: 검색 키워드 글자수 오류' } });
      return;
    }

    if (!keyword || keyword.length === 0) {
      navigate('/404', { state: { message: '잘못된 접근: 존재하지 않는 검색' } });
      return;
    }

    searchService.getPandorasByKeyword(keyword)
      .then((pandoras) => setPandoras(pandoras))
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
        console.log(error);
      })
  }, [keyword, navigate, searchService]);

  return (
    <StyledContainer>
      <h1>"{keyword}" 으(로) 검색된 판도라 리스트들</h1>
      <ul>
        {pandoras.map((pandora) => (
          <li key={pandora.id}>
            <h3>{pandora.title}</h3>
            <p>{pandora.description}</p>
            <p>{pandora.firstQuestion}</p>
            <p>{pandora.firstHint}</p>
            <p>{pandora.maxOpen}</p>
            <p>{pandora.openCount}</p>
            <p>{format(pandora.createdAt, 'yyyy-MM-dd')}</p>
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
