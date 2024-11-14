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

// const PANDORA_FORM_SUBJECT_TITLE = {
//   keywords: '1. 게시물 검색 키워드 설정',
//   cover: '2. 게시물 표지 작성',
//   riddles: '3. 질문 설정',
//   post: '4. 노트 작성',
//   preview: '미리보기 및 등록'
// };

export default function PandoraForm({ pandoraService }: IPandoraFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 새로운 판도라 만들기 또는 수정하기
  const [mode, setMode] = useState<{ id: string | null, type: 'new' | 'edit' }>({ id: null, type: 'new' });

  const [formSubject, setFormSubject] = useState<TFormSubject>('keywords');
  const [cover, setCover] = useState<ICover>({ writer: '', title: '', description: '' });
  const [keywords, setKeywords] = useState<TKeywords>([]);
  const [riddles, setRiddles] = useState<IRiddle[]>([{ id: uuidv4(), isQuestionValid: false, isAnswerValid: false, question: '', hint: '', answer: '' }]);
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
            setRiddles(pandora.problems.map((problem) => ({ ...problem, id: uuidv4(), isQuestionValid: true, isAnswerValid: true })));
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
          <IconWrapper $active={formSubject === 'keywords'}><BsSearch /></IconWrapper>
          <Road></Road>
          <IconWrapper $active={formSubject === 'cover'}><BsCreditCard2Front /></IconWrapper>
          <Road></Road>
          <IconWrapper $active={formSubject === 'riddles'}><BsQuestionSquare /></IconWrapper>
          <Road></Road>
          <IconWrapper $active={formSubject === 'post'}><BsEnvelopePaper /></IconWrapper>
        </ProgressWrapper>
      )}

      {formSubject === 'keywords' && (
        <FormWrapper>
          <FormSubject>1. 검색 키워드 설정</FormSubject>
          <KeywordsForm
            setFormSubject={setFormSubject}
            keywords={keywords}
            setKeywords={setKeywords}
          />
        </FormWrapper>
      )}

      {formSubject === 'cover' && (
        <FormWrapper>
          <FormSubject>2. 소개</FormSubject>
          <CoverForm  
            setFormSubject={setFormSubject}
            cover={cover}
            setCover={setCover}
          />
        </FormWrapper>
      )}

      {formSubject === 'riddles' && (
        <FormWrapper>
          <FormSubject>3. 수수께끼 만들기</FormSubject>
          <RiddlesForm 
            setFormSubject={setFormSubject} 
            riddles={riddles}
            setRiddles={setRiddles}
          />
        </FormWrapper>
      )}

      {formSubject === 'post' && (
        <FormWrapper>
          <FormSubject>4. 노트 작성</FormSubject>
          <PostForm 
            setFormSubject={setFormSubject} 
            post={post}
            setPost={setPost}
          />
        </FormWrapper>
      )}

      {formSubject === 'preview' && (
        <FormWrapper>
          <FormSubject>미리보기 및 제출</FormSubject>
          <CreatePandora
            mode={mode}
            setFormSubject={setFormSubject}
            cover={cover}
            keywords={keywords}
            riddles={riddles}
            post={post}
            pandoraService={pandoraService}
          />
        </FormWrapper>
      )}
      
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media(max-width: 768px) {
    padding: 0.7rem;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2em;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--background-block);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 80%;
  border: 1px solid var(--border);
  padding: 1em 1.4em 1.5em 1.4em;
  border-radius: 0.7rem;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 1em 1em 1.5em 1em;
  }
`;

const FormSubject = styled.h1`
  margin-top: 0.3em;
  font-size: 1.5em;
`;

const IconWrapper = styled.p<{ $active: boolean }>`
  display: flex;
  padding: 0.3em;
  margin: 0;
  /* border: 1px solid ${props => props.$active ? '#4f88b4' : '#484e54' }; */
  border: 1px solid #484e54;
  border-radius: 1rem;
  font-size: 2em;
  background-color: ${props => props.$active ? '#3f66a5' : 'none' };

  & > svg {
    /* fill: ${props => props.$active ? 'green' : '' }; */
    color: ${props => props.$active ? 'white' : '#484e54' };
    
  }
`;

const Road = styled.div`
  width: 2em;
  margin-top: 0;
  border-radius: 1rem;
  height: 1px;
  border: 0.5px solid #484e54;
  /* background-color: #63ea6c; */
`;

/********************************************************/
