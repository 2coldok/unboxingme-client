import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import GreenroomLoading from "../loading/GreenroomLoading";
import { HttpError } from "../network/HttpClient";
import PageLoading from "../loading/PageLoading";
import { IInitialRiddleFailByPenalty, IInitialRiddleFailbyIneligible } from "../types/unboxing";

interface IRiddleProps {
  unboxingService: IUnboxingService;
}

interface IRiddle {
  question: string;
  hint: string;
  unsealedQuestionIndex: number;
  totalProblems: number;
  failCount: number;
}

export default function Riddle({ unboxingService }: IRiddleProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [riddle, setRiddle] = useState<IRiddle | null>(null);
  const [submitAnswer, setSubmitAnswer] = useState('');
  const [unboxingLoading, setUnboxingLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    const fetchInitialRiddle = async () => {
      try {
        const data = await unboxingService.getInitialRiddle(id);
        if (data.payload.status === 'riddle') {
          const initialRiddle = data.payload;
          setRiddle({  
            question: initialRiddle.question, 
            hint: initialRiddle.hint, 
            unsealedQuestionIndex: initialRiddle.unsealedQuestionIndex,
            totalProblems: initialRiddle.totalProblems,
            failCount: initialRiddle.failCount
          });
        }
      } catch (error) {
        if (error instanceof HttpError) {
          if (error.payload && error.payload.status === 'penalty') {
            const payload = error.payload as IInitialRiddleFailByPenalty;
            return navigate('/fallback/penalty', { state: { restrictedUntil: payload.restrictedUntil, failCount: payload.failCount }, replace: true });
          }
          if (error.payload && error.payload.status === 'ineligible') {
            const payload = error.payload as IInitialRiddleFailbyIneligible;
            if (payload.reason === 'NOT_FOUND_RECORD') {
              return setupInitialRiddle();
            }
            if (payload.reason === 'INACTIVE') {
              return navigate('/fallback/error', { state: { error: error, payload: payload }, replace: true });
            }
            if (payload.reason === 'SOLVED') {
              return navigate('/fallback/error', { state: { error: error, payload: payload }, replace: true });
            }
            if (payload.reason === 'MINE') {
              return navigate('/fallback/error', { state: { error: error, payload: payload}, replace: true });
            }           
          }
          return navigate('/fallback/error', { state: { error: error, payload: error.payload }, replace: true });
        }
      }
    }

    const setupInitialRiddle  = async () => {
      try {
        const data = await unboxingService.setupInitialRiddle(id);
        if (data.payload.status === 'riddle') {
          const initialRiddle = data.payload;
          setRiddle({ 
            question: initialRiddle.question, 
            hint: initialRiddle.hint, 
            unsealedQuestionIndex: initialRiddle.unsealedQuestionIndex,
            totalProblems: initialRiddle.totalProblems,
            failCount: initialRiddle.failCount
          });
        }
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error, payload: error.payload }, replace: true });
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
        const payload = data.payload;
        if (payload.status === 'end') {
          return navigate(`/pandora/${id}/solveralias`, { replace: true });
        }
        if (payload.status === 'penalty') {
          return navigate('/fallback/penalty', { state: { restrictedUntil: payload.restrictedUntil, failCount: payload.failCount }, replace: true });
        }
        if (payload.status === 'riddle') {
          setRiddle({
            question: payload.question,
            hint: payload.hint,
            unsealedQuestionIndex: payload.unsealedQuestionIndex,
            totalProblems: payload.totalProblems,
            failCount: payload.failCount
          });
        }
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

  if (!riddle) {
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
          <p>{riddle.unsealedQuestionIndex + 1} / {riddle.totalProblems}</p>
          <h1>문제 {riddle.unsealedQuestionIndex + 1}번</h1>
          <p>문제 : {riddle.question}</p>
          <p>힌트 : {riddle.hint}</p>
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
          <p>총 실패 횟수 : {riddle.failCount}번</p>
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
