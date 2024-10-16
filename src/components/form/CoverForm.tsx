import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ICover, TFormSubject } from "../../types/form";

export interface ICoverFormProps {
  setFormSubject: Dispatch<React.SetStateAction<TFormSubject>>;
  cover: ICover;
  setCover: Dispatch<SetStateAction<ICover>>;
}

export default function CoverForm({ setFormSubject, cover, setCover }: ICoverFormProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCover((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextButton = () => {
    if (cover.writer.length === 0) {
      return alert('작성자명을 입력해주세요');
    }
    if (cover.title.length === 0) {
      return alert('제목을 입력해주세요');
    }
    if (cover.description.length === 0) {
      return alert('설명을 입력해주세요');
    }

    setCover((prev) => ({
      ...prev,
      writer: prev.writer.trim(),
      title: prev.title.trim(),
      description: prev.description.trim()
    }));
    setFormSubject('keywords');
  };

  return (
    <StyledContainer>
      <p className="subtitle">작성자명</p>
      <input 
        className="writer"
        type="text" 
        name="writer" 
        value={cover.writer}
        onChange={onChange}
        maxLength={25}
        autoComplete="off"
        autoFocus
      />
      <p className="subtitle">제목</p>
      <input 
        className="title"
        type="text" 
        name="title" 
        placeholder="제목을 입력하세요" 
        value={cover.title}
        onChange={onChange}
        maxLength={60}
        autoComplete="off"
      />
      <p className="subtitle">설명</p>
      <textarea 
        className="description"
        name="description"
        maxLength={300} 
        placeholder="설명을 입력하세요" 
        value={cover.description}
        onChange={onChange}
        autoComplete="off"
      />
      <ButtonWrapper>
        <button type="button" onClick={handleNextButton}>다음</button>
      </ButtonWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  .subtitle {
    margin-bottom: 0.3em;
    color: var(--light-gray);
  }

  input, textarea {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }

  & > small {
    margin-left: 0.1rem;
    color: var(--dark-gray);
  }

  .writer {
    width: 15rem;
  }

  .title {
    width: 100%;
  }

  .description {
    width: 100%;
    height: 10rem;
    font-size: 1.1rem;
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
`;
