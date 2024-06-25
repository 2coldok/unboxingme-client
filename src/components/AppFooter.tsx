import styled from "styled-components";

export default function AppFooter() {
  return (
    <StyledContainer>
      <h1>footer</h1>
    </StyledContainer>
  );
}

const StyledContainer = styled.footer`
  margin-top: 500px;
  width: 100%;
  height: 70px;
  border: 1px solid #C0CA33;
`;

