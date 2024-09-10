import styled from "styled-components";
import { useEffect, useState } from "react";
import { IPandoraService } from "../../service/PandoraService";
import { IMyPandora } from "../../types/dashboard";
import { useNavigate } from "react-router-dom";

interface IMyPandorasProps {
  pandoraService: IPandoraService;
}

export default function MyPandoras({ pandoraService }: IMyPandorasProps) {
  const [pandoras, setPandoras] = useState<IMyPandora[] | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    pandoraService.getMyPandoras()
      .then((pandoras) => setPandoras(pandoras))
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
          navigate('/404', { state: { message: `${error.message}` } });
        } else {
          console.log(error);
        }
      })
  }, [pandoraService, navigate]);

  const handleClick = (pandoraId: string) => {
    // 경로와 쿼리파라미터는 별도로 관리해야 함.
    navigate(`/dashboard/${pandoraId}/log`);
  }
  
  return (
    <StyledContainer>
      {pandoras?.length === 0 && <h1>텅~</h1>}
      {pandoras?.map((pandora) => (
        <MyPandora onClick={() => handleClick(pandora.uuid)}>
          <h1>판도라 정보</h1>
          <h3>고유 라벨: {pandora.label}</h3>
          <p>uuid : {pandora.uuid}</p>
          <p>작성자 : {pandora.writer}</p>
          <p>제목 : {pandora.title}</p>
          <p>설명 : {pandora.description}</p>
          <p>키워드 : {pandora.keywords.map((keyword) => (
            <span>{keyword}, </span>
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
        </MyPandora>
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: #201231;
  color: white;
`;

const MyPandora = styled.div`
  padding: 10px;
  border: 1px solid blue;
  margin: 3rem;
`;