import { AiFillLock } from "react-icons/ai"; // 자물쇠
import { IoPerson } from "react-icons/io5"; // writer
import { LuEye } from "react-icons/lu"; // coverViewCount
import styled from "styled-components";
import { formatTimeAgo } from "../util/formatTimeAgo";
import { useNavigate } from "react-router-dom";
import { BsUpc } from "react-icons/bs"; // 라벨

interface IPandoraListProps {
  action: 'glimpse' | 'cover' | 'conquered' | 'detail';
  keyword?: string;
  pandoras: {
    id: string;
    label: string;
    writer: string;
    title: string;
    totalProblems: number;
    coverViewCount: number;
    createdAt: string;
    isCatUncovered: boolean;
    solverAlias?: boolean; // Only from MyConquered Component
    solvedAt?: boolean; // Only from MyConquered
  }[];
}

export default function PandoraList({ pandoras, action, keyword }: IPandoraListProps) {
  const navigate = useNavigate();

  const handleClick = (id: string, solverAlias?: boolean) => {
    if (action === 'glimpse') {
      return;
    }
    if (action === 'cover') {
      if (keyword) {
        return navigate(`/pandora/${id}?keyword=${keyword}`);
      } else {
        return navigate(`/pandora/${id}`);
      }
    }
    if (action === 'conquered') {
      if (!solverAlias) {
        return navigate(`/pandora/${id}/solveralias`);  
      } 
        
      if (solverAlias) {
        return navigate(`/pandora/${id}/note`);
      }
    }
    if (action === 'detail') {
      return navigate(`/dashboard/pandora/${id}`);
    }
  };

  return (
    <PandorasContainer>
      {pandoras.map((pandora) => (
        <PandoraWrapper key={pandora.id}>
          <Title onClick={() => handleClick(pandora.id, pandora?.solverAlias)}>{pandora.title}</Title>
          <InfoWrapper>
            <div>
              <Writer> <IoPerson /> {pandora.writer}</Writer>                  
              <MainInfo> 
                <AiFillLock /> {pandora.totalProblems} ·&nbsp;
                <LuEye /> {pandora.coverViewCount} ·&nbsp;
                {formatTimeAgo(pandora.createdAt)}
              </MainInfo>
              <Label><BsUpc /> {pandora.label}</Label>
            </div>
            <div>
              <State $state={getPandoraState(pandora.solvedAt, pandora.solverAlias, pandora.isCatUncovered)}>
                {getPandoraState(pandora.solvedAt, pandora.solverAlias, pandora.isCatUncovered)}
              </State>
            </div>
          </InfoWrapper>
        </PandoraWrapper>
      ))}
    </PandorasContainer>
  );
}

function getPandoraState(solvedAt = false, solverAlias = false, isCatUncovered: boolean) {
  if (isCatUncovered) {
    return '열람됨';
  }
  if (solvedAt && !solverAlias) {
    return '열람대기';
  }
  return '미열람';
}

const PandorasContainer = styled.ul`
  margin: 0;
`;

const PandoraWrapper = styled.li`
  border-bottom: 1px solid var(--border);
  padding: 1em;
`;

const Title = styled.h2`
  color: var(--brand);
  font-weight: 800;
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
  margin: 0.9em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const MainInfo = styled.p`
  display: flex;
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

const State = styled.p<{ $state: '열람됨' | '열람대기' | '미열람' }>`
  display: flex;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 3px 7px 3px 7px;
  border-radius: 0.7rem;

  border: ${({ $state }) =>
    $state === '열람됨'
      ? '1px solid #4c7a5e'
      : $state === '열람대기'
      ? '1px solid #444444'
      : '1px solid #445261'};

  background: ${({ $state }) =>
    $state === '열람됨'
      ? '#334b43'
      : $state === '열람대기'
      ? '#dde296'
      : '#353d44'};

  color: ${({ $state }) =>
    $state === '열람됨'
      ? '#87e89f'
      : $state === '열람대기'
      ? '#000000'
      : '#b7c9e1'};
  
`;
// #ffd54f