import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IElpisService } from "../service/ElpisService";

interface EplisProps {
  elpisService: IElpisService;
}

export default function Elpis({ elpisService }: EplisProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [elpis, setElpis] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) {
      return navigate('/404', { state: { message: '잘못된 접근: 판도라 아이디를 전달받지 못했습니다.' } });
    }

    elpisService.getElpis(id)
      .then((result) => {
        setElpis(result.elpis);
      })
      .catch((error) => setMessage(error.toString()));
  }, [id, navigate, elpisService]);

  return (
    <StyledContainer>
      <h1>Inside of pandora</h1>
      <pre>{elpis}</pre>
      <p>{message}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  background-color: black;
  color: white;
  border: 1px solid white;
  width: 80%;
  height: 800px;
`;
