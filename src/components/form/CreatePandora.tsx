import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";
import { ICover, IRiddle, TFormSubject, TKeywords, TPost } from "../../types/form";
import { BsCreditCard2Front, BsEnvelopePaper, BsQuestionSquare } from "react-icons/bs";

interface ICreatePandoraProps {
  mode: { id: string | null, type: 'new' | 'edit' };
  setFormSubject: Dispatch<React.SetStateAction<TFormSubject>>;
  cover: ICover;
  keywords: TKeywords;
  riddles: IRiddle[];
  post: TPost;
  pandoraService: IPandoraService;
}

export default function CreatePandora({ mode, setFormSubject, cover, keywords, riddles, post, pandoraService }: ICreatePandoraProps) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // form 유효성 검 사 TODO

    const newPandoraForm = {
      writer: cover.writer,
      title: cover.title,
      description: cover.description,
      keywords: keywords,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      problems: riddles.map(({ id, ...rest }) => rest),
      /* eslint-enable @typescript-eslint/no-unused-vars */
      cat: post,
    };

    try {
      // 판도라 생성 성공
      if (!mode.id && mode.type === 'new') {
        const data = await pandoraService.createPandora(newPandoraForm);
        if (data.success) {
          return navigate('/dashboard');
        }
      }
      // 판도라 수정 성공
      if (mode.id && mode.type === 'edit') {
        const data = await pandoraService.editMyPandora(mode.id, newPandoraForm);
        const totalDeletedRecords = data.payload.totalDeletedRecords;
        alert(`총 ${totalDeletedRecords}개의 도전자 기록이 삭제되었습니다.`);
        return navigate('/dashboard');
      }
    } catch (error) {
      return navigate('/fallback/error', { state: { error: error } });
    }
  }

  return (
    <>
      <p>* 브라우저 뒤로 가기 시 작성된 내용이 초기화됩니다.</p>
      <FormSubjectWrapper>
        <BsCreditCard2Front />
        <span>게시글 표지</span>
        <span className="edit" onClick={() => setFormSubject('cover')}>수정</span>
      </FormSubjectWrapper>
      <CoverWrapper>
        <strong className="subtitle">작성자명</strong>
        <p className="writer">{cover.writer}</p>
        <strong className="subtitle">제목</strong>
        <p className="title">{cover.title}</p>
        <strong className="subtitle">설명</strong>
        <pre className="description">{cover.description}</pre>
      </CoverWrapper>

      <FormSubjectWrapper>
        <AiOutlineSearch />
        <span>게시글 검색 키워드</span>
        <span className="edit" onClick={() => setFormSubject('keywords')}>수정</span>
      </FormSubjectWrapper>
      <KeywordsWrapper>
        {keywords.length === 0 && <p>검색 키워드가 설정되지 않았습니다.</p>}
        {keywords.map((keyword) => (
          <li key={uuidv4()}>
            <AiOutlineSearch />
            <span>{keyword}</span>
          </li>
        ))}
      </KeywordsWrapper>
      
      <FormSubjectWrapper>
        <BsQuestionSquare />
        <span>질문</span>
        <span className="edit" onClick={() => setFormSubject('riddles')}>수정</span>
      </FormSubjectWrapper>
      <RiddlesWrapper>
        {riddles.map((riddle, index) => (
          <li key={riddle.id}>
            <h3 className="index">
              <span>문제 {index + 1}번</span>
            </h3>
            <div className="riddle">
              <strong className="field">질문</strong>
              <pre className="question">{riddle.question}</pre>
              <strong className="field">힌트</strong>
              <p className="hint">{riddle.hint ? riddle.hint : '힌트 없음'}</p>
              <strong className="field">정답</strong>
              <p className="answer">{riddle.answer}</p>
            </div>
          </li>
        ))}
      </RiddlesWrapper>

      <FormSubjectWrapper>
        <BsEnvelopePaper />
        <span>게시물 내용</span>
        <span className="edit" onClick={() => setFormSubject('post')}>수정</span>
      </FormSubjectWrapper>
      <PostWrapper>
        {post}
      </PostWrapper>

      <SubmitButton onClick={handleSubmit}>{mode.type === 'edit' ? '수정 완료하기' : '게시글 등록하기'}</SubmitButton>
    </>
  );  
}

