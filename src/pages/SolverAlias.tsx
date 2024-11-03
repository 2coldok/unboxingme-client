import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { SOLVERALIAS } from "../constant/constraints";

interface ISolverAliasProps {
  unboxingService: IUnboxingService
}

export default function SolverAlias({ unboxingService }: ISolverAliasProps) {
  const { id } = useParams<{ id: string }>();
  const [solverAlias, setSolverAlias] = useState<string>('익명');
  const [solverAliasLoading, setSolverAliasLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    const fetchSolverAliasStatus = async () => {
      try {
        setSolverAliasLoading(true);
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
        setSolverAliasLoading(false);
      }
    }

    fetchSolverAliasStatus();
  }, [id, navigate, unboxingService]);

  const handleClick = async () => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '판도라 id를 찾을 수 없습니다.' } });
    }

    const trimmedSolverAlias = solverAlias.trim();

    if (trimmedSolverAlias.length > SOLVERALIAS.maxLength) {
      return;
    }

    if (trimmedSolverAlias === '') {
      setSolverAlias(SOLVERALIAS.default);
    }

    try {
      const data = await unboxingService.registerSolverAlias(id, trimmedSolverAlias);
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

  if (solverAliasLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <StyledContainer>
      <Head>게시물을 열람하기 위한 모든 질문이 해결되었습니다.</Head>
      <GuideWrapper>
        <p>* 모든 질문이 최초로 해결됨에 따라 본 게시물은 비공개로 전환됩니다.</p>
        <p>* 게시물 작성자가 확인할 수 있는 '열람자 별명'을 설정할 수 있으며 이후 수정할 수 없습니다.</p>
        <p>* 열람자 별명을 설정하지 않을 경우 게시물 작성자에게 익명으로 표시됩니다.</p>
        <p>* 열람한 게시물은 마이페이지에서 다시 확인할 수 있으며, 게시물이 삭제될 경우 마이페이지 열람 내역에서 삭제됩니다.</p>
      </GuideWrapper>
      <FormContainer>
        <InputWrapper>
          <label className="floating-label">열람자 별명 입력</label>
          <input 
            className="alias"
            type="text" 
            placeholder="익명"
            name="alias" 
            value={solverAlias}
            onChange={onChange}
            autoComplete="off"
            maxLength={SOLVERALIAS.maxLength}
          />
          <small> {solverAlias.length}/{SOLVERALIAS.maxLength}</small>
        </InputWrapper> 
      </FormContainer>
      <ButtonWrapper>
        <button onClick={handleClick}>게시물 열람하기</button>
      </ButtonWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  background-color: #252932;
  padding: 1.5em;
  border-radius: 0.4rem;
  @media (max-width: 768px) {
    border-style: none;
  }
`;

const Head = styled.h2`
  display: flex;
  /* color: var(--brand); */
`;

const GuideWrapper = styled.div`
  /* color: var(--font-chore); */
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
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
    /* color: var(--font-chore); */
    pointer-events: none;
    background-color: #252932;
  }

  .alias {
    background-color: #252932;
    width: 100%;
    border: 1px solid var(--font);
    padding: 1.2em 1em 1em 1em;
    :focus {
      border-color: var(--brand);
    }

  }

  &:focus-within .floating-label {
    color: var(--brand);
  }

  & > small {
    color: var(--dark-gray);
    margin-left: 0.3em;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  font-size: 1.1em;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
