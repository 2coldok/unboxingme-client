import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HttpError } from "../../network/HttpClient";
import { useEffect, useState } from "react";

export default function ErrorFallback() {
  const navigate = useNavigate();
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
      setMessage('잘못된 형식의 요청입니다.');
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
      return setMessage('요청 한도를 초과하였습니다. 잠시후 다시 시도해주세요.');
    }
    
    if (error.statusCode === 500) {
      // 서버 오류
      return setMessage('서버 오류');
    }

  }, [error.statusCode]);

  const handleClick= () => {
    return navigate('/');
  };
  
  if (error) {
    return (
      <StyledContainer>
        <StyledWrapper>
          <Logo>
            <img src="/logo.png" alt="logo" />
            <span>RiddleNote Error</span>
          </Logo>
          <StatusCode>{error.statusCode}</StatusCode>
          <Message>{message}</Message>
          
          <FallbackButtonWrapper>
            <button onClick={handleClick}>홈으로 이동</button>
          </FallbackButtonWrapper>
          
          
        </StyledWrapper>
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
  width: 100%;
  height: 100vh;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 50%;
  max-width: 800px;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background-color: #181d24;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  flex-grow: 0;
  font-weight: bold;
  font-size: 1.3em;
  cursor: pointer;
  padding-top: 1em;
  padding-bottom: 1em;
  margin: 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 20%;


  img {
    width: 30px;
    height: auto;
    margin-left: 0.7em;
    margin-right: 0.5em;
  }

  span {
    margin-top: 0.2em;
    font-family: "Grandstander", cursive;
    font-weight: 600;
  }
`;

const StatusCode = styled.div`
  text-align: center;
  
  font-size: 5em;
  font-weight: 900;
  /* background-color: blue; */
  height: 30%;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  

  height: 30%;
  overflow-y: auto;
  /* background-color: gray; */
`;

const FallbackButtonWrapper = styled.div`
  display: flex;
  /* background-color: green; */
  align-items: center;
  justify-content: center;
  height: 20%;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;