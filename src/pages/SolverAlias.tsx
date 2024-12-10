import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { SOLVERALIAS } from "../constant/constraints";
import { useNavigate, useParams } from "react-router-dom";
import { HttpError } from "../network/HttpClient";
import { IUnboxingService } from "../service/UnboxingService";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { useAuth } from "../hook/AuthHook";

interface ISolverAliasProps {
  unboxingService: IUnboxingService
}

export default function SolverAlias({ unboxingService }: ISolverAliasProps) {
  const { id } = useParams<{ id: string }>();
  const [solverAlias, setSolverAlias] = useState('');
  const [solverAliasLoading, setSolverAliasLoading] = useState(true);
  const { csrfToken } = useAuth();
  const navigate = useNavigate();

  const asciiArrays = [
    ' .d8888b.           888                        888',
    'd88P  Y88b          888                        888',
    'Y88b.               888                        888',
    ' "Y888b.    .d88b.  888 888  888  .d88b.   .d88888',
    '    "Y88b. d88""88b 888 888  888 d8P  Y8b d88" 888',
    '      "888 888  888 888 Y88  88P 88888888 888  888',
    'Y88b  d88P Y88..88P 888  Y8bd8P  Y8b.     Y88b 888',
    ' "Y8888P"   "Y88P"  888   Y88P    "Y8888   "Y88888'
  ];

  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    if (!csrfToken) {
      return;
    }

    const fetchSolverAliasStatus = async () => {
      try {
        setSolverAliasLoading(true);
        const data = await unboxingService.getSolverAliasStatus(id, csrfToken);
        // 잘못된접근: 이미 solverAlias가 설정되어 있음
        if (data.payload.isSolverAlias) {
          return navigate('/');
        }
      } catch (error) {
        // solverAlias 페이지에 접근 자격이 없음
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state : { error: error }, replace: true});
        }
      } finally {
        setSolverAliasLoading(false);
      }
    }

    fetchSolverAliasStatus();
  }, [id, navigate, unboxingService, csrfToken]);

  const handleClick = async () => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '판도라 id를 찾을 수 없습니다.' } });
    }
    
    if (!csrfToken) {
      return;
    }

    const trimmedSolverAlias = solverAlias.trim();

    if (trimmedSolverAlias.length > SOLVERALIAS.maxLength) {
      return;
    }

    if (trimmedSolverAlias === '') {
      setSolverAlias(SOLVERALIAS.default);
    }

    try {
      const data = await unboxingService.registerSolverAlias(id, trimmedSolverAlias, csrfToken);
      if (data.success) {
        return navigate(`/pandora/${id}/note`);
      }
      
    } catch (error) {
      if (error instanceof HttpError) {
        return navigate('/fallback/error', { state: { error: error }, replace: true });
      }
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSolverAlias(event.target.value);
  };

  if (solverAliasLoading) {
    return <LoadingSpinner />
  }

  return (
    <StyledContainer>
      <SovlerAliasWrapper>
        <TopWrapper>
          <Logo>
            <img src="/logo.png" alt="logo" />
            <span>RiddleNote</span>
          </Logo>
        </TopWrapper>

        <MiddleWrapper>
          <LeftBody>
            <Ascii>
              {asciiArrays.join('\n')}
            </Ascii>
          </LeftBody>
          <RightBody>
            <Message>* 모든 질문이 최초로 해결되어 메시지 링크가 비공개로 전환되었습니다.</Message>
            <Message>* 메시지 작성자가 확인할 수 있는 '열람자 별명'을 입력해주세요. 열람자 별명은 이후 수정할 수 없습니다.</Message>
            <InputWrapper>
              <label className="floating-label">열람자 별명</label>
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
          </RightBody>
        </MiddleWrapper>

        <BottomWrapper>
          <button onClick={handleClick}>메시지 확인하기</button>
        </BottomWrapper>
        
        
        
      </SovlerAliasWrapper>
      
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const SovlerAliasWrapper = styled.div`
  background-color: #252932;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 50%;
  max-width: 1000px;
  border-radius: 1rem;
  @media (max-width: 900px) {
    max-width: none;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  height: 60px;
  border-bottom: 1px solid var(--border);
  @media (max-width: 900px) {
    flex-direction: column;
    border-style: none;
    /* margin-top: 1em; */
    padding: 0;
    height: 120px;
  }
`;

const Logo = styled.p`
  display: flex;
  align-items: center;
  flex-grow: 0;
  font-weight: bold;
  font-size: 1.3em;
  cursor: pointer;

  img {
    width: 30px;
    height: auto;
    margin-right: 0.5em;
  }

  span {
    margin-top: 0.2em;
    font-family: "Grandstander", cursive;
    font-weight: 600;
  }
`;


const MiddleWrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: 1em 1.2em;
  @media (max-width: 900px) {
    width: 100%;
    height: 40%;
  }
`;

const Ascii = styled.pre`
  font-family: monospace;
  white-space: pre-wrap;
  background-color: var(--background-riddle);
  color: #5699f8;
  font-weight: 900;
  font-size: 0.6rem;
  @media (max-width: 900px) {
    font-size: 0.5rem;
  }
`;

const RightBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 1.5em;
  @media (max-width: 900px) {
    width: 100%;
    height: 60%;
  }

  input {
    width: 100%;
    height: 2.5em;
  }

  // 남은 시도 횟수
  span {
    display: flex;
    align-self: flex-start;
    margin-top: 5px;
    margin-left: 5px;
    color: var(--font-warning);

  }
`;

const Message = styled.p`
  font-size: 1.1em;
`

const InputWrapper = styled.div`
  position: relative;
  width: 22rem;
  margin-top: 2em;
  @media (max-width: 950px) {
    width: 90%;
  }

  .floating-label {
    position: absolute;
    top: -7px;
    left: 15px;
    padding: 0 7px;
    font-size: 12px;
    font-weight: 600;
    pointer-events: none;
    background-color: var(--background-riddle);
  }

  .alias {
    background-color: var(--background-riddle);
    width: 100%;
    border: 2px solid var(--font-main);
    padding: 1.5em 1em 1.3em 1em;
    :focus {
      border-color: var(--brand);
    }

  }

  &:focus-within .floating-label {
    color: var(--brand);
  }

  & > small {
    color: var(--font-info);
    margin-left: 0.3em;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
  width: 100%;
  height: 60px;
  padding-bottom: 20px;
  padding-right: 25px;
  @media (max-width: 900px) {
    padding: 10px;
  }

  button {
    height: 40px;
    @media (max-width: 900px) {
      width: 100%;
    
    }
  }
`;











{/* <PreText>
          {asciiArtWidthSolved.join('\n')}
        </PreText>
const PreText = styled.pre`
  font-family: monospace;
  white-space: pre-wrap;
  background-color: #282a26;
  color: #01f507;
  color: var(--brand);
  min-height: 10rem;
  font-size: 0.7rem;
`; */}
