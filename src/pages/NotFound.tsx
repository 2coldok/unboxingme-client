import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function NotFound() {
  const location = useLocation();
  const message = location.state.message || "존재하지 않는 페이지입니다";

  return (
    <StyledContainer>
      <h1>404 Error</h1>
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
