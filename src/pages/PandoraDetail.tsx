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
import AppFooter from "../components/AppFooter";
import { useLoading } from "../hook/LoadingHook";
import { BsArrowDownRightSquare } from "react-icons/bs";
import { useAuth } from "../hook/AuthHook";



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
  const { startLoading, stopLoading } = useLoading();

  //csrf test
  const { csrfToken } = useAuth();
 
  useEffect(() => {
    if (!id) {
      return navigate('fallback/404', { state: { message: '판도라 id가 존재하지 않습니다.' } });
    }

    if (!csrfToken) {
      return;
    }

    const fetchMyPandoraDetail = async () => {
      try {
        startLoading();
        const data = await dashboardService.getMyPandoraDetail(id, csrfToken);
        setDetail(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error }, replace: true });
        }
      } finally {
        stopLoading();
      }
    }

    fetchMyPandoraDetail();
  }, [id, csrfToken, navigate, dashboardService, startLoading, stopLoading]);

  const handleSelectedPandora = (action: 'edit' | 'delete', id: string, title: string, totalRecords: number) => {
    if (action === 'edit' && detail?.pandora.solvedAt) return;

    setSelectedPandora({ action: action, id: id, title: title, totalRecords: totalRecords });
  }

  const handleEdit = (id: string) => {
    return navigate(`/pandora/form/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!csrfToken) return;
    try {
      const data = await pandoraService.deleteMyPandora(id, csrfToken);
      alert(`총 ${data.payload.totalDeletedRecords} 개의 기록이 삭제되었습니다.`);
      window.location.href = '/dashboard';
    } catch (error) {
      return navigate('/fallback/error', { state: { error: error } });
    }
  };

  const handleCancelModifyAction = () => {
    setSelectedPandora(null);
  };

  const handleRiddleLink = () => {
    window.open(`https://riddlenote.com/pandora/${id}`, "_blank", "noopener,noreferrer");
  };


  if (!detail || !id) {
    return null // todo
  }

  return (
    <>
      <StyledContainer>
        <SubjectWrapper>
          <BsArrowDownRightSquare />
          <span>나의 수수께끼 세부정보</span>
        </SubjectWrapper>
        

        {detail.pandora.solverAlias && (
          <SolverAliasWrapper>
            <p>
              <SolverAlias>{detail.pandora.solverAlias}</SolverAlias> <br/>
              님에 의해 수수께끼 노트가 열람되었습니다.
            </p>
          </SolverAliasWrapper> 
        )}
        
        <SubContentWrapper>
          <CoverWrapper>
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
            <Description>{detail.pandora.description ? detail.pandora.description : '내용 없음'}</Description>
         </CoverWrapper>
          
          <HiddenDetail onClick={() => setKeywordsView((prev) => !prev)}>검색 키워드  {keywordsView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</HiddenDetail>
          {keywordsView && (
            <KeywordsWrapper>
              {detail.pandora.keywords.length === 0 && (
                <>
                  <p>검색 키워드가 설정되지 않았습니다.</p>
                  <p>수수께끼 링크 공유를 통해서만 게시물에 접근할 수 있습니다.</p>
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
          
          <HiddenDetail onClick={() => setRiddlesView((prev) => !prev)}>수수께끼{`(${detail.pandora.totalProblems})`} {riddlesView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</HiddenDetail>  
          {riddlesView && (
            <RiddleWrapper>
              {detail.pandora.problems.map((riddle, index) => (
                <RiddleBox key={uuidv4()}>
                  <RiddleIndex><AiFillLock /> 문제 {index + 1}</RiddleIndex>
                  <Riddle>             
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
          
          <HiddenDetail onClick={() => setNoteView((prev) => !prev)}>노트 내용 {noteView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</HiddenDetail>
          {noteView && (
            <NoteWrapper>
              {detail.pandora.cat}
            </NoteWrapper>
          )}
        </SubContentWrapper>
  
        <SubContentWrapper>
          <SubTitle>기본 정보</SubTitle>
          <DetailElement>게시 상태: <InputReadOnly value={detail.pandora.active ? '게시중' : '비공개'} /></DetailElement>
          <DetailElement>게시물 생성일: <InputReadOnly value={formatTime(detail.pandora.createdAt)} /></DetailElement>
          <DetailElement>수수께끼 표지 조회수: <InputReadOnly value={detail.pandora.coverViewCount} /></DetailElement>
          <DetailElement>라벨: <InputReadOnly value={detail.pandora.label} /></DetailElement>
        </SubContentWrapper>
  
        
        <SubContentWrapper>
          <SubTitle>수수께끼 링크</SubTitle>  
          <CopyButtonWrapper>
            <input type="text" value={`https://riddlenote.com/pandora/${id}`} readOnly />
            <Copy text={`https://riddlenote.com/pandora/${id}`} />
          </CopyButtonWrapper>
          <RiddleLinkButton onClick={handleRiddleLink}>이동하기</RiddleLinkButton>
        </SubContentWrapper>
        
        <SubContentWrapper>
          <SubTitle>수수께끼 풀이 현황</SubTitle>
          {detail.totalRecords === 0 && (
            <p>기록 없음</p>
          )}
          {detail.totalRecords > 0 && detail.record && (
            <>
              <RiddleProgressWrapper>
                <RiddleProgress 
                totalSteps={detail.pandora.totalProblems} 
                currentStep={detail.record.unboxing ? detail.record.unsealedQuestionIndex + 1 : detail.record.unsealedQuestionIndex} 
                />
              </RiddleProgressWrapper>
              {!detail.pandora.solvedAt && (
                <DetailElement>진행 현황: <InputReadOnly value={`${detail.record.unsealedQuestionIndex + 1}번 풀이중`} /></DetailElement>
              )}
              {detail.pandora.solvedAt && (
                <DetailElement>진행 현황: <InputReadOnly value={'풀이 완료'} /></DetailElement>
              )}
              
              <DetailElement>업데이트: <InputReadOnly value={formatTime(detail.record.updatedAt)} /></DetailElement>
              <DetailElement>수수께끼 참여 인원: <InputReadOnly value={`${detail.totalRecords} 명`} /></DetailElement>
            </>
          )}
        </SubContentWrapper>
  
        <SubContentWrapper>
          <SubTitle>설정</SubTitle>
          <ModifyButtonWrapper>
            <span>
              {detail.pandora.solvedAt && '모든 수수께끼가 해결된 게시물은 수정할 수 없습니다.'}
              {!detail.pandora.solvedAt && '수정시 페널티 기록을 포함해 열람을 시도한 사용자들의 풀이 기록이 삭제됩니다.'}
            </span>
            <EditButton $isSolved={!!detail.pandora.solvedAt} onClick={() => handleSelectedPandora('edit', id, detail.pandora.title, detail.totalRecords)}>
              {detail.pandora.solvedAt ? '수정 불가능' : '수정'}
            </EditButton>
          </ModifyButtonWrapper>
          <ModifyButtonWrapper>
            <span>
              삭제시 게시물이 영구적으로 삭제되며, 열람자가 있을 경우<br/>
              열람자는 더이상 수수께끼 노트를 확인할 수 없습니다.
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
      </StyledContainer>
      <AppFooter />
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SubjectWrapper = styled.div`
  display: flex;
  width: 90%;
  @media (max-width: 900px) {
    width: 95%;
  }
  margin-left: 0.3em;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  /* color: #cecece; */

  svg {
    margin-right: 0.4em;
  }
`;

const SubTitle = styled.span`
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 50px;
`;

const SolverAliasWrapper = styled.div`
  border: 1px solid #4c7a5e;
  background-color: #334b43;
  width: 90%;
  @media (max-width: 900px) {
    width: 95%;
  }
  border-radius: 0.7rem;
  padding: 1rem;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const SolverAlias = styled.span`
  font-weight: 700;
  font-size: 1.1em;
  color: #87e89f;
`;

const SubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  @media (max-width: 900px) {
    width: 95%;
  }
  border-radius: 0.7rem;
  /* border: 1px solid #62778c; */
  padding: 1rem;
  margin-bottom: 20px;
  background-color: var(--background-block);
  background-color: #282C36;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const DetailElement = styled.label`
  margin-bottom: 1.3rem;
`;

const InputReadOnly = styled.input.attrs({ readOnly: true })`
  font-weight: 900;
  color: #ffffff;
  padding: 0.3em 0.8em 0.3em 0.8em;
  border-radius: 0.3em;
  margin-left: 0.2em;
  width: 10em;
  background-color: var(--background-riddle);
  border: 1px solid var(--border);
  /* background-color: #5d707e; */
`;

//  검색 키워드, 질문, 게시글내용
const HiddenDetail = styled.h4`
  display: flex;
  background-color: #292d37;
  background-color: #414b5d;
  padding: 1em;
  border-radius: 0.4rem;
  margin: 1em 0 1em 0;
  cursor: pointer;
  svg {
    margin-left: 0.4em;
  }
`;

/**pandora***/
const CoverWrapper = styled.div`
  padding: 1em;
  border-radius: 0.4rem;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.9em;
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
  border: ${({ $open }) => $open ? '1px solid #4c7a5e' : '1px solid #445261'};
  background: ${({ $open }) => $open ? '#334b43' : '#353d44'};
  color: ${({ $open }) => $open ? '#87e89f' : '#b7c9e1'};
`;

const Description = styled.pre`
  font-size: 1.1em;
  min-height: 10em;
  white-space: pre-wrap;
  border-radius: 0;
  border-top: 1px solid var(--border);
  padding-top: 1em;
`;

/*****/

// keywords
const KeywordsWrapper = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
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
  display: flex;
  align-items: center;
  input {
    width: 60%;
    max-width: 500px;
    /* font-weight: 600; */
    color: var(--brand);
    padding: 0.3em;
    border-radius: 0.3em;
    border: 1px solid var(--border);
    background-color: #2a2f37;
  }

  svg {
    margin-left: 1em;
  }
`;

// Riddles

const RiddleWrapper = styled.ul`
  margin-top: 1em;
  margin-bottom: 0;
`;

const RiddleBox = styled.div`
  position: relative;
  margin-bottom: 2.2em;
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
  background-color: var(--background-block);
  background-color: #282C36;
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
  border: 1px solid var(--border);
  background-color: var(--background-riddle);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-top: 0;
  height: 20rem;
  border-radius: 0.4rem;
`;

/******* */
const RiddleProgressWrapper = styled.div`
  margin-bottom: 1em;
  
`;

const RiddleLinkButton = styled.button`
  margin-top: 10px;
  width: 10em;
`;

const ModifyButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 2em 2em 3em 2em;
  border-radius: 0.4em;
  font-weight: 500;
  border: 1px solid var(--border);
  background-color: #303540;
  /* background-color: #19204e; */
  
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const EditButton = styled.button<{ $isSolved: boolean }>`
  border: ${({ $isSolved }) => $isSolved ? '1px solid #444444' : '1px solid #ffe177'};
  background-color: #2f3642;
  color: ${({ $isSolved }) => $isSolved ? '#5f5f5f' : '#ffe177' };
  font-weight: bold;
  padding: 0.3em 2em 0.3em 2em;
  margin-left: 2rem;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const DeleteButton = styled.button`
  background-color: #2f3642;
  border: 1px solid var(--font-warning);
  color: var(--font-warning);
  font-weight: bold;
  
  padding: 0.3em 2em 0.3em 2em;
  margin-left: 2rem;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;