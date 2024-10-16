import styled from "styled-components";
import React, { Dispatch, useEffect, useState } from "react";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../util/Pagination";

import { IoPerson } from "react-icons/io5"; // writer
import { IoIosFingerPrint } from "react-icons/io"; // label
import { LuEye } from "react-icons/lu"; // coverViewCount
import { GoDotFill } from "react-icons/go"; // 게시중. 비공개 상태
import { formatTimeAgo } from "../../util/formatTimeAgo";
import { saveInSession } from "../../util/storage";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";


interface IMyPandorasProps {
  pandoraService: IPandoraService;
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

export interface IMyPandora {
  id: string;
  label: string;
  writer: string;
  title: string;
  coverViewCount: number;
  solverAlias: string | null;
  solvedAt: string | null;
  isCatUncovered: boolean;
  active: boolean;
  createdAt: string;
}

export default function MyPandoras({ pandoraService, currentPage, setCurrentPage }: IMyPandorasProps) {
  const [pandoras, setPandoras] = useState<IMyPandora[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); 
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const fetchMyPandoras = async () => {
      try {
        const data = await pandoraService.getMyPandoras(currentPage);
        saveInSession<number>('mine-currentPage', currentPage);
        const { total, pandoras } = data.payload;
        
        setPandoras(pandoras);
        setTotalItems(total);
      } catch (error) {
        navigate('/fallback/error', { state: { error: error } });
      } finally {
        stopLoading();
      }
    }

    fetchMyPandoras();
  }, [pandoraService, navigate, currentPage, startLoading, stopLoading]);

  const handleLogClick = (id: string) => {
    // 경로와 쿼리파라미터는 별도로 관리해야 함.(쿼리는 url에서 제거되는게 올바름)
    navigate(`/dashboard/pandora/${id}`);
  }
  
  return (
    <StyledContainer>
      <h1>나의 게시물 {`(${totalItems})`}</h1>
      {isLoading ? <LoadingSpinner /> : (
        <ul>
        {totalItems === 0 && <p>게시물이 없습니다.</p>}
        {pandoras.map((pandora) => (
          <MyPandoraList key={pandora.id} $active={pandora.active}>
            <h2 onClick={() => handleLogClick(pandora.id)}>{pandora.title}</h2>
            <p className="writer"> <IoPerson /> {pandora.writer}</p>                  
            <span className="viewcount"> <LuEye /> {pandora.coverViewCount}</span>
            <span className="created"> · {formatTimeAgo(pandora.createdAt)}</span>
            <p className="label"><IoIosFingerPrint /> {pandora.label}</p>
            <p className="state"><GoDotFill /> {pandora.isCatUncovered ? '열람됨' : '미열람'}</p>  
            <p className="br"></p>     
          </MyPandoraList>
         ))}
      </ul>
      )}
      {!isLoading && (
        <Pagination 
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={5}
          maxVisibleTotalPages={5}
          onPageChange={setCurrentPage}
        />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  /* background-color: #4dda59; */
  color: white;
  & > p {
    color: #b5b5b5;
    font-size: 1.5em;
    font-weight: bold;
  }

`;

const MyPandoraList = styled.li<{ $active: boolean }>`
  h2 {
    color: ${(props) => props.$active ? '#3b90f9' : 'gray'};
    margin: 0 0 0.3em 0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }  

  .state {
    color: ${(props) => props.$active ? '#b1b1b1' : '#4dda59'};
  }
  
  .writer {
    color: ${(props) => props.$active ? '#cbcbcb' : 'gray'};
    font-weight: bold;
    margin: 0 0 0.2em 0;
  }

  .viewcount {
    color: #686868;
  }

  .created {
    color: #686868;
  }

  .br {
    width: 100%;
    height: 0.5px;
    background-color: #606060;
  }

  .label {
    margin: 0.1em 0 0 0;
    font-size: 0.8em;
    color: #646464;
  }
`;
