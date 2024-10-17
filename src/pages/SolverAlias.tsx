import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import { useLoading } from "../hook/LoadingHook";
import { LoadingSpinner } from "../loading/LoadingSpinner";

interface ISolverAliasProps {
  unboxingService: IUnboxingService
}

export default function SolverAlias({ unboxingService }: ISolverAliasProps) {
  const { id } = useParams<{ id: string }>();
  const [solverAlias, setSolverAlias] = useState<string>('익명');
  const { isLoading, startLoading, stopLoading } = useLoading()
  const navigate = useNavigate();
  
  useEffect(() => {
    startLoading()
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    const fetchSolverAliasStatus = async () => {
      try {
        const data = await unboxingService.getSolverAliasStatus(id);
        // 잘못된접근: 이미 solverAlias가 설정되어 있음
        if (data.payload.isSolverAlias) {
          return navigate('/fallback/404', { state: { message: '잘못된 접근입니다.' } });
        }
      } catch (error) {
        // solverAlias 페이지에 접근 자격이 없음
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state : { error: error, payload: error.payload }});
        }
      } finally {
        stopLoading();
      }
    }

    fetchSolverAliasStatus();
  }, [id, navigate, unboxingService, startLoading, stopLoading]);

  const handleClick = async () => {
    startLoading();
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
    } finally {
      stopLoading();
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSolverAlias(event.target.value);
  };

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <StyledContainer>
      <MessageWrapper>
        <h2>게시물을 열람하기 위한 모든 질문을 해결하였습니다!</h2>
        <div className="notion">
          <p>* 모든 질문이 최초로 해결됨에 따라 본 게시물은 비공개로 전환됩니다.</p>
          <p>* 게시물 작성자가 확인할 수 있는 '열람자 별명'을 설정할 수 있으며 이후 수정할 수 없습니다.</p>
          <p>* 게시물 작성자는 설정된 '열람자 별명' 이외의 열람자의 정보를 확인할 수 없습니다.</p>
          <p>* 열람한 게시물은 마이페이지에서 다시 확인할 수 있으며, 게시물이 삭제될 경우 마이페이지 열람 내역에서 삭제됩니다.</p>
       </div>

       <InputWrapper>
          <label className="floating-label">열람자 별명 입력</label>
          <input 
            className="alias"
            type="text" 
            name="alias" 
            placeholder="익명" 
            value={solverAlias}
            onChange={onChange}
            autoComplete="off"
            maxLength={40}
          />
          <small> {solverAlias.length}/40</small>
       </InputWrapper> 

       <button onClick={handleClick}>게시물 내용 확인하기</button>
      </MessageWrapper>
      
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  margin-top: 3rem;
  width: 100%;
  flex-direction: column;
  color: #ECECEC;
  border: 1px solid var(--dark-gray);
  border-radius: 0.5rem;
`;

const MessageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-weight: bold;
  padding: 2rem;
  border-radius: 1rem;

  & > svg {
    font-size: 4em;
    color: #48be44
  }

  .notion {
    display: flex;
    flex-direction: column;
    font-weight: normal;
    /* color: #837f7f; */
    color: var(--light-white);
    border-radius: 1rem;
    padding: 0.3rem;
  }

  button {
    width: 20rem;
    margin-top: 2rem;
    background-color: var(--middle-blue);
    color: white;
    font-weight: bold;
    padding: 0.6em 2em 0.6em 2em;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 20rem;
  margin-top: 2em;
  @media (max-width: 768px) {
    width: 100%;
  }

  .floating-label {
    position: absolute;
    top: -5px;
    left: 15px;
    padding: 0 7px;
    font-size: 12px;
    color: var(--middle-blue);
    pointer-events: none;
    background-color: var(--background-color);
  }

  .alias {
    background-color: var(--background--color);
    color: white;
    width: 100%;
    padding: 1em;
    font-size: 1em;
    border: 1.5px solid var(--light-gray);
    border-radius: 0.4rem;
    outline: none;
    :focus {
      border-color: var(--middle-blue);
    }
  }

  & > small {
    color: var(--dark-gray);
  }
`;
