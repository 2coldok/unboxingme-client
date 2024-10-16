import { useNavigate, useParams } from "react-router-dom";
import { IDashboardService } from "../service/DashboardService";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { HttpError } from "../network/HttpClient";
import { formatTimeAgo } from "../util/formatTimeAgo";
import { BsFillCaretDownFill } from "react-icons/bs"; // 펼치기
import { BsFillCaretUpFill } from "react-icons/bs"; // 접기

import RiddleProgress from "../util/RiddleProgress";
import { IMyPandoraDetail } from "../types/dashboard";
import { IoPerson } from "react-icons/io5"; // writer
import { v4 as uuidv4 } from "uuid";
import { AiOutlineSearch } from "react-icons/ai";

import { IPandoraService } from "../service/PandoraService";
import EditAndDeleteConfirm from "../components/EditAndDeleteConfirm";
import { Copy } from "../util/Copy";


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
      if (data.success) {
        return navigate('/dashboard');
      }
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
    <StyledContainer>
      <MyPandoraDetail>
      
        <Pandora>
          <h1 className="title">{detail.pandora.title}</h1>
          <p className="writer"><IoPerson /> {detail.pandora.writer}</p>
          <pre className="description">{detail.pandora.description}</pre>
          
          <h4 onClick={() => setKeywordsView((prev) => !prev)}>검색 키워드  {keywordsView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</h4>
          {keywordsView && (
            <KeywordsWrapper>
              {detail.pandora.keywords.length === 0 && <p>검색 키워드가 설정되지 않았습니다.</p>}
              {detail.pandora.keywords.map((keyword) => (
                <li key={uuidv4()}>
                  <AiOutlineSearch />
                  <span>{keyword}</span>
                </li>
              ))}
            </KeywordsWrapper>
          )}
          
          <h4 onClick={() => setRiddlesView((prev) => !prev)}>질문{`(${detail.pandora.totalProblems})`} {riddlesView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</h4>  
          {riddlesView && (
            <RiddlesWrapper>
              {detail.pandora.problems.map((riddle, index) => (
                <li key={index}>
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
          )}
          
          <h4 onClick={() => setNoteView((prev) => !prev)}>게시글 내용 {noteView ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</h4>
          {noteView && (
            <pre className="note">{detail.pandora.cat}</pre>
          )}
        </Pandora>

        <h2>
          <span>게시물 링크</span>
        </h2>
        <CopyButtonWrapper>
          <input type="texgt" value={`localhost:5173/pandora/${id}`} readOnly />
          <Copy text={`localhost:5173/pandora/${id}`} />
        </CopyButtonWrapper>
       

        <h2>
          <span>문제풀이 진행 현황</span>
        </h2>
        <RiddleStatusWrapper>
          <small>* 진행률이 가장 높은 최근 기록을 기준으로 책정됩니다.</small>
          {detail.totalRecords === 0 && <p>기록 없음</p>}
          {detail.totalRecords !== 0 && detail.record && (
            <>
              
              <RiddleProgress 
                totalSteps={detail.pandora.totalProblems} 
                currentStep={detail.record.unboxing ? detail.record.unsealedQuestionIndex + 1 : detail.record.unsealedQuestionIndex} 
              />
              {/* <p className="updatedat">{detail.record.updatedAt} 업데이트 됨</p> */}
              <p className="total-challengers">문제풀이 참여 인원: <span>{detail.totalRecords}명</span></p>
            </>
          )}
          {detail.pandora.solvedAt && detail.pandora.isCatUncovered && (
            <div className="solver-state">
              <p className="solvedat">문제풀이 완료 시점: <span>{formatTimeAgo(detail.pandora.solvedAt)}</span></p>
              <p className="solveralias">열람자 별명: <span>{detail.pandora.solverAlias}</span></p>
            </div>
          )}
        </RiddleStatusWrapper>
        

        <h2>
          {/* <BsDatabase /> */}
          <span>상태 정보</span>
        </h2>
        <p>게시 상태: {detail.pandora.active ? '게시중' : '비공개'}</p>
        <p>게시물 내용 열람 상태: {detail.pandora.isCatUncovered ? '열람됨' : '미열람'} </p>
        <p>조회수: {detail.pandora.coverViewCount}</p>
        <p>생성일: {detail.pandora.createdAt}</p>

        
        <h2>
          {/* <BsFingerprint /> */}
          <span>시리얼 라벨</span>
        </h2>
        <LabelWrapper>
          <small>* 시리얼 라벨은 게시물에 할당되는 고유한 문자입니다.</small>
          <p>{detail.pandora.label}</p>
        </LabelWrapper>

        <h2>
          {/* <BsGear /> */}
          <span>설정</span>
        </h2>
        <ModifyButtonWrapper>
          <div className="edit">
            <span>
              모든 질문을 해결한 사용자가 있을 경우 게시글을 수정할 수 없습니다.<br/>
              수정시 패널티 기록을 포함해 게시글에 접근한 모든 사용자들의 기록이 삭제됩니다.
            </span>
            <button onClick={() => handleSelectedPandora('edit', id, detail.pandora.title, detail.totalRecords)}>수정</button>
          </div>
          <div className="delete">
            <span>삭제시 패널티 기록을 포함해 게시글에 접근한 모든 사용자들의 기록이 삭제됩니다.</span>
            <button onClick={() => handleSelectedPandora('delete', id, detail.pandora.title, detail.totalRecords)}>삭제</button>
          </div>
        </ModifyButtonWrapper>
      </MyPandoraDetail>

      {selectedPandora && (
        <EditAndDeleteConfirm
          pandora={selectedPandora}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCancel={handleCancelModifyAction}
        />
      )}   
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.2em 0.4em 0.2em 0.4em;
`;

const Pandora = styled.div`
  padding: 0.4rem;
  border: 1px solid var(--dark-gray);
  border-radius: 0.5rem;
  margin-top: 2rem;

  h4 {
    /* color: #3b90f9; */
    border-radius: 0.3rem 0.3rem 0 0;
    /* background-color: #3e5772; */
    /* background-color: #212830; */
    /* background-color: #323b46; */
    border-bottom: 1px solid var(--dark-gray);
    
    /* border-bottom: 0.5px solid var(--light-gray); */
    font-size: 1.1em;
    padding: 0.5em;
    
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .title {
    margin-bottom: 0.3rem;
    margin-left: 0.4rem;
  }  
  
  .writer {
    color: #8c8c8c;
    font-weight: bold;
    margin: 0 0 0 0.4rem;
  }

  .description {
    white-space: pre-wrap;
    font-size: 1.1rem;
    color: white;
    /* border-radius: 0.5rem; */
    /* border: 1px solid gray; */
    padding: 0.5rem 0.4rem 1.2rem 0.4rem;
  }

  .viewcount {
    color: #686868;
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
    border-radius: 1rem;
    /* background-color: #282f38; */
    background-color: #171e2a;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5em;

    .index {
      position: relative;
      margin-top: 0;
      padding: 0.5em 0.8em 0.5em 0.8em;
      border-radius: 0.9rem 0.9rem 0 0;
      /* color: #bdc1c6; */
      /* color: #407acb; */
      color: var(--light-white);
      
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

const MyPandoraDetail = styled.div`
  & > h2 {
    margin-top: 3em;
    margin-bottom: 0;
    padding-bottom: 0.3em;
    border-bottom: 0.5px solid var(--dark-gray);
    font-size: 2em;
    & > svg {
      margin-right: 0.4em;
    }
  }
  .created {
    color: #686868;
  }

  .note {
    white-space: pre-wrap;
    padding: 0.6rem;
    font-size: 1rem;
  }
`;

const CopyButtonWrapper = styled.div`\
  margin-top: 1em;
  & > input {
    width: 60%;
    max-width: 500px;
    color: var(--light-gray);
    border: 1px solid var(--dark-gray);
  }

  & > svg {
    margin-left: 1em;
    color: white;
    /* font-size: 1.1rem; */
  }

  /* & > button {
    background-color: #1c2631;
    color: var(--middle-blue);
    font-weight: bold;
    padding: 0.5em 0.8em 0.5em 0.8em;
    border: 1px solid var(--middle-blue);
    border-radius: 0;
  } */
`

const RiddleStatusWrapper = styled.div`
  & > small {
    color: var(--light-gray);
    display: block;
    margin-bottom: 2em;
  }

  .updatedat {
    margin-top: 0.3em;
    color: gray;
  }

  .total-challengers {
    color: white;

    & > span {
      font-weight: bold;
      color: var(--light-white);
      margin-left: 0.4rem;
    }
  }

  .solver-state {
    & > p {
      color: white;

      & > span {
        color: var(--light-white);
        font-weight: bold;
        margin-left: 0.4rem;
      }
    }
  }

`

const LabelWrapper = styled.div`
  padding-top:0;
  & > small {
    color: var(--light-gray);
    margin: 0;
  }

  & > p {
    /* color: var(--middle-blue); */
    /* font-size: 1.2em; */
    /* font-weight: bold; */
  }
`;

const ModifyButtonWrapper = styled.div`
  margin-top: 1rem;
  color: #d1d7e0;
  font-weight: bold;
  .edit {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em 1em 2em 1em;
    border-radius: 0.4em;
    border: 1px solid var(--dark-gray);
    margin-bottom: 1rem;

    & > button {
      background-color: var(--background-color);
      border: 2px solid #a5b513;
      font-weight: bold;
      color: #a5b513;
      padding: 0.3em 2em 0.3em 2em;
      margin-left: 2rem;
    }
    
  }

  .delete {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em 1em 2em 1em;
    border-radius: 0.4em;
    border: 1px solid var(--dark-gray);

    & > button {
      background-color: var(--background-color);
      border: 2px solid #c95047;
      font-weight: bold;
      color: #c95047;
      padding: 0.3em 2em 0.3em 2em;
      margin-left: 2rem;
    }
  }

  
`;