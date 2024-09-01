import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { useEffect, useState } from "react";
import { IPandoraCover } from "../types/pandora";
import { useAuth } from "../hook/AuthHook";
import PageLoading from "../loading/PageLoading";

interface IPandoraCoverProps {
  pandoraService: IPandoraService;
}

export default function PandoraCover({ pandoraService }: IPandoraCoverProps) {
  const { id } = useParams<{ id: string }>(); 
  const [pandoraCover, setPandoraCover] = useState<IPandoraCover | undefined>(undefined);
  const { status, signIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

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
        .finally(() =>  setIsLoading(false));
    } else {
      navigate('/404', { state: { message: '잘못된 접근: pandoraId가 정의되지 않음' } });
    }
  }, [id, pandoraService, navigate]);

  const handleClick = () => {
    const currentUrl = window.location.href;
    status().then((status) => {
      if (!status) {
        alert('구글 로그인이 필요한 서비스입니다. 로그인 창으로 이동합니다.');
        signIn(currentUrl);
      }
      if (status) {
        navigate(`/pandora/${id}/greenroom`);
      }
    });
  };

  if (!pandoraCover) {
    return (
      <>
        <PageLoading />
      </>
    )
  }
  
  return (
    <StyledContainer>
      {isLoading ? (
        <PageLoading />
      ) : (
      <>
        <h1>판도라 uuid : {pandoraCover.uuid}</h1>
        <p>작성자 : {pandoraCover.writer}</p>
        <h2>제목: {pandoraCover.title}</h2>
        <p>설명: {pandoraCover.description}</p>
        <p>조회수: {pandoraCover.coverViewCount}</p>
        
        <p>총 문제수: {pandoraCover.totalProblems}</p>
        <p>첫번째 질문: {pandoraCover.firstQuestion}</p>
        <p>첫번쨰 힌트: {pandoraCover.firstHint}</p>
        <p>생성일: {pandoraCover.createdAt}</p>
        <p>업데이트일: {pandoraCover.updatedAt}</p>
  
        <button onClick={handleClick}>도전하기</button>  
      </>
      )}
      
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


