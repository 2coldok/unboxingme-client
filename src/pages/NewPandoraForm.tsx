import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import CoverForm from "../components/form/CoverForm";
import KeywordsForm from "../components/form/KeywordsForm";
import MessageForm from "../components/form/MessageForm";
import QueryForm from "../components/form/QueryForm";
import UnsealLimitForm from "../components/form/UnsealLimitForm";
import { IPandoraService } from "../service/PandoraService";
import PreviewForm from "../components/form/PreviewForm";
import styled from "styled-components";

import { BsBoxSeam } from "react-icons/bs"; // cover
import { LuPackageSearch } from "react-icons/lu"; // search
import { GiThreeKeys } from "react-icons/gi"; // query
import { TfiDropboxAlt } from "react-icons/tfi"; // message2
import { GiBoxUnpacking } from "react-icons/gi"; // unsealLimit
import { GiLockedBox } from "react-icons/gi"; // safe box

interface INewPandoraFormProps {
  pandoraService: IPandoraService;
}

export type TFormSubject = 'cover' | 'keywords' | 'query' | 'message' | 'unsealLimit' | 'preview';

const FORM_SUBJECTS = {
  cover: '표지',
  keywords: '키워드',
  query: '질문',
  message: '메세지',
  unsealLimit: '열람 횟수',
  preview: '미리보기'
};

export default function NewPandoraForm({ pandoraService }: INewPandoraFormProps) {
  const [formSubject, setFormSubject] = useState<TFormSubject>('cover');
  
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [queries, setQueries] = useState([{ id: uuidv4(), question: '', hint: '', answer: '' }]);
  const [message, setMessage] = useState('');
  const [maxOpen, setMaxOpen] = useState<number | ''>(1); // 나중에 form 제출때는 maxOpen이 '' 일 경우 배제하기

  return (
    <StyledContainer>
      <IconContainer>
        <IconWrapper $active={formSubject === 'cover'}><BsBoxSeam /></IconWrapper>
        <Road></Road>
        <IconWrapper $active={formSubject === 'keywords'}><LuPackageSearch /></IconWrapper>
        <Road></Road>
        <IconWrapper $active={formSubject === 'query'}><GiThreeKeys /></IconWrapper>
        <Road></Road>
        <IconWrapper $active={formSubject === 'message'}><TfiDropboxAlt /></IconWrapper>
        <Road></Road>
        <IconWrapper $active={formSubject === 'unsealLimit'}><GiBoxUnpacking /></IconWrapper>
        <Road></Road>
        <IconWrapper $active={formSubject === 'preview'}><GiLockedBox /></IconWrapper>
      </IconContainer>

      <FormSubject>{FORM_SUBJECTS[formSubject]}</FormSubject>

      <FormContainer>
        {formSubject === 'cover' && <CoverForm  
          setFormSubject={setFormSubject}
          writer={writer}
          setWriter={setWriter}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />} 
        
        {formSubject === 'keywords' && <KeywordsForm
          setFormSubject={setFormSubject}
          keywords={keywords}
          setKeywords={setKeywords}
        />}
  
        {formSubject === 'query' && <QueryForm 
          setFormSubject={setFormSubject} 
          queries={queries}
          setQueries={setQueries}
        />}
  
        {formSubject === 'message' && <MessageForm 
          setFormSubject={setFormSubject} 
          message={message}
          setMessage={setMessage}
        />}
  
        {formSubject === 'unsealLimit' &&<UnsealLimitForm 
          setFormSubject={setFormSubject} 
          maxOpen={maxOpen}
          setMaxOpen={setMaxOpen}
        />}
  
        {formSubject === 'preview' && <PreviewForm
          setFormSubject={setFormSubject}
          writer={writer}
          title={title}
          description={description}
          keywords={keywords}
          queries={queries}
          message={message}
          maxOpen={maxOpen}
          pandoraService={pandoraService}
        />}
      </FormContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 800px;
`;

const FormSubject = styled.span`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0;
  padding: 0.7em;
  color: #C5D1DE;
  background-color: #2D333B;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  /* padding: 0 1rem; */
  background-color: #0d0d37;
  color: #BCC0C3;
  max-height: 1500px;
`;


const IconWrapper = styled.p<{ $active: boolean }>`
  display: flex;
  padding: 0.3em;
  border: 1px solid #353a3f;
  border-radius: 1rem;
  font-size: 2em;
  /* background-color: ${props => props.$active ? 'green' : 'none' }; */

  & > svg {
    /* fill: ${props => props.$active ? 'green' : '' }; */
    color: ${props => props.$active ? '#63ea6c' : '#484e54' };
    
  }
`
const Road = styled.div`
  width: 2em;
  border-radius: 1rem;
  height: 1px;
  border: 0.5px dashed #63ea6c;
  /* background-color: #63ea6c; */
`;

export const NextButton = styled.button`
  border-radius: 1rem;
  border: 1px solid pink;
`;

export const PreviousButton = styled.button`
  border-radius: 1rem;
  border: 10px solid pink;
`;
