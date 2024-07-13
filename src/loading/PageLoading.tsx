import { FaSpinner } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;
  hegiht: 200px;

  background-color: #18202c;
  padding: 1.3rem 0.5rem;
  border : 2px solid white;
  border-radius: 1rem;
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: ${spin} 2s linear infinite;
  font-size: 3rem;
  color: #ECECEC;
`;

export default function PageLoading() {
  return (
    <StyledContainer>
      <h1>페이지가 로딩중입니다..</h1>
      <SpinnerIcon />
    </StyledContainer>
  );
}
