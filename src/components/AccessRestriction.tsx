import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IAccessRestrictionProps {
  restrictedUntil: string | null;
}

export default function AccessRestriction({ restrictedUntil }: IAccessRestrictionProps) {
  const navigate = useNavigate();
  
  const handleHomeButton = () => {
    navigate('/');
  };
  
  return (
    <StyledContainer>
      <MessageWrapper>{restrictedUntil} 까지 접근이 제한됩니다.</MessageWrapper>
      <button onClick={handleHomeButton}>홈으로</button>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ECECEC;
  border: 1px solid #54ce7d;
  width: 80%;
  height: 800px;
`;

const MessageWrapper = styled.div`
  display: flex;
  padding: 1em;
  border: 1px solid red;
  color: red;
  margin-bottom: 10px;
`;
