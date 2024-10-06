import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import CoverForm from "../components/form/CoverForm";
import KeywordsForm from "../components/form/KeywordsForm";
import MessageForm from "../components/form/MessageForm";
import QueryForm from "../components/form/QueryForm";
// import UnsealLimitForm from "../components/form/UnsealLimitForm";
import { IPandoraService } from "../service/PandoraService";
import styled from "styled-components";

import { BsBoxSeam } from "react-icons/bs"; // cover
import { LuPackageSearch } from "react-icons/lu"; // search
import { GiThreeKeys } from "react-icons/gi"; // query
import { TfiDropboxAlt } from "react-icons/tfi"; // message2
import { GiLockedBox } from "react-icons/gi"; // safe box
import { TPandoraFormSubject } from "../types/form";
import { NEW_PANDORA_FORM } from "../constant/form";
import CreatePandora from "../components/form/CreatePandora";
import { useNavigate, useParams } from "react-router-dom";
import { HttpError } from "../network/HttpClient";

interface IPandoraFormProps {
  pandoraService: IPandoraService;
}

export default function PandoraForm({ pandoraService }: IPandoraFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 새로운 판도라 만들기 또는 수정하기
  const [mode, setMode] = useState<{ id: string | null, type: 'new' | 'edit' }>({ id: null, type: 'new' });
  
  const [formSubject, setFormSubject] = useState<TPandoraFormSubject>('cover');

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [queries, setQueries] = useState([{ id: uuidv4(), question: '', hint: '', answer: '' }]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) {
      return setMode({ id: null, type: 'new' });
    }

    if (id) {
      setMode({ id: id, type: 'edit' });
      const fetchMyPandoraEdit = async () => {
        try {
          const data = await pandoraService.getMyPandoraEdit(id);
          if (data.success && data.payload) {
            const pandora = data.payload;
            setWriter(pandora.writer);
            setTitle(pandora.title);
            setDescription(pandora.description);
            setKeywords(pandora.keywords);
            setQueries(pandora.problems.map((problem) => ({ ...problem, id: uuidv4() })));
            setMessage(pandora.cat);
          }
          if (data.success && data.payload === null) {
            return navigate('/fallback/404', { state: { message: '수정할 판도라를 찾을 수 없습니다.' } });
          }
        } catch (error) {
          if (error instanceof HttpError) {
            return navigate('/fallback/error', { state: { error: error, payload: error.payload } });
          }
          
        }
      };
      fetchMyPandoraEdit();
    }
  }, [id, pandoraService, navigate]);

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
        <IconWrapper $active={formSubject === 'submit'}><GiLockedBox /></IconWrapper>
      </IconContainer>

      <FormSubject>{NEW_PANDORA_FORM[formSubject]}</FormSubject>

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
  
        {formSubject === 'submit' && <CreatePandora
          mode={mode}
          setFormSubject={setFormSubject}
          writer={writer}
          title={title}
          description={description}
          keywords={keywords}
          queries={queries}
          message={message}
          pandoraService={pandoraService}
        />}
      </FormContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const FormSubject = styled.h1`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0;
  padding: 0.7em;
  color: #C5D1DE;
  width: 100%;
  margin-bottom: 2em;
  background-color: #2D333B;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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