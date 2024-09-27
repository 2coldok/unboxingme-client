import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function PenaltyFallback() {
  const location = useLocation();
  const restrictedUntil = location.state?.restrictedUntil;
  const failCount = location.state?.failCount;

  if (!restrictedUntil && !failCount) {
    return (
      <StyledContainer>
        <h1>restrictedUntil 또는 failCount를 할당받지 못했습니다.</h1>
      </StyledContainer>
    )
  }
  return (
    <StyledContainer>
      <h1>패널티 기간입니다</h1>
      <p>총 실패 회수 {failCount}</p>
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
