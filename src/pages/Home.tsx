import styled from "styled-components";
import Search from "../components/Search";

export default function Home() {
  return (
    <StyledContainer>
      <h1>RiddleNote</h1>
      <SearchWrapper>
        <Search keyword={''}/>
      </SearchWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%; 
  border: 2px solid green;
  margin-top: 5em;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  @media (max-width: 900px) {
    width: 100%;
  }
  background-color: red;
`;