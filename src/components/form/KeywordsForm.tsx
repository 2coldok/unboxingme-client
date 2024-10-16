import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { TFormSubject } from '../../types/form';

export interface IKeywordsFormProps {
  setFormSubject: Dispatch<SetStateAction<TFormSubject>>;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function KeywordsForm({ setFormSubject, keywords, setKeywords }: IKeywordsFormProps) {
  const [text, setText] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }
  
  const handleAddKeyword = () => {
    if (text.trim() === '') return;

    if (keywords.length >= 10) {
      return alert('키워드는 최대 10개까지 등록할 수 있습니다.');
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
    if (keywords.length === 0) {
      alert('키워드를 설정하지 않을 경우 게시물을 검색할 수 없으며, 게시물 링크를 통해서만 게시물에 접근할 수 있습니다');
    }
    setFormSubject('riddles');
  }

  return (
    <StyledContainer>
      <p>* 설정한 키워드를 통해서만 게시물을 검색할 수 있습니다.</p>
      <p>* 키워드를 설정하지 않을 경우 게시물 링크 공유를 통해서만 게시물에 접근할 수 있습니다.</p>
      <p>* 설정한 키워드 목록은 사용자에게 노출되지 않습니다.</p>
      <AddKeywordWrapper>
        <input
          type="text" 
          name="newKeyword" 
          value={text} 
          placeholder='키워드 입력'
          onChange={onChange}
          maxLength={20}
          onCompositionStart={() => setIsComposing(true)} 
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoFocus
        />
        <button onClick={handleAddKeyword} type='button'>추가</button>
     </AddKeywordWrapper>
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
        <button className='previous' type='button' onClick={() => setFormSubject('cover')}>이전</button>
        <button className='next' type='button' onClick={handleNextButton}>다음</button>
      </ButtonWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  color: var(--light-gray);
`;

const AddKeywordWrapper = styled.div`
  display: flex;
  margin-top: 2.5em;
  
  & > input {
    font-size: 1.1em;
    border-color: var(--middle-blue);
    border-right: none;
    border-radius: 0.4rem 0 0 0.4rem;
  }

  & > button {
    font-weight: bold;
    color: white;
    border-radius: 0 0.4rem 0.4rem 0;
    background-color: var(--middle-blue);
  }
`;

const AddedKeywords = styled.ul`
  display: flex;
  flex-direction: column;
  min-height: 5em;
  padding: 1em;
  border-radius: 0.4rem;
  border: 1px dashed var(--dark-gray);
  color: var(--dark-gray);

  & > li {
    display: flex;
    padding: 0.4em 0.8em 0.4em 0.6em;
    align-items: center;
    margin-bottom: 0.8em;
    border: 1px solid var(--middle-blue);
    color: var(--middle-blue);
    border-radius: 0.9em;
    width: fit-content;
    font-weight: bold;

    svg:first-child {
      margin-right: 0.4em;
    }

    svg:nth-child(3) {
      fill: var(--light-gray);
      margin-left: 0.4em;

      &:hover {
        cursor: pointer;
      }
    }
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