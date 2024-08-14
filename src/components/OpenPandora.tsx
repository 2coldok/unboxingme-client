import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IOpenPandoraProps {
  id: string | undefined;
}

export default function OpenPandora({ id }: IOpenPandoraProps) {
  const navigate = useNavigate();
  const message = `판도라 메세지를 열람하기 위한 모든 질문을 해결하였습니다. 판도라 발행자는 열람자를 확인할 수 없으며, 열람 사실을 확인할 수 있습니다. etc..`;

  const handleClick = () => {
    navigate(`/pandora/${id}/elpis`, { state: { allowed: true } });
  };

  return (
    <StyledContainer>
      <h1>Solved!</h1>
      <MessageWrapper>
        {message}
      </MessageWrapper>
      <button onClick={handleClick}>Open Pandora</button>
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
  color: #91a2ae;
  font-weight: bold;
  padding: 2rem;
  border: 3px solid green;
`;
