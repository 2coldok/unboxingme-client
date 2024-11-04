import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import { INote } from "../types/unboxing";
import { LuEye } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import { useLoading } from "../hook/LoadingHook";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { AiFillLock } from "react-icons/ai";
import { BsUpc } from "react-icons/bs";
import { formatTimeAgo } from "../util/formatTimeAgo";

interface NoteProps {
  unboxingService: IUnboxingService;
}

export default function Note({ unboxingService }: NoteProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [pandora, setPandora] = useState<INote | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (!id) {
      return navigate('/fallback/404', { state: { message: '판도라 id를 찾을 수 없습니다.' } });
    }
  
    const fetchNote = async () => {
      try {
        startLoading();
        const data = await unboxingService.getNote(id);
        setPandora(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          return navigate('/fallback/error', { state: { error: error, payload: error.payload } });
        }
      } finally {
        stopLoading();
      }
    }

    fetchNote();
  }, [id, navigate, unboxingService, startLoading, stopLoading]);

  if (!pandora || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <CoverWrapper>
        <Title>{pandora.title}</Title>
        <InfoWrapper>
          <div>
            <Writer> <IoPerson /> {pandora.writer}</Writer>                  
            <MainInfo> 
              <AiFillLock /> {pandora.totalProblems} ·&nbsp;
              <LuEye /> {pandora.coverViewCount} ·&nbsp;
              {formatTimeAgo(pandora.createdAt)}
            </MainInfo>
            <Label><BsUpc /> {pandora.label}</Label>
          </div>
          <div>
            <State $open={pandora.isCatUncovered}><GoDotFill/> {pandora.isCatUncovered ? '열람됨' : '미열람'}</State>
          </div>
        </InfoWrapper>
        <Description>{pandora.description}</Description>
      </CoverWrapper>  
      <NoteWrapper>
        Riddlenote &gt; solved-at <br></br>
        Riddlenote &gt; {pandora.solvedAt} <br></br>
        Riddlenote &gt; solver-alias <br></br>
        Riddlenote &gt; {pandora.solverAlias} <br></br>
        Riddlenote &gt; note <br></br>
        Riddlenote &gt; <br></br> <br></br>
        {pandora.cat}
      </NoteWrapper>
    </>
  );
}

const CoverWrapper = styled.main`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 0.4rem 0.4rem 0 0;
  padding: 1.1em;
  /* @media (max-width: 768px) {
    border-style: none;
  } */
`;

const Title = styled.h2`
  color: var(--list-title);
  font-weight: 800;
  font-size: 1.8em;
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  color: var(--list-info);
`;

const Writer = styled.p`
  display: flex;
  color: var(--font);
  font-weight: 500;
  font-size: 1em;
  margin: 0.9em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const MainInfo = styled.p`
  display: flex;
  font-size: 0.9em;
  font-weight: 500;
  margin: 0.3em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const Label = styled.p`
  display: flex;
  margin: 0.6em 0 0 0;
  font-weight: 500;
  font-size: 0.9em;
  svg {
    margin-right: 0.3em;
  }
`;

const State = styled.p<{ $open: boolean }>`
  display: flex;
  font-weight: 600;
  svg {
    margin-right: 0.3em;
    color: ${({ $open }) => $open ? '#4caf50' : '#ffd54f '}
  }
`;

const Description = styled.pre`
  font-size: 1.1em;
  min-height: 10em;
  border-top: 1px solid var(--border);
  padding: 2em 0 0 0;
  border-radius: 0;
  white-space: pre-wrap;
`;

const NoteWrapper = styled.pre`
  display: flex;
  border: 2px solid #5a5a5a;
  background-color: #131313;
  font-family: 'DungGeunMo', sans-serif;
  padding: 1.1em;
  border-radius: 0.1rem;
  margin: 0;
  margin-bottom: 30px;
  /* color: #8ca8c3; */
  min-height: 15em;
  font-size: 1.2em;
`;


// .note {
//   margin-top: 1em;
//   margin-bottom: 0;
//   background-color: var(--dark-black100);
//   padding: 1.5em 1em 1.5em 1em;
//   border-top: 2px dashed var(--dark-gray);
//   color: var(--light-white500);
// }
