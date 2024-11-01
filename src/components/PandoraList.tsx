import { AiFillLock } from "react-icons/ai"; // 자물쇠
import { IoPerson } from "react-icons/io5"; // writer
import { LuEye } from "react-icons/lu"; // coverViewCount
import styled from "styled-components";
import { formatTimeAgo } from "../util/formatTimeAgo";
import { GoDotFill } from "react-icons/go"; // 구분점
import { useNavigate } from "react-router-dom";
import { BsUpc } from "react-icons/bs"; // 라벨

interface IPandoraListProps {
  action: 'glimpse' | 'cover' | 'conquered' | 'detail';
  keyword: string;
  pandoras: {
    id: string;
    label: string;
    writer: string;
    title: string;
    totalProblems: number;
    coverViewCount: number;
    createdAt: string;
    isCatUncovered: boolean;
    solverAlias?: string | null; // Only from MyConquered Component
  }[];
}

export default function PandoraList({ pandoras, action, keyword }: IPandoraListProps) {
  const navigate = useNavigate();

  const handleClick = (id: string, solverAlias?: string | null) => {
    if (action === 'glimpse') {
      return;
    }
    if (action === 'cover') {
      return navigate(`/pandora/${id}?keyword=${keyword}`);
    }
    if (action === 'conquered') {
      console.log('solverAlias', solverAlias);
      if (solverAlias === null) {
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
              <State $open={pandora.isCatUncovered}><GoDotFill/> {pandora.isCatUncovered ? '열람됨' : '미열람'}</State>
            </div>
          </InfoWrapper>
        </PandoraWrapper>
      ))}
    </PandorasContainer>
  );
}

const PandorasContainer = styled.ul`
  margin: 0;
`;

const PandoraWrapper = styled.li`
  border-bottom: 1px solid var(--divide);
  padding: 1em;
`;

const Title = styled.h2`
  color: var(--list-title);
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
  color: var(--list-info);
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
  svg {
    margin-right: 0.3em;
    color: ${({ $open }) => $open ? '#4caf50' : '#ffd54f '}
  }
`;
