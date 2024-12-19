import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }

  100% { 
    transform: rotate(360deg); 
  }
`;

const LoadingContainer = styled.div<{ absolute: boolean }>`
  position: ${({ absolute }) => absolute ? 'absolute' : 'static'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 20px;
`;

const Spinner = styled.div<{ border: string | undefined, bordertop: string | undefined }>`
  border: ${({ border }) => border ? `4px solid ${border}` : '4px solid #252932'};
  border-top: ${({ bordertop }) => bordertop ? `4px solid ${bordertop}` : '4px solid #77aaff'};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

interface ILoadingSpinnerProps {
  absolute?: boolean; 
  border?: string;
  bordertop?: string;
}

export function LoadingSpinner({ absolute, border, bordertop }: ILoadingSpinnerProps) {
  return (
    <LoadingContainer absolute={!!absolute}>
      <Spinner border={border} bordertop={bordertop} />
    </LoadingContainer>
  );
}
