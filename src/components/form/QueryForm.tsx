import { v4 as uuidv4 } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import './QueryFormAnimation.css'
import { NextButton, PreviousButton, TFormSubject } from "../../pages/NewPandoraForm";

export interface IQuery {
  id: string;
  question: string;
  hint: string;
  answer: string;
}

export interface IQueryFormProps {
  setFormSubject: React.Dispatch<React.SetStateAction<TFormSubject>>;
  queries: IQuery[];
  setQueries: Dispatch<SetStateAction<IQuery[]>>;
}

export default function QueryForm({ setFormSubject, queries, setQueries }: IQueryFormProps) {
  const [validForm, setValidForm] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<null | string>(null);
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});//

  useEffect(() => {
    for (let i = 0; i < queries.length; i++) {
      const { question, answer } = queries[i];
      if (question.trim().length < 1 || answer.trim().length < 1) {
        setValidForm(false);
        return setFormErrorMessage('질문과 답을 입력해주세요');
      }
    }
    
    setValidForm(true);
    setFormErrorMessage(null);
  }, [queries])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    setQueries(prevQueries => {
      const newQueries = [...prevQueries];
      newQueries[index] = { ...newQueries[index], [name]: value };
      return newQueries;
    });
  };

  const handleAddQuery = () => {
    const newId = uuidv4(); // 
    nodeRefs.current[newId] = React.createRef(); //
    setQueries(prevQueries => [...prevQueries, { id: newId/*uuidv4()*/, question: '', hint: '', answer: '' }]);
  };

  const handleDeleteQuery = (index: number) => {
    const id = queries[index].id; //
    setQueries(prevQueries => prevQueries.filter((_, i) => i !== index));
    delete nodeRefs.current[id]; //
  };

  const handleNextButton = () => {
    if (validForm && !formErrorMessage) {
      setFormSubject('message');
    } else {
      return;
    }  
  };
  
  return (
    <>
      <TransitionGroup>
        {queries.map((query, index) => (
          <CSSTransition
            key={query.id}
            nodeRef={nodeRefs.current[query.id]}
            timeout={300}
            classNames="fade"
          >
            <QueryContainer ref={nodeRefs.current[query.id]}>
              <IoClose onClick={() => handleDeleteQuery(index)} />
              <span>질문 {index + 1}</span>
              <input
                type="text"
                name="question"
                value={query.question}
                onChange={(e) => onChange(e, index)}
              />
              <span>힌트</span>
              <input
                type="text"
                name="hint"
                value={query.hint}
                onChange={(e) => onChange(e, index)}
              />
              <span>정답</span>
              <input
                type="text"
                name="answer"
                value={query.answer}
                onChange={(e) => onChange(e, index)}
              />
            </QueryContainer>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <AddQuery onClick={handleAddQuery}>
        <GrAddCircle />
      </AddQuery>
      <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
      <PreviousButton type="button" onClick={() => setFormSubject('keywords')}>이전</PreviousButton>
      <NextButton type="button" onClick={handleNextButton}>다음</NextButton>
    </>
  );  
}

const AddQuery = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 0.3em;
  background-color: gray;

  & > svg {
    width: 2.5em;
    height: 2.5em;
    color: blue;
    &:hover {
      cursor: pointer;
    }
  }
`;

const QueryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  padding: 0.5em;
  margin-bottom: 1em;
  border-radius: 1rem;

  & > svg {
    align-self: flex-end;
    fill: red;
    background-color: white;
    width: 30px;
    height: 30px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const FormErrorMessage = styled.span`
  color: red;
`;
