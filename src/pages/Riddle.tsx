import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HttpError } from "../network/HttpClient";
import { useLoading } from "../hook/LoadingHook";
import RiddleProgress from "../util/RiddleProgress";
import { PANDORA_FORM } from "../constant/constraints"; 
import { getRemainingAttempts } from "../util/remainingAttempts";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { useAuth } from "../hook/AuthHook";
import Firework from "../components/Firework";

interface IRiddle {
  status: 'riddle';
  question: string;
  hint: string | null;
  unsealedQuestionIndex: number;
  totalProblems: number;
  failCount: number;
  isCorrect?: boolean; // next riddle을 불러온경우에는 isCorrect담겨있음
}

interface IRiddleProps {
  unboxingService: IUnboxingService;
}

export default function Riddle({ unboxingService }: IRiddleProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [userColor, setUserColor] = useState<'challenger' | 'penalty' | 'solver'| null>(null);
  const [riddle, setRiddle] = useState<IRiddle | null>(null);
  const [restrictedUntil, setRestrictedUntil] = useState<string | null>(null); // ISO string. format변환은 cover 컴포넌트에서.
  const [submitAnswer, setSubmitAnswer] = useState('');
  const { csrfToken } = useAuth();

  /*****폭죽 */
  const [fireAction, setFireAction] = useState(false);

  useEffect(() => {
    if (fireAction) {
      const timer = setTimeout(() => {
        setFireAction(false);
      }, 1000);
  
      return () => clearTimeout(timer);
    }
  }, [fireAction]);



  useEffect(() => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    if (!csrfToken) {
      return;
    }

    const fetchInitialRiddle = async () => {
      try {
        startLoading();
        const data = await unboxingService.setInitialRiddle(id, csrfToken);
        const status = data.payload.status;

        // 페널티 기간일 경우
        if (status === 'penalty') {
          setRestrictedUntil(data.payload.restrictedUntil);
          return setUserColor('penalty');
        }

        // 정상일 경우
        if (status === 'riddle') {
          setUserColor('challenger')
          setRiddle(data.payload);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error }, replace: true })
        }
      } finally {
        stopLoading();
      }
    }

    fetchInitialRiddle();
  }, [id, navigate, unboxingService, startLoading, stopLoading, csrfToken]);

  useEffect(() => {
    if (userColor === 'penalty' && restrictedUntil) {
      return navigate(`/pandora/${id}`, { state: { userColor: 'penalty', restrictedUntil: restrictedUntil }, replace: true });
    }

    if (userColor === 'solver') {
      return navigate(`/pandora/${id}/solveralias`, { replace: true });
    }
  }, [userColor, restrictedUntil, id, navigate]);

  const handleLogoClick = () => {
    return navigate('/');
  }

  const handleSubmit = () => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }
    
    if (submitAnswer.trim().length === 0) {
      return;
    }

    if (!csrfToken) {
      return;
    }

    const fetchNextRiddle = async () => {
      try {
        startLoading();
        const data = await unboxingService.getNextRiddle(id, submitAnswer.trim(), csrfToken);
        const status = data.payload.status;
        if (status === 'penalty') {
          setRestrictedUntil(data.payload.restrictedUntil);
          return setUserColor('penalty');
        }
        if (status === 'end') {
          return setUserColor('solver');
        }
        if (status === 'riddle') {
          if (data.payload.isCorrect) {
            setFireAction(true);////////////////////// 폭죽
          }
          
          setUserColor('challenger');
          setRiddle(data.payload);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error }, replace: true });
        }
      } finally {
        stopLoading();
        setSubmitAnswer('');
      }
    }

    fetchNextRiddle();
  };

  if (isLoading || !riddle || !userColor) {
    return <LoadingSpinner />
  }

  return (
    <StyledContainer>
      <RiddleWrapper>
        <TopWrapper>
          <Logo onClick={handleLogoClick}>
            <img src="/logo.png" alt="logo" />
            <span>RiddleNote</span>
          </Logo>
          {riddle.totalProblems > 1 && (
            <RiddleProgressWrapper>
              <RiddleProgress
                currentStep={riddle.unsealedQuestionIndex}
                totalSteps={riddle.totalProblems}
              />
            </RiddleProgressWrapper>
          )}
        </TopWrapper>
        <MiddleWrapper>
          <QuestionWrapper>
            {riddle.question}
          </QuestionWrapper>
          <InputAnswerWrapper>
            <HintWrapper>
              {riddle.hint}
            </HintWrapper>
            <input
              type="text"
              placeholder="정답"
              value={submitAnswer}
              maxLength={PANDORA_FORM.maxAnswerLength}
              required
              onChange={(e) => setSubmitAnswer(e.target.value)}
              autoComplete="off"
            />
            {riddle.failCount > 0 && <span>남은 시도 횟수: {getRemainingAttempts(riddle.failCount)}</span>}
          </InputAnswerWrapper>

        </MiddleWrapper>

        <ButtonWrapper>
          <button onClick={handleSubmit}>정답 제출</button>
        </ButtonWrapper>


        <Firework action={fireAction} />
      </RiddleWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const RiddleWrapper = styled.div`
  position: relative; /////////////////////////////////// 폭죽을위해
  overflow: hidden; /////////////////////////////////// 폭죽을위해
  background-color: #252932;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 50%;
  max-width: 1000px;
  border-radius: 1rem;
  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

// top
const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  height: 60px;
  border-bottom: 1px solid var(--border);
  @media (max-width: 768px) {
    flex-direction: column;
    border-style: none;
    /* margin-top: 1em; */
    padding: 0;
    height: 120px;
  }
`;

const Logo = styled.p`
  display: flex;
  align-items: center;
  flex-grow: 0;
  font-weight: bold;
  font-size: 1.3em;
  cursor: pointer;

  img {
    width: 30px;
    height: auto;
    margin-right: 0.5em;
  }

  span {
    margin-top: 0.2em;
    font-family: "Grandstander", cursive;
    font-weight: 600;
  }
`;

const RiddleProgressWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    font-size: 0.7em;
  }
`;

const MiddleWrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// left
const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: 1em 1.2em;
  font-size: 1.1em;
  /* overflow-y: auto; */
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100%;
    height: 70%;
  }
`;

// right
const InputAnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 1.5em;
  @media (max-width: 768px) {
    width: 100%;
    height: 30%;
  }

  input {
    width: 100%;
    height: 2.5em;
  }

  // 남은 시도 횟수
  span {
    display: flex;
    align-self: flex-start;
    margin-top: 5px;
    margin-left: 5px;
    color: var(--font-warning);

  }
`;

const HintWrapper = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: 5px;
  margin-bottom: 12px;
  color: var(--font-chore);

  // 전구
  svg {
    margin-right: 0.3em;
    color: #efe282;
  }
`

// bottom
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
  width: 100%;
  height: 60px;
  padding-bottom: 20px;
  padding-right: 25px;
  @media (max-width: 768px) {
    padding: 10px;
  }

  button {
    height: 40px;
    @media (max-width: 768px) {
      width: 100%;
    
    }
  }
`;
