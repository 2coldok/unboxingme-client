import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPandoraService } from "../service/PandoraService";
import styled from "styled-components";

interface ISolverAliasProps {
  pandoraService: IPandoraService
}

const message = `판도라 메세지를 열람하기 위한 모든 질문을 해결하였습니다. 판도라 발행자는 열람자를 확인할 수 없으며, 열람 사실을 확인할 수 있습니다. etc..`;

export default function SolverAlias({ pandoraService }: ISolverAliasProps) {
  const { id } = useParams<{ id: string }>();
  const [solverAlias, setSolverAlias] = useState<string>('익명');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    pandoraService.getSolverAliasStatus(id).then(({ isSolverAlias }) => {
      // solverAlias가 존재하면 elpis 페이지로 이동
      if (isSolverAlias) {
        return navigate(`/pandora/${id}/elpis`);
      }
      // solverAlias가 존재하지 않으면 이 페이지에서 patch 요청을 진행할 수 있도록 함
    });
  }, [id, navigate, pandoraService]);

  const handleClick = () => {
    if (id) {
      pandoraService.registerSolverAlias(id, solverAlias)
        .then(() => navigate(`/pandora/${id}/elpis`));
    }        
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSolverAlias(event.target.value);
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