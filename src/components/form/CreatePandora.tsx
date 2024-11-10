import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";
import { ICover, IRiddle, TFormSubject, TKeywords, TPost } from "../../types/form";
import { AiFillLock } from "react-icons/ai"; // lock;


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
      return navigate('/fallback/error', { state: { error: error }, replace: true });
    }
  }

  return (
    <>
      <GuideWrapper>
        <p>* 브라우저 뒤로가기 / 새로고침시 작성된 내용이 초기화됩니다.</p>
      </GuideWrapper>
      
      
      <FormSubjectWrapper>
        <Subject>게시물 검색 키워드</Subject>
        <EditButton className="edit" onClick={() => setFormSubject('keywords')}>
          수정
        </EditButton>
      </FormSubjectWrapper>
      <KeywordsWrapper>
        {keywords.length === 0 && (
          <>
            <p>검색 키워드가 설정되지 않았습니다.</p>
            <p>게시물 링크 공유를 통해서만 게시물에 접근할 수 있습니다.</p>
          </>

        )}
        {keywords.map((keyword) => (
          <Keyword key={uuidv4()}>
            <AiOutlineSearch />
            <span>{keyword}</span>
          </Keyword>
        ))}
      </KeywordsWrapper>

      <Divide></Divide>

      <FormSubjectWrapper>
        <Subject>게시물 표지</Subject>
        <EditButton className="edit" onClick={() => setFormSubject('cover')}>
          수정
        </EditButton>
      </FormSubjectWrapper>
      <CoverWrapper>
        <SubTitle>작성자명</SubTitle>
        <WriterWrapper>{cover.writer}</WriterWrapper>
        <SubTitle>제목</SubTitle>
        <TitleWrapper>{cover.title}</TitleWrapper>
        <SubTitle>소개</SubTitle>
        <DescriptionWrapper>{cover.description}</DescriptionWrapper>
      </CoverWrapper>

      <Divide></Divide>

      <FormSubjectWrapper>
        <Subject>질문</Subject>
        <EditButton className="edit" onClick={() => setFormSubject('riddles')}>
          수정
        </EditButton>
      </FormSubjectWrapper>
      <RiddleWrapper>
        {riddles.map((riddle, index) => (
          <RiddleBox>
            <RiddleIndex><AiFillLock /> 문제 {index + 1}</RiddleIndex>
            <Riddle key={riddle.id}>             
              <RiddleContent>
                <span>질문</span>
                <p>{riddle.question}</p>
              </RiddleContent>
              <RiddleContent>
                <span>힌트</span>
                <p>{riddle.hint ? riddle.hint : '힌트 없음'}</p>
              </RiddleContent>
              <RiddleContent>
                <span>정답</span>
                <p className="answer">{riddle.answer}</p>
              </RiddleContent>
            </Riddle>
          </RiddleBox>
        ))}
      </RiddleWrapper>

      <Divide></Divide>

      <FormSubjectWrapper>
        <Subject>노트</Subject>
        <EditButton className="edit" onClick={() => setFormSubject('post')}>
          수정
        </EditButton>
      </FormSubjectWrapper>
      <NoteWrapper>
        {post}
      </NoteWrapper>

      <ButtonWrapper>
        <button className="previous" onClick={() => setFormSubject('post')}>이전</button>
        <button onClick={handleSubmit}>{mode.type === 'edit' ? '수정 완료' : '게시물 등록하기'}</button>
      </ButtonWrapper> 
      
    </>
  );  
}

const GuideWrapper = styled.div`
  color: var(--font-warning);
  margin-top: 0;
  margin-bottom: 2em;
`;

const FormSubjectWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Subject = styled.h2`
  color: var(--font);
  margin: 0;
  margin-right: 0.6em;
  margin-top: 0.3em;
`;

const EditButton = styled.span`
  border: 1px solid #808488;
  background-color: #494f55;
  color: #ffffff;


  font-size: 0.7em;
  padding: 0.3em 1em 0.3em 1em;
  font-weight: bold;
  border-radius: 0.4em;
  margin-top: 0.4em;
  cursor: pointer;
  :hover {
    filter: brightness(125%);
  }
`;

const Divide = styled.div`
  height: 1px;
  margin: 2em;
`;

// keywords
const KeywordsWrapper = styled.ul`
  min-height: 5em;
  padding: 1em;
  border-radius: 0.4rem;
  border: 1px dashed var(--border);
`;

const Keyword = styled.li`
  display: flex;
  padding: 0.4em 0.8em 0.4em 0.6em;
  align-items: center;
  margin-bottom: 0.8em;
  border: 1px solid var(--brand);
  color: var(--brand);
  border-radius: 0.9em;
  width: fit-content;
  font-weight: bold;

  svg {
    margin-right: 0.4em;
  }
`;

// cover
const CoverWrapper = styled.div`
  margin-bottom: 3rem;
  margin-top: 2em;
`;

const SubTitle = styled.p`
  margin-bottom: 0.2em;
  margin-left: 0.1em;
  color: var(--font-subtitle);
  font-weight: 500;
`;

const WriterWrapper = styled.p`
  margin-top: 0;
  width: 15rem;
  border-radius: 0.4rem;
  border: 1px solid var(--border);
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  margin-bottom: 2em;
`;

const TitleWrapper = styled.p`
  margin-top: 0;
  border-radius: 0.4rem;
  border: 1px solid var(--border);
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  margin-bottom: 2em;
`;

const DescriptionWrapper = styled.pre`
  margin-top: 0; 
  border-radius: 0.4rem;
  border: 1px solid var(--border);
  height: 10rem;
`;


// Riddles
const RiddleWrapper = styled.ul`
  margin-top: 2rem;
`;

const RiddleBox = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;

const RiddleIndex = styled.label`
  position: absolute;
  top: -0.9rem;
  left: 25px;
  display: flex;
  border-radius: 0.7em;
  padding: 0.3em 0.5em 0.3em 0.5em;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: var(--background);

  svg {
    margin-right: 0.4em;
  }
`;

const Riddle = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  padding: 1.2em;
`;

const RiddleContent = styled.div`
  display: flex;
  margin-top: 2em;

  span {
    margin-right: 0.8em;
    color: var(--font-chore);
    color: var(--font-pink);
    font-weight: bold;
    white-space: nowrap;
  }

  p {
    margin: 0;
  }

  .answer {
    font-weight: bold;
    font-size: 1.2em;
  }
  
`;

// Note
const NoteWrapper = styled.pre`
  height: 20rem;
  border: 1px solid var(--border);
  border-radius: 0.4rem;
`;

// Button
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  button {
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .previous {
    margin-right: 1em;
  }
`;
