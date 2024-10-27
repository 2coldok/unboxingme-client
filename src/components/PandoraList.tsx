import { AiFillLock } from "react-icons/ai"; // 자물쇠
import { IoPerson } from "react-icons/io5"; // writer
import { LuEye } from "react-icons/lu"; // coverViewCount
import styled from "styled-components";
import { formatTimeAgo } from "../util/formatTimeAgo";
import { BiSolidLabel } from "react-icons/bi"; // label
import { GoDotFill } from "react-icons/go"; // 구분점
import { useNavigate } from "react-router-dom";

interface IPandoraListProps {
  action: 'cover' | 'conquered' | 'detail';
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
    <SearchUl>
      {pandoras.map((pandora) => (
        <SearchList key={pandora.id}>
          <h2 className="title" onClick={() => handleClick(pandora.id, pandora?.solverAlias)}>{pandora.title}</h2>
          <InfoWrapper $open={pandora.isCatUncovered}>
            <div>
              <p className="writer"> <IoPerson /> {pandora.writer}</p>                  
              <p className="view-createdat"> 
                <AiFillLock /> {pandora.totalProblems} ·&nbsp;
                <LuEye /> {pandora.coverViewCount} ·&nbsp;
                {formatTimeAgo(pandora.createdAt)}
              </p>
              <p className="label"><BiSolidLabel /> {pandora.label}</p>
            </div>
            <div>
              <p className="state"><GoDotFill/> {pandora.isCatUncovered ? '열람됨' : '미열람'}</p>
            </div>
          </InfoWrapper>
        </SearchList>
      ))}
    </SearchUl>
  );
}

const SearchUl = styled.ul`
  margin: 0;
`;

const SearchList = styled.li`
  background-color: var(--gray300);
  border-bottom: 1px solid var(--gray200);
  padding: 1em 1.5em 1em 1em;

  .title {
    color: var(--blue100);
    cursor: pointer;
    margin: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoWrapper = styled.div<{ $open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-itmes: center;

  .writer {
    display: flex;
    color: var(--white200);
    font-weight: bold;
    font-size: 1.1em;
    margin: 0.9em 0 0.2em 0;
    svg {
      margin-right: 0.3em;
    }
  }

  .view-createdat {
    display: flex;
    color: var(--gray100);
    margin: 0.3em 0 0.2em 0;
    svg {
      margin-right: 0.3em;
    }
  }

  .label {
    display: flex;
    margin: 0.6em 0 0 0;
    font-size: 0.8em;
    color: var(--gray100);
    svg {
      margin-right: 0.3em;
    }
  }

  .state {
    display: flex;
    color: var(--gray100);  
    svg {
      margin-right: 0.3em;
      color: ${({ $open }) => $open ? 'green' : 'yellow'}
    }
  }
`;
