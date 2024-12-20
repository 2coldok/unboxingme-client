import { v4 as uuidv4 } from "uuid";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { IRiddle, TFormSubject } from "../../types/form";
import { PANDORA_FORM } from "../../constant/constraints";
import { FORM_LENGTH_ERROR_MESSAGE } from "../../constant/errorMessage";
import { AiFillLock } from "react-icons/ai"; 

export interface IRiddlesFormProps {
  setFormSubject: React.Dispatch<React.SetStateAction<TFormSubject>>;
  riddles: IRiddle[];
  setRiddles: Dispatch<SetStateAction<IRiddle[]>>;
}

export default function RiddlesForm({ setFormSubject, riddles, setRiddles }: IRiddlesFormProps) {
  const handleAdd = () => {
    if (riddles.length >= PANDORA_FORM.maxTotalProblems) {
      return;
    }
    setRiddles(prev => [...prev, { id: uuidv4(), isQuestionValid: false, isHintValid: true, isAnswerValid: false, question: '', hint: '', answer: '' }]);
  };

  const handleRemove = (id: string) => {
    setRiddles(riddles.filter((riddle) => riddle.id !== id));
  };

  const handleChange = (id: string, field: keyof IRiddle, value: string) => {
    if (field === 'question') {
      return setRiddles(
        riddles.map((riddle) =>
          riddle.id === id ? { ...riddle, [field]: value, isQuestionValid: value.trim().length >= PANDORA_FORM.minQuestionLength } : riddle
        )
      );
    }

    if (field === 'hint') {
      return setRiddles(
        riddles.map((riddle) => 
          riddle.id === id ? { ...riddle, [field]: value, isHintValid: value.trim().length <= PANDORA_FORM.maxHintLegnth } : riddle
        )
      )
    }

    if (field === 'answer') {
      return setRiddles(
        riddles.map((riddle) =>
          riddle.id === id ? { ...riddle, [field]: value, isAnswerValid: value.trim().length >= PANDORA_FORM.minAnswerLength } : riddle
        )
      );
    }
  };

  const handleNextButton = () => {
    const isValid = riddles.every((riddle) => {
      return riddle.isQuestionValid && riddle.isHintValid && riddle.isAnswerValid
    });

    if (!isValid || riddles.length === 0) {
      return;
    }
  
    setRiddles((prevRiddles) =>
      prevRiddles.map((riddle) => ({
        ...riddle,
        question: riddle.question.trim().replace(/[\r\n]/g, ''),
        hint: riddle.hint.trim(),
        answer: riddle.answer.trim()
      }))
    );

    window.scrollTo({
      top: 0, 
      left: 0,
      behavior: 'smooth',
    });
    setFormSubject('post'); 
  };
  
  return (
    <>
      <Advice>* 이전 질문을 해결한 사용자에게만 다음 질문이 공개됩니다.</Advice>
      <ul>
        {riddles.map((riddle, index) => (
          <RiddleContainer key={riddle.id}>
            <RiddleIndex>
              <AiFillLock />
              문제 {index + 1}
            </RiddleIndex>
            <RiddleWrapper>
              <CloseWrapper>
                <IoClose className="close" onClick={() => handleRemove(riddle.id)} />
              </CloseWrapper>
              <SubTitle>
                질문
                {!riddle.isQuestionValid && <RequiredStar>*</RequiredStar>}
              </SubTitle>
              <QuestionWrapper>
                <textarea
                  maxLength={PANDORA_FORM.maxQuestionLength}
                  value={riddle.question}
                  onChange={(e) => handleChange(riddle.id, 'question', e.target.value)}
                  placeholder="질문 입력"
                  autoComplete="off"
                />
                <LengthCount>{riddle.question.length}/{PANDORA_FORM.maxQuestionLength}</LengthCount>
              </QuestionWrapper>
              <SubTitle>
                힌트 (선택)
              </SubTitle>
              <HintWrapper>
                <input 
                  type="text"
                  value={riddle.hint}
                  onChange={(e) => handleChange(riddle.id, 'hint', e.target.value)}
                  maxLength={PANDORA_FORM.maxHintLegnth}
                  placeholder="힌트 없음"
                  autoComplete="off"
                />
                <LengthCount>{riddle.hint.length}/{PANDORA_FORM.maxHintLegnth}</LengthCount>
              </HintWrapper>
              <SubTitle>
                정답
                {!riddle.isAnswerValid && <RequiredStar>*</RequiredStar>}
              </SubTitle>
              
              <AnswerWrapper>
                <input 
                  type="text"
                  value={riddle.answer}
                  onChange={(e) => handleChange(riddle.id, 'answer', e.target.value)}
                  maxLength={PANDORA_FORM.maxAnswerLength}
                  placeholder="정답 입력"
                  autoComplete="off"
                />
                <LengthCount>{riddle.answer.length}/{PANDORA_FORM.maxAnswerLength}</LengthCount>
              </AnswerWrapper>
            </RiddleWrapper>
          </RiddleContainer>
        ))}
      </ul>
      <AddRiddle onClick={handleAdd}>
        {riddles.length >= PANDORA_FORM.maxTotalProblems ? (
          <p>{FORM_LENGTH_ERROR_MESSAGE.totalProblems}</p>
        ) : (
          <>
            <p>질문 추가</p>
            <GrAddCircle />
          </>
        )}
      </AddRiddle>
      <ButtonWrapper>
        <button className="previous" onClick={() => setFormSubject('cover')}>이전</button>
        <button className="next" onClick={handleNextButton}>다음</button>
     </ButtonWrapper>
    </>
  );  
}

