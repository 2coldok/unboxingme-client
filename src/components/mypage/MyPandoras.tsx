import styled from "styled-components";
import { useEffect, useState } from "react";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";
import EditAndDeleteConfirm from "../EditAndDeleteConfirm";

interface IMyPandorasProps {
  pandoraService: IPandoraService;
}

export interface ISelectedPandora {
  action: 'edit' | 'delete';
  id: string;
  label: string;
  title: string;
}

export interface IMyPandora {
  id: string;
  label: string;
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  totalProblems: number;
  cat: string;
  coverViewCount: number;
  solverAlias: string | null;
  solvedAt: string | null;
  isCatUncovered: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MyPandoras({ pandoraService }: IMyPandorasProps) {
  const [pandoras, setPandoras] = useState<IMyPandora[] | null>(null);
  const [selectedPandora, setSelectedPandora] = useState<ISelectedPandora | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPandoras = async () => {
      try {
        /**
         * pagination구현시 page상태를 중앙관리
         */
        const page = 1
        const data = await pandoraService.getMyPandoras(page);
        const { total, pandoras } = data.payload;
        
        if (total === 0) {
          setPandoras(null);
        }
        setPandoras(pandoras);
      } catch (error) {
        navigate('/fallback/error', { state: { error: error } });
      }
    }
    
    fetchMyPandoras();
  }, [pandoraService, navigate]);

  const handleLogClick = (id: string) => {
    // 경로와 쿼리파라미터는 별도로 관리해야 함.(쿼리는 url에서 제거되는게 올바름)
    navigate(`/dashboard/pandora/${id}/log`);
  }

  const handleEdit = (id: string) => {
    return navigate(`/pandora/form/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const data = await pandoraService.deleteMyPandora(id);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      return navigate('/fallback/error', { state: { error: error } });
    }
  };

  const handleSelectedPandora = (action: 'edit' | 'delete', id: string, label: string, title: string) => {
    setSelectedPandora({ action: action, id: id, label: label, title: title });
  }

  const handleCancelAction = () => {
    setSelectedPandora(null);
  };

  if (!pandoras) {
    return (
      <StyledContainer>
        <h1>만든 판도라가 없습니다.</h1>
      </StyledContainer>
    );
  }
  
  return (
    <StyledContainer>
      {pandoras.map((pandora) => (
        <>
          <MyPandoraWrapper>
            <h1>판도라 정보</h1>
            <h3>고유 라벨: {pandora.label}</h3>
            <p>uuid : {pandora.id}</p>
            <p>작성자 : {pandora.writer}</p>
            <p>제목 : {pandora.title}</p>
            <p>설명 : {pandora.description}</p>
            <p>키워드 : {pandora.keywords.map((keyword) => (
              <span>{keyword} </span>
            ))}</p>
            <p>문제 : 생략</p>
            <p>총 문제 수 : {pandora.totalProblems}</p>
            <p>cat : {pandora.cat}</p>
        
            <h1>판도라 대시보드</h1>
            <p>조회수 : {pandora.coverViewCount}</p>
            <p>문제 푼 사람 별명 : {pandora.solverAlias ? pandora.solverAlias : '아직 푼 사람이 없어요'}</p>
            <p>문제 푼 시점 : {String(pandora.solvedAt)}</p>
            <p>최종 메세지 확인 여부: {String(pandora.isCatUncovered)}</p>
  
            <h1>기타 정보</h1>
            <p>활성 여부: {String(pandora.active)}</p>
            <p>판도라 생성일: {String(pandora.createdAt)}</p>
            <p>판도라 업데이트일: {String(pandora.updatedAt)}</p>
          </MyPandoraWrapper>
          <OptionWrapper>
            <button onClick={() => handleLogClick(pandora.id)}>도전 현황 보기</button>
            <button onClick={() => handleSelectedPandora('edit', pandora.id, pandora.label, pandora.title)}>수정</button>
            <button onClick={() => handleSelectedPandora('delete', pandora.id, pandora.label, pandora.title)}>삭제</button>
            <button>비공개</button>
          </OptionWrapper>
        </>
      ))}

      {selectedPandora && (
        <EditAndDeleteConfirm
          pandora={selectedPandora}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCancel={handleCancelAction}
         />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: #0c0c95;
  color: white;
`;

const MyPandoraWrapper = styled.div`
  border: 10px solid white;
  margin: 1rem;
`;

const OptionWrapper = styled.div`
  background-color: #114a36;
  color: white;
`;
