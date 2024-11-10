import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { HttpError } from "../../network/HttpClient";
import { useEffect, useState } from "react";

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
  const [message, setMessage] = useState('메세지 없음');

  useEffect(() => {
    if (error.statusCode === 400) {
      // 필드 누락, 잘못된 형식으로 요청
      setMessage('400번 오류');
    }
  
    if (error.statusCode === 401) {
      return setMessage('인증 오류');
    }
  
    if (error.statusCode === 403) {
      return setMessage('인증 만료');
    }
  
    if (error.statusCode === 404) {
      return setMessage('Not Found');
    }
  
    if (error.statusCode === 409) {
      // 이미 존재하는데, 리소스 충돌
      return setMessage('Conflict!');
    }
  
    if (error.statusCode === 429) {
      // ratelimit 
      return setMessage('Rate limit');
    }
    
    if (error.statusCode === 500) {
      // 서버 오류
      return setMessage('서버 오류');
    }

  }, [error.statusCode]);
  
  if (error) {
    return (
      <StyledContainer>
        <h1>에러 코드: {error.statusCode}</h1>
        <p>에러 메세지: {message}</p>
      </StyledContainer>
    );
  }
  
  return (
    <StyledContainer>
      <h1>알 수 없는 에러</h1>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
