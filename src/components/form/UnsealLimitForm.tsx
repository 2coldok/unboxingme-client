import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TPandoraFormSubject } from '../../types/form';

export interface IUnsealLimitFormProps {
  setFormSubject: React.Dispatch<React.SetStateAction<TPandoraFormSubject>>;
  maxOpen: number | '';
  setMaxOpen: Dispatch<SetStateAction<number | ''>>;
}

export default function UnsealLimitForm({ setFormSubject, maxOpen, setMaxOpen }: IUnsealLimitFormProps) {
  const [validForm, setValidForm] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<null | string>(null);
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (maxOpen === '') {
      setValidForm(false);
      return setFormErrorMessage('열람 횟수를 입력해주세요');
    }
    if (maxOpen < -1 || maxOpen === 0) {
      setValidForm(false);
      return setFormErrorMessage('올바른 횟수가 아닙니다.');
    }
    setValidForm(true);
    setFormErrorMessage(null);
  }, [maxOpen]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value }= event.target;
    if (value === '') {
      setMaxOpen('');
    } else if (!isNaN(Number(value)) && Number(value) > 0) {
      setMaxOpen(Number(value));
    }
  }
  
  const handleButtonClick = (value: number | 'custom') => {
    if (value === 'custom') {
      setIsEditable(true);
      setMaxOpen('');
    } else {
      setIsEditable(false);
      setMaxOpen(value);
    }
  }

  useEffect(() => {
    if (isEditable) {
      inputRef.current?.focus();
    }
  }, [isEditable]);

  const handleNextButton = () => {
    if (validForm && !formErrorMessage) {
      setFormSubject('preview');
    } else {
      return;
    }
  };
  
  return (
    <>
      <label>
        <p>* 최종 메세지 열람 횟수를 설정합니다</p>
        <p>* 설정한 횟수만큼 판도라의 상자가 열람되면, 판도라의 상자가 비활성화 됩니다.</p>
        <span>열람 횟수 제한</span>
        {maxOpen === -1 ? <span>제한없음</span> : 
          <input 
            type="text" 
            name="maxOpen" 
            placeholder="숫자 입력" 
            value={maxOpen}
            onChange={onChange}
            readOnly={!isEditable}
            ref={inputRef}
          />
        }
      </label>
      <button type='button' onClick={() => handleButtonClick(1)}>1회</button>
      <button type='button' onClick={() => handleButtonClick(-1)}>제한없음</button>
      <button type='button' onClick={() => handleButtonClick('custom')}>직접입력</button>
      <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
      <button type='button' onClick={() => setFormSubject('message')}>이전</button>
      <button type='button' onClick={handleNextButton}>다음(미리보기)</button>
    </>
  );
}

const FormErrorMessage = styled.span`
  color: red;
`;
