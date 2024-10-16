import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import CoverForm from "../components/form/CoverForm";
import KeywordsForm from "../components/form/KeywordsForm";
import { IPandoraService } from "../service/PandoraService";
import styled from "styled-components";

import { ICover, TKeywords, TPost } from "../types/form";
import CreatePandora from "../components/form/CreatePandora";
import { useNavigate, useParams } from "react-router-dom";
import { HttpError } from "../network/HttpClient";

import { BsCreditCard2Front } from "react-icons/bs"; // 표지
import { BsSearch } from "react-icons/bs"; // 검색 키워드
import { BsQuestionSquare } from "react-icons/bs"; // 질문
import { BsEnvelopePaper } from "react-icons/bs"; // 포스트
import RiddlesForm from "../components/form/RiddlesForm";
import PostForm from "../components/form/PostForm";
import { TFormSubject } from "../types/form";
import { IRiddle } from "../types/form";

interface IPandoraFormProps {
  pandoraService: IPandoraService;
}

const PANDORA_FORM_SUBJECT_TITLE = {
  cover: '게시글 표지 작성',
  keywords: '게시글 검색 키워드 설정',
  riddles: '질문 설정',
  post: '게시글 작성',
  preview: '미리보기 및 게시글 등록하기'
};

export default function PandoraForm({ pandoraService }: IPandoraFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 새로운 판도라 만들기 또는 수정하기
  const [mode, setMode] = useState<{ id: string | null, type: 'new' | 'edit' }>({ id: null, type: 'new' });

  const [formSubject, setFormSubject] = useState<TFormSubject>('cover');
  const [cover, setCover] = useState<ICover>({ writer: '', title: '', description: '' });
  const [keywords, setKeywords] = useState<TKeywords>([]);
  const [riddles, setRiddles] = useState<IRiddle[]>([{ id: uuidv4(), question: '', hint: '', answer: '' }]);
  const [post, setPost] = useState<TPost>('');

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
            setCover({ writer: pandora.writer, title: pandora.title, description: pandora.description });
            setKeywords(pandora.keywords);
            setRiddles(pandora.problems.map((problem) => ({ ...problem, id: uuidv4() })));
            setPost(pandora.cat);
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
      {formSubject !== 'preview' && (
        <ProgressWrapper>
          <IconWrapper $active={formSubject === 'cover'}><BsCreditCard2Front /></IconWrapper>
          <Road></Road>
          <IconWrapper $active={formSubject === 'keywords'}><BsSearch /></IconWrapper>
          <Road></Road>
          <IconWrapper $active={formSubject === 'riddles'}><BsQuestionSquare /></IconWrapper>
          <Road></Road>
          <IconWrapper $active={formSubject === 'post'}><BsEnvelopePaper /></IconWrapper>
        </ProgressWrapper>
      )}
      
      {formSubject !== 'preview' && (
        <FormSubjectWrapper>
          {formSubject === 'cover' && <BsCreditCard2Front />}
          {formSubject === 'keywords' && <BsSearch />}
          {formSubject === 'riddles' && <BsQuestionSquare />}
          {formSubject === 'post' && <BsEnvelopePaper />}
          {PANDORA_FORM_SUBJECT_TITLE[formSubject]}
        </FormSubjectWrapper>
      )}
      

      <FormMainWrapper>
        {formSubject === 'cover' && <CoverForm  
          setFormSubject={setFormSubject}
          cover={cover}
          setCover={setCover}
        />} 
        
        {formSubject === 'keywords' && <KeywordsForm
          setFormSubject={setFormSubject}
          keywords={keywords}
          setKeywords={setKeywords}
        />}
  
        {formSubject === 'riddles' && <RiddlesForm 
          setFormSubject={setFormSubject} 
          riddles={riddles}
          setRiddles={setRiddles}
        />}
  
        {formSubject === 'post' && <PostForm 
          setFormSubject={setFormSubject} 
          post={post}
          setPost={setPost}
        />}
  
        {formSubject === 'preview' && <CreatePandora
          mode={mode}
          setFormSubject={setFormSubject}
          cover={cover}
          keywords={keywords}
          riddles={riddles}
          post={post}
          pandoraService={pandoraService}
        />}
      </FormMainWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 100%;

  @media(max-width: 768px) {
    padding: 0.7rem;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const FormSubjectWrapper = styled.h2`
  display: flex;
  align-items: center;
  margin: 0;
  color: #c5d1de;
  background-color: #1a1e22;
  margin-bottom: 1rem;
  padding: 0.4em;
  border-radius: 0.3rem;

  & > svg {
    margin-right: 0.7rem;
  }
`;

const FormMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 0 1rem; */
  /* background-color: #0d0d37; */
  color: #BCC0C3;
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