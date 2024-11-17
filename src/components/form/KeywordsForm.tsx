import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { TFormSubject } from '../../types/form';
import { PANDORA_FORM } from '../../constant/constraints';
import { FORM_LENGTH_ERROR_MESSAGE } from '../../constant/errorMessage';

export interface IKeywordsFormProps {
  setFormSubject: Dispatch<SetStateAction<TFormSubject>>;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function KeywordsForm({ setFormSubject, keywords, setKeywords }: IKeywordsFormProps) {
  const [text, setText] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let timer: number;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showError]);
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }
  
  const handleAddKeyword = () => {
    if (text.trim() === '') return;

    // 키워드 개수 초과
    if (keywords.length >= 10) {
      return setShowError(true);
    }

    // 키워드 중복
    if (keywords.includes(text.trim())) {
      return setText('');
    }
    setKeywords(prev => [...prev, text.trim()]);
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

  const handleNextButton = () => {
    setFormSubject('cover');
  };

  return (
    <>
      <Advice>* 설정한 키워드를 통해서만 수수께끼를 검색할 수 있습니다.</Advice>
      <Advice>* 키워드를 설정하지 않을 경우 링크 공유를 통해서만 수수께끼에 접근할 수 있습니다.</Advice>
      <Advice>* 설정한 키워드 목록은 사용자에게 노출되지 않습니다.</Advice>
      <AddKeywordWrapper>
        <input
          type="text" 
          name="newKeyword" 
          value={text} 
          placeholder='키워드 입력'
          onChange={onChange}
          maxLength={PANDORA_FORM.maxKeywordLength}
          onCompositionStart={() => setIsComposing(true)} 
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoFocus
        />
        <button onClick={handleAddKeyword} type='button'>추가</button>
      </AddKeywordWrapper>
      <LengthCount>{text.length}/{PANDORA_FORM.maxKeywordLength}</LengthCount>
      {showError && <ErrorMessage>{FORM_LENGTH_ERROR_MESSAGE.keywords}</ErrorMessage>}
      <AddedKeywords>
       {keywords.map((keyword) => (
         <li key={uuidv4()}>
           <AiOutlineSearch />
           <span>{keyword}</span>
           <IoClose onClick={() => handleDeleteKeyword(keyword)} />
         </li>
       ))}
       {keywords.length === 0 && '설정된 키워드가 없습니다.'}
      </AddedKeywords>
      <ButtonWrapper>
        <button type='button' onClick={handleNextButton}>다음</button>
      </ButtonWrapper>
    </>
  );
}

const Advice = styled.p`
  margin: 0 0 0.8em 0;
  color: var(--font-info);
`;

const ErrorMessage = styled.small`
  color: var(--font-warning);
`;

const AddKeywordWrapper = styled.div`
  display: flex;
  margin-top: 2.5em;
  input {
    width: 25em;
    @media (max-width: 768px) {
      width: 100%;
    }
    
    border: 2px solid var(--brand);
    background-color: var(--background-block);

    border-right: none;
    border-radius: 0.5rem 0 0 0.5rem;
  }
 
  button {
    background-color: var(--background-block);
    border: 2px solid var(--brand);
    border-left: none;
    color: var(--brand);
    font-weight: bold;
    border-radius: 0 0.5rem 0.5rem 0;
    white-space: nowrap;
  }
`;

const AddedKeywords = styled.ul`
  display: flex;
  flex-direction: column;
  min-height: 5em;
  padding: 1em;
  border-radius: 0.4rem;
  border: 1px dashed var(--border);

  li {
    display: flex;
    padding: 0.4em 0.8em 0.4em 0.6em;
    align-items: center;
    margin-bottom: 0.8em;
    
    border: 1px solid var(--brand);
    color: var(--brand);
    border-radius: 0.9em;
    width: fit-content;
    font-weight: bold;

    svg:first-child {
      margin-right: 0.4em;
    }

    svg:nth-child(3) {
      fill: var(--font-subtitle);
      margin-left: 0.4em;
      cursor: pointer;
    }
  }
`;

const LengthCount = styled.small`
  color: var(--font-chore);
  margin-left: 0.6em;
  margin-right: 0.5em;
`

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
`;