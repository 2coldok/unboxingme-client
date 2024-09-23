import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function LoginFailureFallback() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get('message');

  return (
    <StyledContainer>
      { message ? (
        <h1>{message}</h1>
      ) : (
        <h1>Unknown login error. Please try again</h1>
      ) }
      
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
  background-color: blue;
  color: white;
`;
