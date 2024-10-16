import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import { INote } from "../types/unboxing";
import { LuEye } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { IoIosFingerPrint } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

interface NoteProps {
  unboxingService: IUnboxingService;
}

export default function Note({ unboxingService }: NoteProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [pandora, setPandora] = useState<INote | null>(null);

  useEffect(() => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '판도라 id를 찾을 수 없습니다.' } });
    }

    const fetchNote = async () => {
      try {
        const data = await unboxingService.getNote(id);
        setPandora(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error, payload: error.payload } });
        }
      }
    }

    fetchNote();
  }, [id, navigate, unboxingService]);

  if (!pandora) {
    return null;
  }

  return (
    <StyledContainr>
      <CoverWrapper>
        <HeadWrapper>
          <h1 className="title">{pandora.title}</h1>
          <p className="writer"><IoPerson /> {pandora.writer}</p>
          <p className="view-created"><LuEye /> {pandora.coverViewCount} &nbsp;·&nbsp; <GoClock /> {pandora.createdAt}</p>
          <p className="label"><IoIosFingerPrint /> {pandora.label}</p>
        </HeadWrapper>
  
        <DescriptionWrapper>
         <pre className="description">{pandora.description}</pre>
         <pre className="note">{pandora.note}</pre>
        </DescriptionWrapper> 
      </CoverWrapper>
   </StyledContainr>
  );
}

const StyledContainr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%; 
  padding: 4em;
  @media (max-width: 768px) {
    padding: 0;
  }
`

const CoverWrapper = styled.div`
  border: 1px solid var(--dark-gray);
  border-radius: 1em;
  overflow: hidden;
`;

const HeadWrapper = styled.div`
  background-color: #1c1f24;
  padding: 1.5em;
  .title {
    color: #1775d9;
    margin: 0;
  }

  .writer {
    margin: 0.1em 0 0 0;
  }

  .view-created {
    margin: 0.1em 0 0 0;
    color: #686868;
  }

  .label {
    margin: 0.1em 0 0 0;
    color: #686868;
  }
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  font-size: 1.5em;

  & > pre {
    white-space: pre-wrap;
  }


  .description {
    padding: 1.5em 1em 1.5em 1em;
  }

  .note {
    margin-top: 1em;
    margin-bottom: 0;
    background-color: #12181f;
    padding: 1.5em 1em 1.5em 1em;
    border-top: 2px dashed var(--dark-gray);
  }
`;
