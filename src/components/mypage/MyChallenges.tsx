import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoading } from "../../hook/LoadingHook";
import { LoadingSpinner } from "../../loading/LoadingSpinner";
import PandoraList from "../PandoraList";
import { useChallengesQuery } from "../../hook/QueryHook";

export default function MyChallenges() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const { startLoading, stopLoading } = useLoading();

  const {
    isLoading,
    data = { payload: [] },
    error
  } = useChallengesQuery();

  useEffect(() => {
    setSearchParams({ tab: 'challenges' });
  }, [setSearchParams]);

  useEffect(() => {
    isLoading ? startLoading() : stopLoading();
  });

  useEffect(() => {
    if (error) {
      return navigate('/fallback/error', { state: { error: error }, replace: true });
    }
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      <Title>내가 진행중인 메시지</Title>
      {data.payload.length === 0 && (
        <Empty>진행중인 메시지가 없습니다.</Empty>
      )}

      <PandoraList
        action="cover"
        pandoras={data.payload}
      />
      <BlankWrapper></BlankWrapper>
    </>
  );
}

const Title = styled.h3`
  margin-left: 1em;
`;

// 모바일 화면시 하단 네비게이션 바와 떨어뜨리기 위함
const BlankWrapper = styled.div`
  margin-bottom: 130px;
`;

const Empty = styled.div`
  border: 1px dashed #676767;
  background-color: var(--background-riddle);
  margin: 1em;
  padding: 1em;
  border-radius: 0.7rem;
  min-height: 100px;
`;
