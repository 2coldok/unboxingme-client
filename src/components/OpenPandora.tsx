import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IOpenPandoraProps {
  id: string | undefined;
}

export default function OpenPandora({ id }: IOpenPandoraProps) {
  const navigate = useNavigate();
  const [solverAlias, setAlias] = useState('익명');
  const message = `판도라 메세지를 열람하기 위한 모든 질문을 해결하였습니다. 판도라 발행자는 열람자를 확인할 수 없으며, 열람 사실을 확인할 수 있습니다. etc..`;

  const handleClick = () => {
    navigate(`/pandora/${id}/elpis`, { state: { allowed: true, solverAlias: solverAlias } });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value);
  };

  return (
    <StyledContainer>
      <h1>Solved!</h1>
      <MessageWrapper>
        {message}
      </MessageWrapper>

      <label>
        <span>열람자 별명</span>
        <input 
          type="text" 
          name="alias" 
          placeholder="익명" 
          value={solverAlias}
          onChange={onChange}
        />
      </label>

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
