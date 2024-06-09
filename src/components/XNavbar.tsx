import styled from "styled-components";


export default function XNavbar() {
  return (
    <StyledContainer>
      <h1>네비게이션 바</h1>
    </StyledContainer>
  );
}

const StyledContainer = styled.header`
  width: 100%;
  height: 70px;
  border: 1px solid #99C3FF;
`;