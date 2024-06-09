import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

export default function XPandoras() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

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
