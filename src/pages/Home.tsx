import styled from "styled-components";
import Search from "../components/Search";

export default function Home() {
  return (
    <StyledContainer>
      <h2>Show me the keyword</h2>
      <Search keyword={''} />
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  
  margin-top: 140px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;