const FormSubjectWrapper = styled.h2`
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
  color: #c5d1de;
  background-color: #1a1e22;
  /* margin-bottom: rem; */
  padding: 0.3em;
  border-radius: 0.3rem;

  & > svg {
    margin-right: 0.7rem;
  }

  .edit {
    margin-left: 1em;
    font-size: 0.6em;
    font-weight: bold;
    padding: 0.3em 1em 0.3em 1em;
    background-color: #cbad1a;
    color: #322406;
    border-radius: 1em;
    cursor: pointer;
  }
`;

const CoverWrapper = styled.div`
  .subtitle {
    color: var(--light-gray);
  }

  .writer {
    font-size: 1.1rem;
    width: 15rem;
    padding: 0.3em;
    margin-top: 0.3em;
    border: 1.5px solid var(--dark-gray);
    border-radius: 0.3em;
  }

  .title {
    width: 100%;
    font-size: 1.1rem;
    padding: 0.3em;
    margin-top: 0.3em;
    border: 1.5px solid var(--dark-gray);
    border-radius: 0.3em;
  }

  .description {
    height: 10rem;
    font-size: 1.1rem;
    margin-top: 0.3em;
    padding: 0.3em;
    border: 1.5px solid var(--dark-gray);
    border-radius: 0.3em;
    white-space: pre-wrap;
    overflow-y: auto
  }
`;

const KeywordsWrapper = styled.ul`
  margin-top: 0;
  & > li {
    display: flex;
    padding: 0.4em 0.8em 0.4em 0.6em;
    align-items: center;
    margin-bottom: 0.8em;
    border: 1px solid var(--middle-blue);
    color: var(--middle-blue);
    border-radius: 0.9em;
    width: fit-content;
    font-weight: bold;

    & > svg {
      margin-right: 0.4em;
    }
  }
`;

const RiddlesWrapper = styled.ul`
  margin-top: 0;
  & > li {
    border: 0.5px solid var(--dark-gray);
    border-radius: 1rem;
    margin-bottom: 1rem;

    .index {
      position: relative;
      margin-top: 0;
      padding: 0.5em 0.8em 0.5em 0.8em;
      border-radius: 0.9rem 0.9rem 0 0;
      color: #bdc1c6;
      
      & > svg {
        margin-right: 0.3em;
      }
    }
  }

  .riddle {
    margin: 1em;
  }

  .field {
    margin-bottom: 0.3em;
    margin-left: 0.2em;
    color: var(--light-gray);
  }

  .question {
    height: 5rem;
    font-size: 1rem;
    margin-top: 0.3em;
    padding: 0.3em;
    border: 1.5px solid var(--dark-gray);
    border-radius: 0.3em;
    white-space: pre-wrap;
    overflow-y: auto;
  }

  .hint {
    font-size: 1em;
    border-radius: 0.4rem;
    margin-top: 0.3em;
    border: 1.5px solid var(--dark-gray);
    color: #ECECEC;
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    @media(max-width: 768px) {
      width: 100%;
    }
  }

  .answer {
    margin-top: 0.3em;
    font-size: 1em;
    border-radius: 0.4rem;
    border: 1.5px solid var(--dark-gray);
    color: #ECECEC;
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    @media(max-width: 768px) {
      width: 100%;
    }
  }
`;

const PostWrapper = styled.pre`
  height: 20rem;
  font-size: 1.1em;
  margin-top: 0.3em;
  padding: 0.3em;
  border: 1.5px solid var(--dark-gray);
  border-radius: 0.3em;
  white-space: pre-wrap;
  overflow-y: auto;
`;

const SubmitButton = styled.button`
  margin-top: 2rem; 
  background-color: var(--middle-blue);
  color: white;
  font-weight: bold;
  padding: 0.6em 2em 0.6em 2em;
`;
