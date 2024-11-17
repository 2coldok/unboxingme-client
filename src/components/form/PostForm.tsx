import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TFormSubject } from '../../types/form';
import { PANDORA_FORM } from '../../constant/constraints';
import { FORM_LENGTH_ERROR_MESSAGE } from '../../constant/errorMessage';

export interface IPostFormProps {
  setFormSubject: React.Dispatch<React.SetStateAction<TFormSubject>>;
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
}

export default function PostForm({ setFormSubject, post, setPost }: IPostFormProps) {
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

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  const handleNextButton = () => {
    if (post.trim().length < PANDORA_FORM.minNoteLength) {
      return setShowError(true);
    }
  
    setPost((prev) => prev.trim());
    setFormSubject('preview');
  };

  return (
    <>
      <Advice>
        * 모든 수수께끼를 최초로 해결한 한명의 사용자만 노트 내용을 확인할 수 있습니다.
      </Advice>

      {showError && <ErrorMessage>{FORM_LENGTH_ERROR_MESSAGE.note}</ErrorMessage>}
      <Note 
          name='post'
          maxLength={PANDORA_FORM.maxNoteLength} 
          placeholder="노트 입력" 
          value={post}
          onChange={onChange}
          autoComplete="off"
      />
      <Count>{`${post.length}/${PANDORA_FORM.maxNoteLength}`}</Count>
      <ButtonWrapper>
        <button className='previous' onClick={() => setFormSubject('riddles')}>이전</button>
        <button className='next' onClick={handleNextButton}>미리보기/생성</button>
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
  margin-left: 0.2em;
`;

const Note = styled.textarea`
  width: 100%;
  height: 20rem;
`;

const Count = styled.small`
  color: var(--font-chore);
  margin-left: 0.3em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2rem;
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
