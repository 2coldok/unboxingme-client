import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { HttpError } from "../../network/HttpClient";

export default function ErrorFallback() {
  const location = useLocation();
  const payload = location.state.payload;
  const error: HttpError<typeof payload> = location.state.error;

  if (error) {
    return (
      <StyledContainer>
        <h1>Error Fallback Page</h1>
        <h3>Code {error.statusCode}</h3>
        <p>{error.message}</p>
      </StyledContainer>
    );
  }
  
  return (
    <StyledContainer>
      <h1>Undefined Error Page</h1>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: navy;
  color: #ECECEC;
`;
