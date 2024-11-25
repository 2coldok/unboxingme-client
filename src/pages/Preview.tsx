import styled from "styled-components";


export default function Preview() {
  return (
    <>
      <StyledContainer>
        <img src="/logo.png" alt="logo" />
        <span>RiddleNote</span>
        
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 1146px;
  height: 600px;
  background-color: #181d24;

  padding-left: 3em;
  img {
    flex: 1;
    max-height: 29%;
    object-fit: contain;
    margin-bottom: 2em;
  }

  span {
    font-family: "Grandstander", cursive;
    flex: 3.3;
    font-size: 9rem;
    /* text-align: center; */
    /* white-space: nowrap; */
    font-weight: 600;
    
  }
`;