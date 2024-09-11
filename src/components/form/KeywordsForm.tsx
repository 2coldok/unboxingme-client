import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { TPandoraFormSubject } from '../../types/form';

export interface IKeywordsFormProps {
  setFormSubject: Dispatch<SetStateAction<TPandoraFormSubject>>;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function KeywordsForm({ setFormSubject, keywords, setKeywords }: IKeywordsFormProps) {
  const [text, setText] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [vaildForm, setValidForm] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<null | string>(null);
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  useEffect(() => {
    if (keywords.length < 1 || keywords.length > 10) {
      setFormErrorMessage('1개이상 10개 이하의 키워드를 입력해주세요');
      setValidForm(false);
    } else {
      setFormErrorMessage(null);
      setValidForm(true);
    }
  }, [keywords])
  
  const handleAddKeyword = () => {
    if (text.trim() === '') return;

    if (keywords.length >= 10) return;
    setKeywords(prev => [...prev, text]);
    setText('');
  };

  const handleDeleteKeyword = (targetKeyword: string) => {
    setKeywords((prev) => prev.filter(keyword => keyword !== targetKeyword));
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isComposing) {
      event.preventDefault();
      handleAddKeyword();
    }
  }

  const handleCompositionStart = () => {
    setIsComposing(true);
  }

  const handleCompositionEnd = () => {
    setIsComposing(false);
  }

  const handleNextButton = () => {
    if (vaildForm && !formErrorMessage) {
      setFormSubject('query');
    } else {
      return;
    }
  }

  return (
    <>
      <label>
        <span>키워드 입력</span>
        <input
          type="text" 
          name="newKeyword" 
          value={text} 
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart} 
          onCompositionEnd={handleCompositionEnd}
        />
        {formErrorMessage && <FormErrorMessage>{formErrorMessage}</FormErrorMessage>}
        <button onClick={handleAddKeyword} type='button'>추가하기</button>
      </label>
      {keywords.map((keyword) => (
        <ShowKeyword key={uuidv4()}>
          <AiOutlineSearch />
          <span>{keyword}</span>
          <IoClose onClick={() => handleDeleteKeyword(keyword)} />
        </ShowKeyword>
      ))}
      <button type='button' onClick={() => setFormSubject('cover')}>이전</button>
      <button type='button' onClick={handleNextButton}>다음</button>
    </>
  );
}

const ShowKeyword = styled.div`
  display: flex;
  padding: 0.2em 0.9em;
  padding-left: 0.3em;
  align-items: center;
  margin-bottom: 0.3em;
  background-color: black;
  border-radius: 0.8em;
  width: fit-content;

  svg:first-child {
    margin-right: 0.4em;
  }

  svg:nth-child(3) {
    fill: red;
    margin-left: 0.4em;

    &:hover {
      cursor: pointer;
    }
  }
`;

const FormErrorMessage = styled.span`
  color: red;
`;
