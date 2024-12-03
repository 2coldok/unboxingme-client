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
  const error: HttpError = location.state.error;
  const [message, setMessage] = useState('페이지 세션이 만료되었습니다.');

  useEffect(() => {
    if (error.statusCode === 400) {
      // 필드 누락, 잘못된 형식으로 요청
      setMessage('잘못된 형식의 요청입니다.');
    }
  
    if (error.statusCode === 401) {
      return setMessage('인증되지 않은 사용자입니다.');
    }
  
    if (error.statusCode === 403) {
      // if (error.statusText === 'csrf') {
      //   return setMessage('새로고침이 제한된 페이지입니다.');
      // }

      return setMessage('인증이 만료되었습니다.');
    }
  
    if (error.statusCode === 404) {
      return setMessage('데이터를 찾을 수 없습니다.');
    }
  
    if (error.statusCode === 409) {
      // 이미 존재하는데, 리소스 충돌
      return setMessage('Conflict error');
    }
  
    if (error.statusCode === 429) {
      // ratelimit 
      return setMessage('요청 한도를 초과하였습니다. 공공 WiFi를 사용자일 경우 로그인 후 이용해주세요.');
    }
    
    if (error.statusCode === 500) {
      // 서버 오류
      return setMessage('서버 오류');
    }

  }, [error.statusCode, error.statusText]);

  const handleClick= () => {
    return navigate(-1);
  };
  
  if (error) {
    return (
      <StyledContainer>
        <StyledWrapper>
          <Logo>
            <img src="/logo.png" alt="logo" />
            <span>RiddleNote: {error.statusText === 'csrf' ? 'Security' : error.statusCode}</span>
          </Logo>
          
          <Message>
            {message}
          </Message>
          
          <FallbackButtonWrapper>
            <button onClick={handleClick}>돌아기기</button>
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
  justify-content: space-between;
  width: 600px;
  @media (max-width: 768px) {
    width: 95%;
  }
  min-height: 300px;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background-color: #181d24;
  
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  flex-grow: 0;
  font-weight: bold;
  font-size: 1.3em;
  cursor: pointer;
  padding-top: 1em;
  margin: 0;

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

const Message = styled.p`
  width: 100%;
  white-space: pre-wrap;
  text-align: center;
  font-size: 1.1em;
  padding: 1em 2em;
  color: #ececec;
`;

const FallbackButtonWrapper = styled.div`
  display: flex;
  /* background-color: green; */
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
  /* height: 20%; */
  /* border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem; */
`;