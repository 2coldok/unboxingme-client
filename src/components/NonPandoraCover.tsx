import styled from "styled-components";


export default function NonPandoraCover() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <h3>수수께끼 정보를 불러올 수 없습니다.</h3>
        <p>* 이미 열람되어 비공개로 전환되었거나 존재하지 않는 수수께끼 입니다.</p>
      </StyledWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledWrapper = styled.div`
  width: 80%;
  /* padding: 0.8em; */

  @media (max-width: 768px) {
    width: 95%;
  }
`
