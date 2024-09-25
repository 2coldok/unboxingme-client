import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function NotFoundFallback() {
  const location = useLocation();
  const message = location.state?.message;

  if (!message) {
    return (
      <StyledContainer>
        <h1>error의 message가 정의되어 있지 않습니다.</h1>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer>
      <h1>Not Found Fallback Page</h1>
      <p>{message}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
