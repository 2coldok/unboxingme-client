import { useNavigate, useParams } from "react-router-dom";
import { IDashboardService } from "../service/DashboardService";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { HttpError } from "../network/HttpClient";
import { formatTime, formatTimeAgo } from "../util/formatTimeAgo";
import { BsFillCaretDownFill, BsUpc } from "react-icons/bs"; // 펼치기
import { BsFillCaretUpFill } from "react-icons/bs"; // 접기

import RiddleProgress from "../util/RiddleProgress";
import { IMyPandoraDetail } from "../types/dashboard";
import { IoPerson } from "react-icons/io5"; // writer
import { v4 as uuidv4 } from "uuid";
import { AiFillLock, AiOutlineSearch } from "react-icons/ai";

import { IPandoraService } from "../service/PandoraService";
import EditAndDeleteConfirm from "../components/EditAndDeleteConfirm";
import { Copy } from "../util/Copy";
import { LuEye } from "react-icons/lu";
import { Helmet } from "react-helmet-async";


interface IPandoraDetailProps {
  dashboardService: IDashboardService;
  pandoraService: IPandoraService;
}

export interface ISelectedPandora {
  id: string;
  action: 'edit' | 'delete';
  title: string;
  totalRecords: number;
}

export default function PandoraDetail({ dashboardService, pandoraService }: IPandoraDetailProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [detail, setDetail] = useState<IMyPandoraDetail | null>(null);
  const [keywordsView, setKeywordsView] = useState(false);
  const [riddlesView, setRiddlesView] = useState(false);
  const [noteView, setNoteView] = useState(false);
  const [selectedPandora, setSelectedPandora] = useState<ISelectedPandora | null>(null);

  useEffect(() => {
    if (!id) {
      return navigate('fallback/404', { state: { message: '판도라 id가 존재하지 않습니다.' } });
    }

    const fetchMyPandoraDetail = async () => {
      try {
        const data = await dashboardService.getMyPandoraDetail(id);
        console.log(data.payload); //
        console.log(data.payload.pandora.problems[0].hint);
        setDetail(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      }
    }

    fetchMyPandoraDetail();
  }, [id, navigate, dashboardService]);

  const handleSelectedPandora = (action: 'edit' | 'delete', id: string, title: string, totalRecords: number) => {
    setSelectedPandora({ action: action, id: id, title: title, totalRecords: totalRecords });
  }

  const handleEdit = (id: string) => {
    return navigate(`/pandora/form/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const data = await pandoraService.deleteMyPandora(id);
      alert(`총 ${data.payload.totalDeletedRecords} 개의 기록이 삭제되었습니다.`);
      return navigate('/dashboard');
    } catch (error) {
      return navigate('/fallback/error', { state: { error: error } });
    }
  };

  const handleCancelModifyAction = () => {
    setSelectedPandora(null);
  };


  if (!detail || !id) {
    return null // todo
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SubContentWrapper>
        <Title>{detail.pandora.title}</Title>
        <InfoWrapper>
          <div>
            <Writer> <IoPerson /> {detail.pandora.writer}</Writer>                  
            <MainInfo> 
              <AiFillLock /> {detail.pandora.totalProblems} ·&nbsp;
              <LuEye /> {detail.pandora.coverViewCount} ·&nbsp;
              {formatTimeAgo(detail.pandora.createdAt)}
            </MainInfo>
            <Label><BsUpc /> {detail.pandora.label}</Label>
          </div>
          <div>
            <State $open={detail.pandora.isCatUncovered}>{detail.pandora.isCatUncovered ? '열람됨' : '미열람'}</State>
          </div>
        </InfoWrapper>
        <Description>{detail.pandora.description}</Description>
        
        <HiddenDetail onClick={() => setKeywordsView((prev) => !prev)}>검색 키워드  {keywordsView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</HiddenDetail>
        {keywordsView && (
          <KeywordsWrapper>
            {detail.pandora.keywords.length === 0 && (
              <>
                <p>검색 키워드가 설정되지 않았습니다.</p>
                <p>게시물 링크 공유를 통해서만 게시물에 접근할 수 있습니다.</p>
              </>
    
            )}
            {detail.pandora.keywords.map((keyword) => (
              <Keyword key={uuidv4()}>
                <AiOutlineSearch />
                <span>{keyword}</span>
              </Keyword>
            ))}
          </KeywordsWrapper>
        )}
        
        <HiddenDetail onClick={() => setRiddlesView((prev) => !prev)}>질문{`(${detail.pandora.totalProblems})`} {riddlesView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</HiddenDetail>  
        {riddlesView && (
          <RiddleWrapper>
            {detail.pandora.problems.map((riddle, index) => (
              <RiddleBox>
                <RiddleIndex><AiFillLock /> 문제 {index + 1}</RiddleIndex>
                <Riddle key={uuidv4()}>             
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
        )}
        
        <HiddenDetail onClick={() => setNoteView((prev) => !prev)}>게시글 내용 {noteView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</HiddenDetail>
        {noteView && (
          <NoteWrapper>
            {detail.pandora.cat}
          </NoteWrapper>
        )}
      </SubContentWrapper>

      
      <SubContentWrapper>
        <SubTitle>게시물 링크</SubTitle>  
        <CopyButtonWrapper>
          <input type="text" value={`https://riddlenote.com/pandora/${id}`} readOnly />
          <Copy text={`https://riddlenote.com/pandora/${id}`} />
        </CopyButtonWrapper>
      </SubContentWrapper>

      <SubContentWrapper>
        <SubTitle>게시물 상태</SubTitle>
        <p>게시물 공개 상태: <InputReadOnly value={detail.pandora.active ? '공개중' : '비공개'} /></p>
        <p>게시물 질문 상태: <InputReadOnly value={detail.pandora.solvedAt ? '완료' : '미완료'} /></p>
        <p>게시물 열람 상태: <InputReadOnly value={detail.pandora.isCatUncovered ? '열람됨' : '미열람'} /></p>
      </SubContentWrapper>
      
      <SubContentWrapper>
        <SubTitle>질문 풀이 현황</SubTitle>
        {detail.totalRecords === 0 && (
          <p>기록 없음</p>
        )}
        {detail.totalRecords >0 && detail.record && (
          <>
            <RiddleProgress 
            totalSteps={detail.pandora.totalProblems} 
            currentStep={detail.record.unboxing ? detail.record.unsealedQuestionIndex + 1 : detail.record.unsealedQuestionIndex} 
            />
            <p>업데이트: <InputReadOnly value={formatTime(detail.record.updatedAt)} /></p>
            <p>문제풀이 참여 인원: <InputReadOnly value={`${detail.totalRecords} 명`} /></p>
            <p>게시물 열람자 별명: {detail.pandora.solverAlias && <InputReadOnly value={detail.pandora.solverAlias} />}</p>
          </>
        )}
      </SubContentWrapper>

      <SubContentWrapper>
        <SubTitle>설정</SubTitle>
        <ModifyButtonWrapper>
          <span>
            모든 질문을 해결한 사용자가 있을 경우 게시물을 수정할 수 없으며,<br/>
            수정시 패널티 기록을 포함해 게시물에 접근한 모든 사용자들의 기록이 삭제됩니다.
          </span>
          <EditButton onClick={() => handleSelectedPandora('edit', id, detail.pandora.title, detail.totalRecords)}>수정</EditButton>
        </ModifyButtonWrapper>
        <ModifyButtonWrapper>
          <span>
            삭제시 패널티 기록을 포함해 게시물에 접근한 모든 사용자들의 기록이 삭제되며,<br/>
            게시물이 영구적으로 삭제됩니다.
          </span>
          <DeleteButton onClick={() => handleSelectedPandora('delete', id, detail.pandora.title, detail.totalRecords)}>삭제</DeleteButton>
        </ModifyButtonWrapper>
      </SubContentWrapper>
      
      {selectedPandora && (
        <EditAndDeleteConfirm
          pandora={selectedPandora}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCancel={handleCancelModifyAction}
        />
      )}   
    </>
  );
}

const SubTitle = styled.span`
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 50px;
`;

const SubContentWrapper = styled.div`
  /* background-color: #181a1e; */
  border-radius: 0.7rem;
  border: 1px solid var(--border);
  padding: 1rem;
  margin-bottom: 40px;
`;

const InputReadOnly = styled.input.attrs({ readOnly: true })`
  font-weight: 600;
  color: #ffffff;
  padding: 0.3em 0.8em 0.3em 0.8em;
  border-radius: 0.3em;
  border: 1px solid var(--border);
  margin-left: 0.2em;
  width: auto;
  background-color: #242628;
`;

//  검색 키워드, 질문, 게시글내용
const HiddenDetail = styled.h4`
  display: flex;
  background-color: var(--background-riddle);
  padding: 1em;
  border-radius: 0.4rem;
  cursor: pointer;
  svg {
    margin-left: 0.4em;
  }
`;

/**pandora***/
const Title = styled.h2`
  color: var(--brand);
  font-weight: 700;
  font-size: 2.3em;
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  color: var(--font-info);
  font-weight: 600;
`;

const Writer = styled.p`
  display: flex;
  color: var(--font);
  font-weight: 500;
  font-size: 1em;
  margin: 0.9em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const MainInfo = styled.p`
  display: flex;
  font-size: 0.9em;
  font-weight: 500;
  margin: 0.3em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const Label = styled.p`
  display: flex;
  margin: 0.6em 0 0 0;
  font-weight: 500;
  font-size: 0.9em;
  svg {
    margin-right: 0.3em;
  }
`;

const State = styled.p<{ $open: boolean }>`
  display: flex;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 3px 7px 3px 7px;
  border-radius: 0.7rem;
  border: ${({ $open }) => $open ? '1px solid #00FF7F' : '1px solid #445261'};
  background: ${({ $open }) => $open ? '#334a46' : '#353d44'};
  color: ${({ $open }) => $open ? '#80e5aa' : '#b7c9e1'};
`;

const Description = styled.pre`
  font-size: 1.1em;
  min-height: 10em;
  white-space: pre-wrap;
  border: 1px solid var(--border);
`;

/*****/

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
const CopyButtonWrapper = styled.div`
  input {
    width: 60%;
    max-width: 500px;
    /* font-weight: 600; */
    color: var(--brand);
    padding: 0.3em;
    border-radius: 0.3em;
    border: 1px solid var(--border);
  }

  svg {
    margin-left: 1em;
  }
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
  color: var(--font-subtitle);

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
  
` ;

/****************** */


// Note
const NoteWrapper = styled.pre`
  height: 20rem;
  border: 1px solid var(--border);
  border-radius: 0.4rem;
`;

/******* */

const ModifyButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 1em 1em 2em 1em;
  border-radius: 0.4em;
  border: 1px solid var(--border);
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  border: 1px solid #808488;
  background-color: #494f55;
  color: #ffffff;
  font-weight: bold;
  padding: 0.3em 2em 0.3em 2em;
  margin-left: 2rem;
`;

const DeleteButton = styled.button`
    background-color: var(--background);
    border: 1px solid var(--font-warning);
    font-weight: bold;
    color: var(--font-warning);
    padding: 0.3em 2em 0.3em 2em;
    margin-left: 2rem;
`;