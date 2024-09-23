import styled from "styled-components";

export default function PenaltyFallback() {
  return (
    <StyledContainer>
      <h1>패널티 기간입니다</h1>
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
