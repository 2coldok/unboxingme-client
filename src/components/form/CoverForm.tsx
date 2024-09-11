import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { TPandoraFormSubject } from "../../types/form";

export interface ICoverFormProps {
  setFormSubject: Dispatch<React.SetStateAction<TPandoraFormSubject>>;

  writer: string;
  setWriter: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

export default function CoverForm({ setFormSubject, writer, setWriter, title, setTitle, description, setDescription }: ICoverFormProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === "writer") {
      setWriter(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  }

  const handleNextButton = () => {
    if (!writer) setWriter('익명');
    if (!title) setTitle('제목 없음');
    if (!description) setDescription('설명 없음');
    setFormSubject('keywords');
  };

  return (
    <>
      <label>
        <span>작성자명</span>
        <input 
          type="text" 
          name="writer" 
          placeholder="익명" 
          value={writer}
          onChange={onChange}
        />
      </label>
      <label>
        <span>제목</span>
        <input 
          type="text" 
          name="title" 
          placeholder="제목 없음" 
          value={title}
          onChange={onChange}
        />
      </label>
      <label>
        <h3>설명</h3>
        <Textarea 
          name="description"
          maxLength={200} 
          placeholder="설명 없음" 
          value={description}
          onChange={onChange}
        />
      </label>
      <button type="button" onClick={handleNextButton}>다음</button>
    </>
  );
}

const Textarea = styled.textarea`
  background-color: #5d5b5b;
  color: white;
  letter-spacing: 0.1em;
  word-spacing: -0.4em;
  resize: none;
  width: 100%;
  height: 100px;
  /* outline-color: blue;
  outline-style: dashed;
  outline-offset: 2px; */
  &:focus {
    outline: 2px solid yellow;
    border-radius: 0.3em;
  }
`;

