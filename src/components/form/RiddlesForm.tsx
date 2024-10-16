import { v4 as uuidv4 } from "uuid";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { TFormSubject } from "../../types/form";

export interface IRiddle {
  id: string;
  question: string;
  hint: string;
  answer: string;
}

export interface IRiddlesFormProps {
  setFormSubject: React.Dispatch<React.SetStateAction<TFormSubject>>;
  riddles: IRiddle[];
  setRiddles: Dispatch<SetStateAction<IRiddle[]>>;
}

export default function RiddlesForm({ setFormSubject, riddles, setRiddles }: IRiddlesFormProps) {
  const handleAdd = () => {
    if (riddles.length >= 10) {
      return alert('질문은 최대 10개까지 등록할 수 있습니다.');
    }
    setRiddles(prev => [...prev, { id: uuidv4(), question: '', hint: '', answer: '' }]);
  };

  const handleRemove = (id: string, index: number) => {
    const confirm = window.confirm(`[문제 ${index+1}]을 삭제하시겠습니까?`);
    if (confirm) {
      setRiddles(riddles.filter((riddle) => riddle.id !== id));
    }
  };

  const handleChange = (id: string, field: keyof IRiddle, value: string) => {
    setRiddles(
      riddles.map((riddle) =>
        riddle.id === id ? { ...riddle, [field]: value } : riddle
      )
    );
  };

  const handleNextButton = () => {
    if (!riddles.every((riddle) => riddle.question.length >= 3)) {
      return alert('질문을 3글자 이상 입력해주세요.');
    }
    if (!riddles.every((riddle) => riddle.answer.length > 0)) {
      return alert('정답을 입력해주세요.');
    }
    if (riddles.length === 0) {
      return alert('질문을 1개 이상 등록해주세요.');
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
    <StyledContainer>
      <p>* 첫번째 질문과 힌트는 게시글에 노출됩니다.</p>
      <p>* 두번째 질문부터는 이전 질문을 해결한 사용자만 다음 질문을 확인할 수 있습니다.</p>
      <p>* 모든 질문을 최초로 해결한 한명의 사용자만 게시글의 내용을 확인할 수 있습니다.</p>
      <p>* 모든 질문이 해결되면 게시글이 비공개로 전환됩니다.</p>
      <ul>
        {riddles.map((riddle, index) => (
          <Riddle key={riddle.id}>
            <h3 className="index">
              <span>문제 {index + 1}번</span>
              <IoClose className="close" onClick={() => handleRemove(riddle.id, index)} />
            </h3>
            <ContentWrapper>
              <p className="field">질문</p>
              <textarea
                className="question"
                maxLength={100}
                value={riddle.question}
                onChange={(e) => handleChange(riddle.id, 'question', e.target.value)}
                placeholder="3글자 이상 질문을 입력하세요"
              />
              <p className="field">힌트</p>
              <input 
                className="hint"
                type="text"
                value={riddle.hint}
                onChange={(e) => handleChange(riddle.id, 'hint', e.target.value)}
                maxLength={32}
                placeholder="힌트 없음"
              />
              <p className="field">정답</p>
              <input 
                className="answer"
                type="text"
                value={riddle.answer}
                onChange={(e) => handleChange(riddle.id, 'answer', e.target.value)}
                maxLength={32}
                placeholder="정답 입력"
              />
           </ContentWrapper>
          </Riddle>
        ))}
      </ul>
      <AddRiddle onClick={handleAdd}>
        <p>질문 추가</p>
        <GrAddCircle />
      </AddRiddle>
      <ButtonWrapper>
        <button className="previous" onClick={() => setFormSubject('keywords')}>이전</button>
        <button className="next" onClick={handleNextButton}>다음</button>
     </ButtonWrapper>
    </StyledContainer>
  );  
}

const StyledContainer = styled.div`
`;

const Riddle = styled.li`
  border: 0.5px solid var(--dark-gray);
  border-radius: 1rem;
  margin-top: 1.5rem;

  .index {
    position: relative;
    margin-top: 0;
    padding: 0.5em 0.8em 0.5em 0.8em;
    border-radius: 0.9rem 0.9rem 0 0;
    color: #bdc1c6;
    
    & > svg {
      margin-right: 0.3em;
    }

    .close {
      position: absolute;
      right: 0.2em;
      font-size: 1.2em;
      color: #e65757;
      cursor: pointer;
    }
  }
`;

const ContentWrapper = styled.div`
  margin: 1em;

  .field {
    margin-bottom: 0.3em;
    margin-left: 0.2em;
    color: var(--light-gray);
  }

  .question {
    width: 100%; 
    height: 5rem;
    font-size: 1rem;
  }

  .hint {
    min-width: 15rem;
    font-size: 1em;
    @media(max-width: 768px) {
      width: 100%;
    }
  }

  .answer {
    min-width: 15rem;
    font-size: 1em;
    @media(max-width: 768px) {
      width: 100%;
    }
  }
`

const AddRiddle = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #1a1e23;
  align-items: center;
  border-radius: 1rem
  margin-top: 0;
  padding: 0.3em;
  border: 1px dashed var(--dark-gray);

  & > p {
    color: var(--light-gray);
    font-size: 1.2em;
  }

  & > svg {
    color: var(--light-gray);
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
  
  & > button {
    background-color: var(--middle-blue);
    color: white;
    font-weight: bold;
    padding: 0.6em 2em 0.6em 2em;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .previous {
    margin-right: 1em;
  }
`;