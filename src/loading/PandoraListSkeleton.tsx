import styled, { keyframes } from 'styled-components';

export default function PandoraListSkeleton() {
  return (
    <SkeletonList>
      <h2 className="title">
        <SkeletonBox width={200} height={20} />
      </h2>
      <InfoWrapper>
        <div className="left-contents">
          <p className="writer">
            <SkeletonBox width={100} height={20} />
          </p>
          <p className="view-createdat">
            <SkeletonBox width={150} height={15} />
          </p>
          <p className="label">
            <SkeletonBox width={80} height={15} />
          </p>
        </div>
        <div className="right-contents">
          <p className="state">
            <SkeletonBox width={60} height={15} />
          </p>
        </div>
      </InfoWrapper>
    </SkeletonList>
  );
}

const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBox = styled.div<{ width: number, height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: linear-gradient(90deg, var(--gray200) 25%, var(--gray100) 50%, var(--gray200) 75%);
  background-size: 200% 100%;
  animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
  border-radius: 4px;
`;

const SkeletonList = styled.li`
  background-color: var(--black100);
  border-bottom: 1px solid var(--gray200);
  padding: 1em 1.5em 1em 1em;
  border-radius: 0.3em;

  .title {
    margin: 0;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .writer {
    display: flex;
    margin: 0.9em 0 0.2em 0;
  }

  .view-createdat {
    display: flex;
    margin: 0.3em 0 0.2em 0;
  }

  .label {
    display: flex;
    margin: 0.6em 0 0 0;
  }

  .state {
    display: flex;
  }
`;
