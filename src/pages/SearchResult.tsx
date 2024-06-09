import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (keyword && keyword.length > import.meta.env.VITE_MAX_LENGTH_SEARCH_KEYWORD) {
      navigate('/404', { state: { message: '잘못된 접근: 검색 키워드 글자수 오류' } });
    }

    if (!keyword || keyword.length === 0) {
      navigate('/404', { state: { message: '잘못된 접근: 존재하지 않는 검색' } });
    }
  }, [keyword, navigate]);

  return (
    <StyledContainer>
      <h1>"{keyword}" 으(로) 검색된 판도라 리스트들</h1>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  border: 1px solid white;
  width: 80%;
  height: 800px;
`;
