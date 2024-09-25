import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";

interface NoteProps {
  unboxingService: IUnboxingService;
}

export default function Note({ unboxingService }: NoteProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [note, setNote] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '판도라 id를 찾을 수 없습니다.' } });
    }

    const fetchNote = async () => {
      try {
        const data = await unboxingService.getNote(id);
        console.log(data.payload);
        if (data.success) {
          setNote(data.payload.note);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error, payload: error.payload } });
        }
      }
    }

    fetchNote();
  }, [id, navigate, unboxingService]);

  return (
    <StyledContainer>
      <h1>Note Content</h1>
      <pre>{note}</pre>
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
