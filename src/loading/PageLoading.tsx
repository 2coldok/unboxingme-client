// import { FaSpinner } from "react-icons/fa";
import { GiJigsawBox } from "react-icons/gi";
import styled, { keyframes } from "styled-components";

interface PageLoadingProps {
  type: 'limpidity' | 'opacity';
}

export default function PageLoading({ type }: PageLoadingProps) {
  return (
    <ModalContainer $type={type}>
      <StyledContainer>
        <><SpinnerIcon /></>
        <h3>Loading...</h3>
     </StyledContainer>
    </ModalContainer>
  );
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ModalContainer = styled.div<{ $type: 'limpidity' | 'opacity' }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.$type === 'opacity' ? 'black' : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 2px solid blue; */
`;

const SpinnerIcon = styled(GiJigsawBox)`
  animation: ${spin} 2s linear infinite;
  font-size: 3em;
  /* color: #ECECEC; */
  color: #35a85f;
`;
