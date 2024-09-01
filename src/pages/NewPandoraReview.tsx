import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ICreatedPandora } from "../types/pandora";

export default function NewPandoraReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { newPandora?: ICreatedPandora } | null;

  // location.state 가 null일 경우 + newPandora 속성이 없을 경우 대비
  useEffect(() => {
    if (!state?.newPandora) {
      navigate('/404', { state: { message: '잘못된 접근: 생성한 판도라가 없습니다.' } });
    }
  }, [state, navigate]);

  // useEffect훅이 실행되기 전 컴포넌트가 렌더링되기 때문에,
  // newPandora가 없을 때 useEffect 훅이 실행되기 전 렌더링 과정의 오류를 방지
  if (!state?.newPandora) {
    return null;
  }

  const { newPandora } = state;

  const handleClick = () => {
    navigate('/');
  };
  
  return (
    <StyledContainer>
      <p>pandoraUuid: {newPandora.uuid}</p>
      <p>작성자 :{newPandora.writer}</p>
      <p>제목 : {newPandora.title}</p>
      <p>설명 : {newPandora.description}</p>
      <h1>키워드</h1>
      {newPandora.keywords.map((keyword) => (
        <h2 key={uuidv4()}>{keyword}</h2>
      ))};
      <h1>문제</h1>
      {newPandora.problems.map((problem) => (
        <div key={uuidv4()}>
          <h1>{problem.question}</h1>
          <p>{problem.hint}</p>
          <p>{problem.answer}</p>
        </div>
      ))}
      <p>총 문제 수 : {newPandora.totalProblems}</p>
      <p>비밀 메세지 : {newPandora.cat}</p>
      <p>조회수: {newPandora.coverViewCount}</p>
      <p>문제를 모두 푼 사람 별명: {String(newPandora.solverAlias)}</p>
      <p>문제 풀이를 완료한 시점: {String(newPandora.solvedAt)}</p>
      <p>최종 메세지 열람 여부: {String(newPandora.isCatUncovered)}</p>
      <p>활성 상태 : {String(newPandora.active)}</p>
      <p>생성일 : {newPandora.createdAt}</p>
      <p>업데이트일: {String(newPandora.updatedAt)}</p>
      <h2>About Solver</h2>
      <button onClick={handleClick}>홈으로</button>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 80%;
  background-color: gray;
`;
