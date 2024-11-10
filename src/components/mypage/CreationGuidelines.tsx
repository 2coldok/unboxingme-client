import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

export default function CreationGuidelines() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    return navigate('/pandora/form');
  };

  useEffect(() => {
    setSearchParams({ tab: 'create' })
  }, [setSearchParams]);

  return (
    <>
      <Title>나의 게시물 만들기</Title>
      <CreateWrapper>
        <p>게시물을 생성하기전 
        <Link href="/about/caution" target="_blank" rel="noopener noreferrer"> 게시물 작성 주의사항</Link> 
        을 확인해주세요.
        </p>
        <CreateButton onClick={handleClick}>게시물 만들기</CreateButton>

      </CreateWrapper>
      
    </>
  );
}

const Title = styled.h3`
  margin-left: 1em;
`;

const CreateWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  display: inline-block;
  border: 1px solid var(--border);
  margin: 1em;
  padding: 1em;
  border-radius: 0.7rem;
`;

const CreateButton = styled.button`
  max-width: 300px;
`;

const Link = styled.a`
  
`