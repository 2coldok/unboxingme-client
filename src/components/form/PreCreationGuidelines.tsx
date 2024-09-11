import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function PreCreationGuidelines() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/pandora/create');
  };

  return (
    <StyledContainer>
      <h1>판도라 생성 주의사항</h1>
      <p>가이드1</p>
      <p>가이드2</p>
      <p>가이드3</p>
      <button onClick={handleClick}>판도라 만들기</button>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: blue;
  color: white;
`;
