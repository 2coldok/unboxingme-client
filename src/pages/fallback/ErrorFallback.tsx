import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { HttpError } from "../../network/HttpClient";

export default function ErrorFallback() {
  const location = useLocation();
  // HttpError의 제네릭 타입을 캐치하기위해 payload 데이터가 필요함!
  // const payload = location.state?.payload;
  // if (!payload) {
  //   return (
  //     <StyledContainer>
  //       <h1>Error Fallback Page</h1>
  //       <p>payload가 할당되지 않았습니다.</p>
  //     </StyledContainer>
  //   )
  // }
  const error: HttpError<null> = location.state.error;

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
