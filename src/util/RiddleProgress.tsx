import styled from 'styled-components';
import { BsCheckSquare } from "react-icons/bs"; // 사각형
import React from 'react';

interface IRiddleProgressProps {
  totalSteps: number;
  currentStep: number;
}

export function RiddleProgress({ totalSteps, currentStep }: IRiddleProgressProps) {
  return (
    <StyledContainer>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {index < currentStep ? (
              <CheckedBox><BsCheckSquare color="#8ab4f8" /></CheckedBox>
            ) : (
              <Square isCurrent={index === currentStep}>
                {index + 1}
              </Square>

            )}
            
            {index < totalSteps - 1 && <Line filled={index < currentStep} />}
          </React.Fragment>
        ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const CheckedBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 2em;
  height: 2em;
  /* border: 1px solid yellow; */

  svg {
    margin: 0;
    font-size: 2em;
  }
`;

const Square = styled.div<{ isCurrent: boolean }>`
  width: 2em;
  height: 2em;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: ${({ isCurrent }) => isCurrent ? '1px solid var(--font-main)' : '1px solid #525357'};
  /* background-color: ${({ isCurrent }) => isCurrent? '#ececec' : '#292e33'}; */
  color: ${({ isCurrent }) => isCurrent ? 'var(--font-main)' : '#525357'};
`;

const Line = styled.div<{ filled: boolean }>`
  width: 0.4em;
  height: 1px;
  /* border-bottom: 1px solid ${({ filled }) => (filled ? '#44d97b' : '#aab7cb')}; */
  border-bottom: 1px solid #3f4147;
`;

export default RiddleProgress;
