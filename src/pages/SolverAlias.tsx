import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import PageLoading from "../loading/PageLoading";

interface ISolverAliasProps {
  unboxingService: IUnboxingService
}

const message = `판도라 메세지를 열람하기 위한 모든 질문을 해결하였습니다. 판도라 발행자는 열람자를 확인할 수 없으며, 열람 사실을 확인할 수 있습니다. etc..`;

export default function SolverAlias({ unboxingService }: ISolverAliasProps) {
  const { id } = useParams<{ id: string }>();
  const [solverAlias, setSolverAlias] = useState<string>('익명');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoading(true);
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    const fetchSolverAliasStatus = async () => {
      try {
        const data = await unboxingService.getSolverAliasStatus(id);
        console.log(data.payload);
        if (data.payload.isSolverAlias) {
          return navigate(`/pandora/${id}/note`, { replace: true });
        }
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state : { error: error, payload: error.payload }});
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSolverAliasStatus();
  }, [id, navigate, unboxingService]);

  const handleClick = async () => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '판도라 id를 찾을 수 없습니다.' } });
    }

    try {
      const data = await unboxingService.registerSolverAlias(id, solverAlias);
      if (data.success) {
        return navigate(`/pandora/${id}/note`);
      }
      
    } catch (error) {
      if (error instanceof HttpError) {
        return navigate('/fallback/error', { state: { error: error } });
      }
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSolverAlias(event.target.value);
  };

  if (isLoading) {
    return (
      <PageLoading />
    );
  }

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
