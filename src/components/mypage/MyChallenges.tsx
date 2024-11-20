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
      <Title>내가 진행중인 수수께끼</Title>
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
