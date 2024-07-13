import { GiJigsawBox } from "react-icons/gi";
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
  color: #ECECEC;
  padding: 1.3rem 0.5rem;
  border : 2px solid white;
  border-radius: 1rem;
`;

const SpinnerIcon = styled(GiJigsawBox)`
  animation: ${spin} 2s linear infinite;
  font-size: 4rem;
  color: #35a85f;
`;

export default function GreenroomLoading() {
  return (
    <StyledContainer>
      <h1>Chew.. Chew...</h1>
      <SpinnerIcon />
    </StyledContainer>
  );
}
