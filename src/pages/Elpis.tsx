import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";

interface EplisProps {
  unboxingService: IUnboxingService;
}

export default function Elpis({ unboxingService }: EplisProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [elpis, setElpis] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    const fetchElpis = async () => {
      try {
        const data = await unboxingService.getElpis(id);
        setElpis(data.elpis);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error } });
        }
      }
    }

    fetchElpis();
  }, [id, navigate, unboxingService]);

  return (
    <StyledContainer>
      <h1>Inside of pandora</h1>
      <pre>{elpis}</pre>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  background-color: #1c2028;
  color:  #d1d1d1;
  border: 1px solid white;
  width: 80%;
  height: 800px;
  font-family: 'DungGeunMo', sans-serif;
  font-size: 24px;

  & > pre {
    font-family: 'DungGeunMo', sans-serif;
  }
`;
