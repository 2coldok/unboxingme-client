import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import GreenroomLoading from "../loading/GreenroomLoading";
// import AccessRestriction from "../components/AccessRestriction";
import { HttpError } from "../network/HttpClient";
import { IInitialRiddleFail } from "../types/unboxing";

interface IRiddleProps {
  unboxingService: IUnboxingService;
}

interface IProblem {
  question: string;
  hint: string;
  totalProblems: number;
}

interface IPenaltyStatus {
  failCount: number;
  isPenaltyPeriod: boolean;
  restrictedUntil: string | null;
}

export default function Riddle({ unboxingService }: IRiddleProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
  const [problem, setProblem] = useState<IProblem | undefined>(undefined);
  const [penaltyStatus, setPenaltyStatus] = useState<IPenaltyStatus | undefined>(undefined);
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
          const { 
            totalProblems, 
            currentQuestion, 
            currentHint,
            unsealedQuestionIndex,
            failCount,
            restrictedUntil,
            isPenaltyPeriod
          } = data.payload;

          setPenaltyStatus({ failCount: failCount, isPenaltyPeriod: isPenaltyPeriod, restrictedUntil: restrictedUntil });
          setCurrentProblemIndex(unsealedQuestionIndex);
          setProblem({ question: currentQuestion, hint: currentHint, totalProblems: totalProblems});
        }
      } catch (error) {
        if (error instanceof HttpError && error.payload) {
          const payload = error.payload as IInitialRiddleFail;
          if (payload.type === 'fail' && payload.reason === 'NOT_FOUND_RECORD') {
            return await setupInitialRiddle();
          }
          navigate('/fallback/error', { state: { error: error, paylaod: error.payload } })
        }
        console.log('에러 캐치 실패')
      }
    }

    const setupInitialRiddle  = async () => {
      try {
        const data = await unboxingService.setupInitialRiddle(id);
        if (data.payload.type === 'success') {
          const { 
            totalProblems, 
            currentQuestion, 
            currentHint,
            unsealedQuestionIndex,
            failCount,
            restrictedUntil,
            isPenaltyPeriod
          } = data.payload;

          setPenaltyStatus({ failCount: failCount, isPenaltyPeriod: isPenaltyPeriod, restrictedUntil: restrictedUntil });
          setCurrentProblemIndex(unsealedQuestionIndex);
          setProblem({ question: currentQuestion, hint: currentHint, totalProblems: totalProblems});
        }
      } catch (error) {
        if (error instanceof HttpError) {
          navigate('/fallback/error', { state: { error: error, type: error.payload } });
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
    const challengeForm = {
      currentProblemIndex: currentProblemIndex,
      submitAnswer: submitAnswer
    };
    
    const fetchNextRiddle = async () => {
      try {
        const data = await unboxingService.getNextRiddle(id, challengeForm);
        const { 
          isCorrect,
          failCount,
          restrictedUntil,
          isPenaltyPeriod,
          unboxing,
          totalProblems,
          unsealedQuestionIndex, // 어디 쓸까..?
          question,
          hint,
         } = data.payload;
         
        if (isCorrect && !unboxing) {
          setCurrentProblemIndex(prev => prev + 1);
          setProblem((prev) => ({ ...prev, question: question, hint: hint, totalProblems: totalProblems } as IProblem));
        } else if (!isCorrect && isPenaltyPeriod) {
          setPenaltyStatus((prev) => ({ ...prev,  failCount: failCount, isPenaltyPeriod: isPenaltyPeriod, restrictedUntil: restrictedUntil}));
        } else if (isCorrect && unboxing && unsealedQuestionIndex === null && !isPenaltyPeriod && question === null && hint === null) {
          return navigate(`/pandora/${id}/solveralias`);
        } else {
          throw new Error('unboxingmeService.gateWay : 고려하지 않은 부분 발생');
        }
      } catch (error) {
        if (error instanceof HttpError) {
          navigate('/fallback/error', { state: { error: error, type: error.payload } });
        }
        
      } finally {
        setUnboxingLoading(false);
        setSubmitAnswer('');
      }
    }

    fetchNextRiddle();
  };
 
  // Todo 패널티 기간인데 restrictedUntil 값이 null일 경우를 고려해야할까? (서버에선 이를 허용하진 앟는다만..)
  // if (penaltyStatus?.isPenaltyPeriod) {
  //   const restrcitedUntil = penaltyStatus.restrictedUntil;
  //   return (
  //     <AccessRestriction restrictedUntil={restrcitedUntil} />
  //   );
  // }

  return (
    <StyledContainer>
      {unboxingLoading ? (
        <GreenroomLoading />
      ) : (
        <GreenroomWrapper>
          <p>{currentProblemIndex + 1} / {problem?.totalProblems}</p>
          <h1>문제 {currentProblemIndex + 1}</h1>
          <p>문제 : {problem?.question}</p>
          <p>힌트 : {problem?.hint}</p>
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
          <p>총 실패 횟수 : {String(penaltyStatus?.failCount)}</p>
          <p>패널티 여부 : {String(penaltyStatus?.isPenaltyPeriod)}</p>
          <p>언제까지 패널티? : {String(penaltyStatus?.restrictedUntil)}</p>
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
