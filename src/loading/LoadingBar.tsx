import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const LoadingBar = styled.div<{ isLoading: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  /* background-color: #3498db; */
  background-color: var(--light-blue);
  z-index: 9999;
  width: ${({ isLoading }) => (isLoading ? '100%' : '0')};
  animation: ${({ isLoading }) => (isLoading ? loadingAnimation : 'none')} 2s ease-out;
  transition: width 0.3s;
`;

export default LoadingBar;