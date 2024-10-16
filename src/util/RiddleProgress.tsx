import styled from 'styled-components';

interface IRiddleProgressProps {
  totalSteps: number;
  currentStep: number;
}

export function RiddleProgress({ totalSteps, currentStep }: IRiddleProgressProps) {
  return (
    <StyledContainer>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <>
            <Square
              filled={index < currentStep}
              isCurrent={index === currentStep}
            >
              {index + 1}
            </Square>
            {index < totalSteps - 1 && <Line filled={index < currentStep} />}
          </>
        ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Square = styled.div<{ filled: boolean; isCurrent: boolean }>`
  width: 2em;
  height: 2em;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-weight: bold;
  /* border: ${({ filled }) => (filled ? '1px solid #44d97b' : '1px solid #a0a0a0')};
  color: ${({ filled }) => (filled ? '#44d97b' : '#a0a0a0')}; */
  border: ${({ filled, isCurrent }) =>
    isCurrent ? '2px solid #c4c4c4' : filled ? '1px solid #44d97b' : '1px solid #8b8b8b'};
  color: ${({ filled, isCurrent }) =>
    isCurrent ? '#c8c8c8' : filled ? '#44d97b' : '#838383'};
`;

const Line = styled.div<{ filled: boolean }>`
  width: 0.4em;
  height: 1px;
  border-bottom: 1px solid ${({ filled }) => (filled ? '#44d97b' : '#aab7cb')};
`;

export default RiddleProgress;
