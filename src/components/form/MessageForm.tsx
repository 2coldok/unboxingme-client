import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NextButton, PreviousButton, TFormSubject } from '../mypage/NewPandora';
import styled from 'styled-components';

export interface IMessageFormProps {
  setFormSubject: React.Dispatch<React.SetStateAction<TFormSubject>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export default function MessageForm({ setFormSubject, message, setMessage }: IMessageFormProps) {
  const [validForm, setValidForm] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<null | string>(null);
  
  useEffect(() => {
    if (message.trim().length < 1) {
      setValidForm(false);
      setFormErrorMessage('판도라의 메세지를 입력해주세요');
    } else {
      setValidForm(true);
      setFormErrorMessage(null);
    }
  }, [message]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleNextButton = () => {
    if (validForm && !formErrorMessage) {
      setFormSubject('unsealLimit');
    } else {
      return;
    }  
  };
  
  return (
    <>
      <label>
        <span>판도라 메세지 입력하기</span>
        <textarea 
          name="message" 
          maxLength={200} 
          placeholder="메세지 입력" 
          value={message}
          onChange={onChange}
        />
      </label>
      <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
      <PreviousButton type='button' onClick={() => setFormSubject('query')}>이전</PreviousButton>
      <NextButton type='button' onClick={handleNextButton}>다음</NextButton>
    </>
  );
}

const FormErrorMessage = styled.span`
  color: red;
`;