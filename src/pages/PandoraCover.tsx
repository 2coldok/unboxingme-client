import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";
import { useEffect, useState } from "react";
import { IPandoraCover } from "../types/pandora";
import { useAuth } from "../hook/AuthHook";
import PageLoading from "../loading/PageLoading";
import { HttpError } from "../network/HttpClient";

interface IPandoraCoverProps {
  pandoraService: IPandoraService;
}

export default function PandoraCover({ pandoraService }: IPandoraCoverProps) {
  const { id } = useParams<{ id: string }>(); 
  const [pandoraCover, setPandoraCover] = useState<IPandoraCover | null>(null);
  const { me, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    if (!id) {
      return navigate('/fallback/404', { state: { message: 'id를 찾을 수 없습니다' } });
    }
    
    const fetchPandoraCover = async () => {
      try {
        const data = await pandoraService.getPandoraCover(id);
        if (data.success && data.payload) {
          setPandoraCover(data.payload);
        }
        if (data.success && data.payload === null) {
          return navigate('/fallback/404', { state : { message: '존재하지 않는 판도라id 입니다.' } });
        }
      } catch (error) {
        if (error instanceof HttpError) {
          navigate('/fallback/error', { state: { error: error, type: error.payload } });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPandoraCover();
  }, [id, pandoraService, navigate]);

  const handleClick = () => {
    const currentUrl = window.location.href;
    me().then((result) => {
      if (!result) {
        alert('구글 로그인이 필요한 서비스입니다. 로그인 창으로 이동합니다.');
        login(currentUrl);
      }
      if (result) {
        navigate(`/pandora/${id}/riddle`);
      }
    });
  };

  if (!pandoraCover) {
    return (
      <StyledContainer>
        <p>데이터를 불러올 수 없습니다.</p>
      </StyledContainer>
    )
  }
  
  return (
    <StyledContainer>
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <h1>판도라 uuid : {pandoraCover.id}</h1>
          <h3>고유 라벨: {pandoraCover.label}</h3>
          <p>작성자 : {pandoraCover.writer}</p>
          <p>제목: {pandoraCover.title}</p>
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
