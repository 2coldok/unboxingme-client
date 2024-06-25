import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { useEffect, useState } from "react";
import { IPandoraCover } from "../types/pandora";

interface IPandoraCoverProps {
  pandoraService: IPandoraService;
}

export default function PandoraCover({ pandoraService }: IPandoraCoverProps) {
  const { id } = useParams<{ id: string }>(); 
  const [pandoraCover, setPandoraCover] = useState<IPandoraCover | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      pandoraService.getPandoraCoverById(id)
        .then((pandora) => setPandoraCover(pandora))
        .catch((error) => {
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log(error);
          }
        })
    } else {
      navigate('/404', { state: { message: '잘못된 접근: pandoraId가 정의되지 않음' } });
    }
    
  }, [id, pandoraService, navigate]);

  if (!pandoraCover) {
    return <div>해당 판도라의 데이터가 존재하지 않음</div>
  }

  return (
    <StyledContainer>
      <p>판도라 id: {pandoraCover.id}</p>
      <h1>제목: {pandoraCover.title}</h1>
      <p>설명: {pandoraCover.description}</p>
      <p>최대 열람 제한: {pandoraCover.maxOpen}</p>
      <p>열람 횟수: {pandoraCover.openCount}</p>
      <p>조회수: {pandoraCover.viewCount}</p>
      <p>총 문제수: {pandoraCover.totalProblems}</p>
      <p>생성일: {pandoraCover.createdAt}</p>
      <p>업데이트일: {pandoraCover.updatedAt}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  background-color: #6a5a3c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  width: 80%;
  height: 800px;
`;


