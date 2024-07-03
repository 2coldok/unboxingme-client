import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";

interface IGreenroomProps {
  unboxingmeService: IUnboxingService;
}

export default function Greenroom({ unboxingmeService }: IGreenroomProps) {
  const location = useLocation();
  const state = location.state as { pandoraId?: string, firstQuestion?: string, firstHint?: string} | null;
  const navigate = useNavigate();
  
  const [question, setQuestion] = useState<string | undefined>(undefined);
  const [hint, setHint] = useState<string | undefined>(undefined);

  const [submitAnswer, setSubmitAnswer] = useState('');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [message, setMessage] = useState<string | undefined>(undefined);
  
  // location.state 가 null일 경우 + pandoraId 속성이 없을 경우 대비
  useEffect(() => {
    if (!state?.pandoraId || !state?.firstHint || !state?.firstQuestion) {
      navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    setQuestion(state?.firstQuestion);
    setHint(state?.firstHint);
  }, [state, navigate]);

  // useEffect훅이 실행되기 전 컴포넌트가 렌더링되기 때문에,
  // pandoraId 가 없을 때 useEffect 훅이 실행되기 전 렌더링 과정의 오류를 방지
  if (!state?.pandoraId || !state?.firstHint || !state?.firstQuestion) {
    return null;
  }

// const { pandoraId } = state;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitAnswer(event.target.value);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // todo
    event.preventDefault();
    const challenge = {
      pandoraId: state.pandoraId as string,
      currentProblemIndex: currentProblemIndex,
      submitAnswer: submitAnswer
    };

    unboxingmeService.getGateWay(challenge)
      .then((result) => {
        if (result.isCorrect && !result.unboxing) {
          setCurrentProblemIndex(prev => prev + 1);
          setQuestion(result.question as string);
          setHint(result.hint as string);
        } else if (!result.isCorrect) {
          setMessage(`실패 횟수 : ${result.failCount}번 제한 패널티 : ${result.restrictedUntil}까지, 해결하지 못한 문제 index : ${result.unsealedQuestionIndex}`);
        } else if (result.isCorrect && result.unboxing) {
          setCurrentProblemIndex(prev => prev + 1);
          setMessage(`비밀 메세지 : ${result.cat} 판도라 상자 열린 여부 : ${result.unboxing}`)
        }
      }).catch((error) => setMessage(error.toString()));    
  };

  return (
    <StyledContainer>
      <p>문제 : {question}</p>
      <p>힌트 : {hint}</p>
      <span>정답 : </span>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='answer'
          placeholder='정답을 입력하세여'
          value={submitAnswer}
          onChange={handleChange}
        />
        <button type="submit">정답 제출</button>
     </form>
     <p>결과 : {message}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  color: black;
  border: 1px solid #54ce7d;
  width: 80%;
  height: 800px;
`;
