import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CreationGuidelines() {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/pandora/form');
  };

  return (
    <>
      <Title>게시물 만들기</Title>
      <CreateWrapper>
        <p>게시물 생성 가이드를 참고하세요</p>
        <CreateButton onClick={handleClick}>판도라 만들기</CreateButton>

      </CreateWrapper>
      
    </>
  );
}

const Title = styled.h3`
  margin-left: 1em;
`;

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--border);
  margin: 1em;
  padding: 1em;
  border-radius: 0.7rem;
`;

const CreateButton = styled.button`
  max-width: 300px;
`;