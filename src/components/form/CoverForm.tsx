import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [showRequiredStar, setShowRequiredStar] = useState(true);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    let timer: number;
    if (showErrors) {
      timer = setTimeout(() => {
        setShowErrors(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showErrors]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCover((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'title' && value.length < PANDORA_FORM.minTitleLength) {
      setShowRequiredStar(false);
    }
    if (name === 'title' && value.length >= PANDORA_FORM.minTitleLength) {
      setShowRequiredStar(true);
    }
  };

  const handleNextButton = () => {
    if (cover.title.trim().length >= PANDORA_FORM.minTitleLength) {
      setCover((prev) => ({
        ...prev,
        title: prev.title.trim(),
        description: prev.description.trim()
      }));
      window.scrollTo({
        top: 0, 
        left: 0,
        behavior: 'smooth',
      });
      setFormSubject('riddles');
    } else {
      setShowErrors(true);
    }
  };

  return (
    <>
      <SubTitle>
        제목
        {!showRequiredStar && !showErrors && <RequiredStar>*</RequiredStar>}
        {showErrors && (
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
        설명 (선택)
      </SubTitle>
      <DescriptionWrapper>
        <textarea
          className="description"
          name="description"
          maxLength={PANDORA_FORM.maxDescriptionLength} 
          value={cover.description}
          onChange={onChange}
          autoComplete="off"
          placeholder="설명 없음"
        />
        <LengthCount>{cover.description.length}/{PANDORA_FORM.maxDescriptionLength}</LengthCount>
      </DescriptionWrapper>

      <ButtonWrapper>
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

const RequiredStar = styled.span`
  color: var(--font-warning);
  font-weight: 900;
`;

const LengthCount = styled.small`
  align-self: flex-end; 
  margin-top: 0.2em;
  margin-right: 0.2em;
  color: var(--font-chore);
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
    height: 15rem;
  }
`;

const ErrorMessage = styled.small`
  color: var(--font-warning);
  font-size: 1em;
  font-weight: 500;
  margin-left: 0.4em;
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
