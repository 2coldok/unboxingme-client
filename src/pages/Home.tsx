import styled from "styled-components";
import Search from "../components/Search";

export default function Home() {
  return (
    <StyledContainer>
      <h1>Home pages</h1>
      <Search />
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid white;
  width: 80%;
  height: 800px;
`;