const Advice = styled.p`
  margin: 0 0 0.8em 0;
  color: var(--font-info);
`;

const RequiredStar = styled.span`
  color: var(--font-warning);
  font-weight: 900;
`;

const RiddleContainer = styled.div`
  position: relative;
  margin-top: 3rem;
  margin-bottom: 80px;
`;

const RiddleIndex = styled.label`
  display: flex;
  position: absolute;
  top: -0.8em;
  left: 25px;
  border-radius: 0.3em;
  padding: 0.3em;
  font-size: 1.4rem;
  background-color: var(--background-block);
  background-color: #282C36;
  font-weight: bold;
  svg {
    margin-right: 0.3em;
  }
`;

const RiddleWrapper = styled.li`
  border-top: 1px solid var(--border);
  padding: 0.5em;
`;

const CloseWrapper = styled.h2`
  position: relative;
  margin-top: 0;
  margin-bottom: 1.5em;
  
  svg {
    position: absolute;
    right: 0em;
    font-size: 1em;
    color: var(--font-subtitle);
    cursor: pointer;
    border: 1px solid white;
    border-radius: 0.3rem;
  }
`;

const SubTitle = styled.p`
  display: flex;
  margin-bottom: 0.3em;
  margin-left: 0.2em;
  color: var(--font-subtitle);
  font-weight: 500;

  svg {
    color: var(--font-warning);
    margin-left: 0.3em;
    font-size: 1em;
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  textarea {
    width: 100%;
    height: 5rem;
  }
`;

const HintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  input {
    width: 100%;
  }
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  input {
    width: 100%;
  }
`;

const LengthCount = styled.small`
  align-self: flex-end; 
  margin-top: 0.2em;
  margin-right: 0.2em;
  color: var(--font-chore);
`;

const AddRiddle = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  /* background-color: var(--background-riddle); */
  background-color: #324055;
  align-items: center;
  border-radius: 1rem
  margin-top: 0;
  padding: 0.3em;
  border: 1px dashed #485f88;

  p {
    color: #8ab4f8;
    font-size: 1.1em;
  }

  svg {
    color: #8ab4f8;
    margin-left: 0.3em;
    font-size: 1.3em;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  button {
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .previous {
    margin-right: 1em;
  }
`;