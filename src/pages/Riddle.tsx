import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import { IInitialRiddleSuccess } from "../types/unboxing";

import { FaLightbulb } from "react-icons/fa"; //힌트
import RiddleProgress from "../util/RiddleProgress";
import { LoadingSpinner } from "../loading/LoadingSpinner";

interface IRiddleProps {
  unboxingService: IUnboxingService;
}

interface IRiddle {
  status: 'riddle';
  question: string;
  hint: string;
  unsealedQuestionIndex: number;
  totalProblems: number;
  failCount: number;
}

interface ILocationState {
  payload: IInitialRiddleSuccess;
}

export default function Riddle({ unboxingService }: IRiddleProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation() as { state: ILocationState };
  const [riddle, setRiddle] = useState<IRiddle | null>(null);
  const [submitAnswer, setSubmitAnswer] = useState('');
  const [unboxingLoading, setUnboxingLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    if (!location.state?.payload) {
      return navigate('/fallback/404', { state: { message: '잘못된 접근: state를 전달받지 못했습니다.' } });
    }

    const initialRiddle = location.state.payload;
    setRiddle(initialRiddle);
  }, [id, navigate, unboxingService, location]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitAnswer(event.target.value);
  };
  
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
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
          setRiddle(payload);
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

  return (
    <StyledContainer>
      {unboxingLoading || !riddle ? (
        <LoadingSpinner />
      ) : (
        
        <RiddleWrapper>
          <RiddleProgress currentStep={riddle.unsealedQuestionIndex} totalSteps={riddle.totalProblems} />
          <div className="question">
            <p className="index">질문 {riddle.unsealedQuestionIndex + 1}. &nbsp;</p>
            <p className="content">{riddle.question}</p>
          </div>
          
          <p className="hint"><FaLightbulb /> &nbsp;{riddle.hint}</p>
          <input
              type='text'
              name='answer'
              value={submitAnswer}
              onChange={handleChange}
              autoFocus
              autoComplete="off"
            />
          <p>총 실패 횟수 : {riddle.failCount}번</p>
          <button onClick={handleSubmit}>정답 제출</button>
          
        </RiddleWrapper>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RiddleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border: 2px solid #4e4e4f;
  border-radius: 1em;
  padding: 0.8em;

  
  
  .question {
    display: flex;
    flex-direction: row;
    margin-top: 1em;
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 1.5em;
    
    .index {
      white-space: nowrap;
      color: #767676;
      margin: 0;
    }

    .content {
      margin: 0;
    }
  }

  .hint {
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
    color: gray;
    & > svg {
      color: #efe282;
    }

    /* .index {
      white-space: nowrap;
      color: #efe282;
      font-weight: bold;
      font-size: 1.5rem;
    } */
  }

  & > input {
    width: 100%;
    height: 2.3em;
    background-color: #18191a;
    color: #4a689b;
    outline: none;
    border: 1px solid #4482ed;
    border-radius: 0.3em;
    font-size: 1em;
    padding: 0.5em;
  }
`;
