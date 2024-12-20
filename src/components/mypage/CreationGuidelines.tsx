import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hook/AuthHook";
import AppFooter from "../AppFooter";

export default function CreationGuidelines() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const { getTokenStatus } = useAuth();

  const handleClick = async () => {
    const status = await getTokenStatus();
    if (!status) {
      return navigate('/');
    }
    return navigate('/pandora/form');
  };

  useEffect(() => {
    setSearchParams({ tab: 'create' })
  }, [setSearchParams]);

  return (
    <>
      <Title>메시지 만들기</Title>
      <CreateWrapper>
        <p>메시지를 만들기 전
        <Link href="/about/guide" target="_blank" rel="noopener noreferrer"> 메시지 생성 가이드 </Link> 
          내용을 확인해주세요.
        </p>
        <CreateButton onClick={handleClick}>메시지 만들기</CreateButton>
      </CreateWrapper>
      
      <AppFooter />
    </>
  );
}

const Title = styled.h3`
  margin-left: 1em;
`;

const CreateWrapper = styled.div`
  border: 1px solid var(--border);
  background-color: var(--background-riddle);
  margin: 1em;
  padding: 1em;
  border-radius: 0.7rem;
`;

const CreateButton = styled.button`
  max-width: 300px;
`;

const Link = styled.a`
  color: var(--brand);
  font-weight: 700;
`;
