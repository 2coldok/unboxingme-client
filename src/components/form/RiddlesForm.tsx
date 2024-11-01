import { v4 as uuidv4 } from "uuid";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { IRiddle, TFormSubject } from "../../types/form";
import { PANDORA_FORM } from "../../constant/constraints";
import { FORM_LENGTH_ERROR_MESSAGE } from "../../constant/errorMessage";
import { GrFormCheckmark } from "react-icons/gr";
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
    setRiddles(prev => [...prev, { id: uuidv4(), isQuestionValid: false, isAnswerValid: false, question: '', hint: '', answer: '' }]);
  };

  const handleRemove = (id: string) => {
    setRiddles(riddles.filter((riddle) => riddle.id !== id));
  };

  const handleChange = (id: string, field: keyof IRiddle, value: string) => {
    if (field === 'question') {
      return setRiddles(
        riddles.map((riddle) =>
          riddle.id === id ? { ...riddle, [field]: value, isQuestionValid: value.trim().length >= PANDORA_FORM.minQuestionLength  } : riddle
        )
      );
    }

    if (field === 'answer') {
      return setRiddles(
        riddles.map((riddle) =>
          riddle.id === id ? { ...riddle, [field]: value, isAnswerValid: value.trim().length >= PANDORA_FORM.minAnswerLength  } : riddle
        )
      );
    } 

    // 힌트는 유효성 검사를 하지 않음
    setRiddles(
      riddles.map((riddle) =>
        riddle.id === id ? { ...riddle, [field]: value } : riddle
      )
    );
  };

  const handleNextButton = () => {
    const isValid = riddles.every((riddle) => {
      return riddle.isQuestionValid && riddle.isAnswerValid
    });

    if (!isValid) {
      return;
    }

    setRiddles((prevRiddles) =>
      prevRiddles.map((riddle) => ({
        ...riddle,
        question: riddle.question.trim(),
        hint: riddle.hint ? riddle.hint.trim() : '',
        answer: riddle.answer.trim()
      }))
    );
    setFormSubject('post'); 
  };
  
  return (
    <>
      <Guide>* 이전 질문을 해결한 사용자만 다음 질문을 확인할 수 있습니다.</Guide>
      <Guide>* 모든 질문을 최초로 해결한 한명의 사용자만 게시글의 내용을 확인할 수 있습니다.</Guide>
      <Guide>* 모든 질문이 해결되면 게시글이 비공개로 전환됩니다.</Guide>
      <ul>
        {riddles.map((riddle, index) => (
          <RiddleContainer>
            <RiddleIndex>
              <AiFillLock />
              문제 {index + 1}
              </RiddleIndex>
            <RiddleWrapper key={riddle.id}>
              <CloseWrapper>
                <IoClose className="close" onClick={() => handleRemove(riddle.id)} />
              </CloseWrapper>
              <SubTitle>
                질문
                {!riddle.isQuestionValid && <GrFormCheckmark />}
              </SubTitle>
              <QuestionWrapper>
                <textarea
                  maxLength={PANDORA_FORM.maxQuestionLength}
                  value={riddle.question}
                  onChange={(e) => handleChange(riddle.id, 'question', e.target.value)}
                  placeholder="질문 입력"
                />
                <LengthCount>{riddle.question.length}/{PANDORA_FORM.maxQuestionLength}</LengthCount>
              </QuestionWrapper>
              <SubTitle>힌트</SubTitle>
              <HintWrapper>
                <input 
                  type="text"
                  value={riddle.hint}
                  onChange={(e) => handleChange(riddle.id, 'hint', e.target.value)}
                  maxLength={PANDORA_FORM.maxHintLegnth}
                  placeholder="힌트 없음"
                />
                <LengthCount>{riddle.hint.length}/{PANDORA_FORM.maxHintLegnth}</LengthCount>
              </HintWrapper>
              <SubTitle>
                정답
                {!riddle.isAnswerValid && <GrFormCheckmark />}
              </SubTitle>
              
              <AnswerWrapper>
                <input 
                  type="text"
                  value={riddle.answer}
                  onChange={(e) => handleChange(riddle.id, 'answer', e.target.value)}
                  maxLength={PANDORA_FORM.maxAnswerLength}
                  placeholder="정답 입력"
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

const Guide = styled.p`
  color: var(--font-explain);
`

const RiddleContainer = styled.div`
  position: relative;
  margin-top: 3rem;
`;

const RiddleIndex = styled.label`
  display: flex;
  position: absolute;
  top: -0.8em;
  left: 25px;
  border-radius: 0.3em;
  padding: 0.3em;
  font-size: 1.4rem;
  background-color: var(--background);
  font-weight: bold;
  svg {
    margin-right: 0.3em;
  }
`;

const RiddleWrapper = styled.li`
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  padding: 0.8em;
`;

const CloseWrapper = styled.h2`
  position: relative;
  margin-top: 0;
  margin-bottom: 1.5em;
  
  svg {
    position: absolute;
    right: 0em;
    font-size: 1em;
    color: var(--font-chore);
    cursor: pointer;
  }
`;

const SubTitle = styled.p`
  display: flex;
  margin-bottom: 0.3em;
  margin-left: 0.2em;

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
  background-color: var(--background);
  align-items: center;
  border-radius: 1rem
  margin-top: 0;
  padding: 0.3em;
  border: 1px dashed var(--font-chore);

  p {
    color: var(--font-chore);
    font-size: 1.1em;
  }

  svg {
    color: var(--font-chore);
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