import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function PenaltyFallback() {
  const location = useLocation();
  const restrictedUntil = location.state?.restrictedUntil;

  if (!restrictedUntil) {
    return (
      <StyledContainer>
        <h1>restrictedUntil을 할당받지 못했습니다.</h1>
      </StyledContainer>
    )
  }
  return (
    <StyledContainer>
      <h1>패널티 기간입니다</h1>
      <p>{restrictedUntil} 까지</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid red;
  color: pink;
`;
