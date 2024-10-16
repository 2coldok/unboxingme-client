import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CreationGuidelines() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/pandora/form');
  };

  return (
    <StyledContainer>
      <button onClick={handleClick}>판도라 만들기</button>
      <h1>노트 만들기</h1>
      <p>표지 가이드</p>
      <p>키워드 가이드</p>
      <p>수수께끼 가이드</p>
      <p>노트 가이드</p>
      
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
`;