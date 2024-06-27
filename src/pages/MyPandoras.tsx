import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";
import { useEffect, useState } from "react";
import { IPandoraService } from "../service/PandoraService";
import { IMyPandora } from "../types/pandora";
import { useNavigate } from "react-router-dom";

interface IMyPandorasProps {
  pandoraService: IPandoraService;
}

export default function MyPandoras({ pandoraService }: IMyPandorasProps) {
  const [pandoras, setPandoras] = useState<IMyPandora[] | undefined>(undefined);
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      pandoraService.getMyPandoras()
        .then((pandoras) => setPandoras(pandoras))
        .catch((error) => {
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log(error);
          }
        })
    } else {
      navigate('/404', { state: { message: '인증 실패: 인증 정보가 없음(profile)' } });
    }
  }, [pandoraService, navigate, profile]);
  
  return (
    <StyledContainer>
      {pandoras?.map((pandora) => (
        <MyPandora>
          <p>writer : {pandora.writer}</p>
          <p>title : {pandora.title}</p>
          <p>description : {pandora.description}</p>
          <p>cat : {pandora.cat}</p>
        </MyPandora>
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: #201231;
  color: white;
`;

const MyPandora = styled.div`
  padding: 10px;
  border: 1px solid blue;
  margin: 2rem;
`;