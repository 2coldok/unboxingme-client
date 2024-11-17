import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ICover, TFormSubject } from "../../types/form";
import { PANDORA_FORM } from "../../constant/constraints";
import { FORM_LENGTH_ERROR_MESSAGE } from "../../constant/errorMessage";

export interface ICoverFormProps {
  setFormSubject: Dispatch<React.SetStateAction<TFormSubject>>;
  cover: ICover;
  setCover: Dispatch<SetStateAction<ICover>>;
}

export default function CoverForm({ setFormSubject, cover, setCover }: ICoverFormProps) {
  const [showErrors, setShowErrors] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCover((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isWriterValid = cover.writer.trim().length >= PANDORA_FORM.minWriterLength;
  const isTitleValid = cover.title.trim().length >= PANDORA_FORM.minTitleLength;
  const isDescriptionValid = cover.description.trim().length >= PANDORA_FORM.minDescriptionLength;
  const isFormValid = isWriterValid && isTitleValid && isDescriptionValid;

  const handleNextButton = () => {
    if (isFormValid) {
      setCover((prev) => ({
        ...prev,
        writer: prev.writer.trim(),
        title: prev.title.trim(),
        description: prev.description.trim()
      }));
      setFormSubject('riddles');
    } else {
      setShowErrors(true);
    }
  };

  return (
    <>
      <SubTitle>
        작성자명
        {showErrors && !isWriterValid && (
          <ErrorMessage>{FORM_LENGTH_ERROR_MESSAGE.writer}</ErrorMessage>
        )}
      </SubTitle>
      <WriterWrapper>
        <input
          type="text" 
          name="writer" 
          value={cover.writer}
          onChange={onChange}
          maxLength={PANDORA_FORM.maxWriterLength}
          autoComplete="off"
          autoFocus
          placeholder="작성자명 입력"
        />
        <LengthCount>{cover.writer.length}/{PANDORA_FORM.maxWriterLength}</LengthCount>
      </WriterWrapper>
      
      
      <SubTitle>
        제목
        {showErrors&& !isTitleValid && (
          <ErrorMessage>{FORM_LENGTH_ERROR_MESSAGE.title}</ErrorMessage>
        )}
      </SubTitle>
      <TitleWrapper>
        <input 
          type="text" 
          name="title" 
          value={cover.title}
          onChange={onChange}
          maxLength={PANDORA_FORM.maxTitleLength}
          autoComplete="off"
          placeholder="제목 입력"
        />
        <LengthCount>{cover.title.length}/{PANDORA_FORM.maxTitleLength}</LengthCount>
      </TitleWrapper>

      <SubTitle>
        소개
        {showErrors && !isDescriptionValid && (
          <ErrorMessage>{FORM_LENGTH_ERROR_MESSAGE.description}</ErrorMessage>
        )}
      </SubTitle>
      <DescriptionWrapper>
        <textarea 
          className="description"
          name="description"
          maxLength={PANDORA_FORM.maxDescriptionLength} 
          value={cover.description}
          onChange={onChange}
          autoComplete="off"
          placeholder="설명 입력"
        />
        <LengthCount>{cover.description.length}/{PANDORA_FORM.maxDescriptionLength}</LengthCount>
      </DescriptionWrapper>

      <ButtonWrapper>
        <button className='previous' type='button' onClick={() => setFormSubject('keywords')}>이전</button>
        <button className="next" type="button" onClick={handleNextButton}>다음</button>
      </ButtonWrapper>
    </>
  );
}

// const Advice = styled.p`
//   margin: 0 0 0.8em 0;
//   color: var(--font-info);
// `;

const SubTitle = styled.p`
  margin-bottom: 0.3em;
  margin-left: 0.1em;
  color: var(--font-subtitle);
  font-weight: 500;
`;

const LengthCount = styled.small`
  align-self: flex-end; 
  margin-top: 0.2em;
  margin-right: 0.2em;
  color: var(--font-chore);
`;

const WriterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 15rem;
  input {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    width: 100%;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  textarea {
    width: 100%;
    height: 10rem;
  }
`;

const ErrorMessage = styled.small`
  font-weight: normal;
  margin-left: 0.4em;
  color: var(--font-warning);
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

  .next {
    margin-left: 0.8em;
  }
`;
