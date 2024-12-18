import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 20px;
`;

const Spinner = styled.div`
  /* border: 4px solid #262d3b; */
  border: 4px solid #464b58;
  /* border-top: 4px solid var(--light-blue); */
  border-top: 4px solid #738ac2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export function LoadingSpinner() {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
}
