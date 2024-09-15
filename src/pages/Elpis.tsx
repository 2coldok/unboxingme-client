import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPandoraService } from "../service/PandoraService";

interface EplisProps {
  pandoraService: IPandoraService;
}

export default function Elpis({ pandoraService }: EplisProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [elpis, setElpis] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    pandoraService.getElpis(id)
      .then((result) => {
        setElpis(result.elpis);
      })
      .catch((error) => setMessage(error.toString()));
  }, [id, navigate, pandoraService]);

  return (
    <StyledContainer>
      <h1>Inside of pandora</h1>
      <pre>{elpis}</pre>
      <p>{message}</p>
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
