import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import GreenroomLoading from "../loading/GreenroomLoading";
import { HttpError } from "../network/HttpClient";
import { IInitialRiddleFail } from "../types/unboxing";
import PageLoading from "../loading/PageLoading";

interface IRiddleProps {
  unboxingService: IUnboxingService;
}

interface IProblem {
  question: string;
  hint: string;
  totalProblems: number;
  unsealedQuestionIndex: number;
}

export default function Riddle({ unboxingService }: IRiddleProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<IProblem | null>(null);
  const [failCount, setFailCount] = useState<number | null>(null);
  const [submitAnswer, setSubmitAnswer] = useState('');
  const [unboxingLoading, setUnboxingLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    const fetchInitialRiddle = async () => {
      try {
        const data = await unboxingService.getInitialRiddle(id);
        if (data.payload.type === 'success') {
          const initialRiddle = data.payload;
          setProblem({ 
            question: initialRiddle.currentQuestion, 
            hint: initialRiddle.currentHint, 
            totalProblems: initialRiddle.totalProblems, 
            unsealedQuestionIndex: initialRiddle.unsealedQuestionIndex
          });

          setFailCount(initialRiddle.failCount);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          if (error.payload) {
            const payload = error.payload as IInitialRiddleFail;
            if (payload.type === 'fail' && payload.reason === 'NOT_FOUND_RECORD') {
              return await setupInitialRiddle();
            }
            if (payload.type === 'fail' && payload.reason === 'PENELTY_PERIOD') {
              return navigate('/fallback/penalty');
            }
          }
          return navigate('/fallback/error', { state: { error: error, payload: error.payload } });
        }
      }
    }

    const setupInitialRiddle  = async () => {
      try {
        const data = await unboxingService.setupInitialRiddle(id);
        if (data.payload.type === 'success') {
          const initialRiddle = data.payload;

          setProblem({ 
            question: initialRiddle.currentQuestion, 
            hint: initialRiddle.currentHint, 
            totalProblems: initialRiddle.totalProblems, 
            unsealedQuestionIndex: initialRiddle.unsealedQuestionIndex
          });

          setFailCount(initialRiddle.failCount);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error, payload: error.payload } });
        }
      }
    }

    fetchInitialRiddle();
  }, [id, navigate, unboxingService]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitAnswer(event.target.value);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnboxingLoading(true);
    if (!id) {
      return navigate('/fallback/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }
    
    const fetchNextRiddle = async () => {
      try {
        const data = await unboxingService.getNextRiddle(id, submitAnswer);
        const nextRiddle = data.payload;
        const { isCorrect, unboxing, isPenaltyPeriod, question, hint, unsealedQuestionIndex } = nextRiddle;
        
        if (!isCorrect && isPenaltyPeriod) {
          return navigate('/fallback/penalty');
        }
        if (unboxing || question === null || hint === null || unsealedQuestionIndex === null) {
          return navigate(`/pandora/${id}/solveralias`);
        }

        setProblem({ 
          question: question, 
          hint: hint, 
          totalProblems: nextRiddle.totalProblems, 
          unsealedQuestionIndex: unsealedQuestionIndex
        });

        setFailCount(nextRiddle.failCount);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error, payload: error.payload } });
        }
      } finally {
        setUnboxingLoading(false);
        setSubmitAnswer('');
      }
    }

    fetchNextRiddle();
  };

  if (!problem || failCount === null) {
    return (
      <PageLoading />
    );
  }

  return (
    <StyledContainer>
      {unboxingLoading ? (
        <GreenroomLoading />
      ) : (
        <GreenroomWrapper>
          <p>{problem.unsealedQuestionIndex + 1} / {problem.totalProblems}</p>
          <h1>문제 {problem.unsealedQuestionIndex + 1}번</h1>
          <p>문제 : {problem.question}</p>
          <p>힌트 : {problem.hint}</p>
          <span>정답 : </span>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='answer'
              placeholder='정답을 입력하세여'
              value={submitAnswer}
              onChange={handleChange}
              autoFocus
            />
            <button type="submit">정답 제출</button>
          </form>
          <p>총 실패 횟수 : {failCount}번</p>
        </GreenroomWrapper>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ECECEC;
  border: 1px solid #54ce7d;
  width: 80%;
  height: 800px;
`;

const GreenroomWrapper = styled.section`
  border: 2px solid #995fc5;
  border-radius: 1rem;
  padding: 0.8rem;
`;
