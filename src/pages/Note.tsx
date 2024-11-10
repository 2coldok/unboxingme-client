import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUnboxingService } from "../service/UnboxingService";
import { HttpError } from "../network/HttpClient";
import { INote } from "../types/unboxing";
import { LuEye } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { useLoading } from "../hook/LoadingHook";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { AiFillLock } from "react-icons/ai";
import { BsUpc } from "react-icons/bs";
import { formatTimeAgo } from "../util/formatTimeAgo";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
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
            <State $open={pandora.isCatUncovered}>{pandora.isCatUncovered ? '열람됨' : '미열람'}</State>
          </div>
        </InfoWrapper>
        <Description>{pandora.description}</Description>
      </CoverWrapper>  
      <NoteWrapper>
        {pandora.cat}
      </NoteWrapper>
    </>
  );
}

const CoverWrapper = styled.main`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 0.9rem;
  padding: 1.1em;
  /* @media (max-width: 768px) {
    margin: 0.5em;
  } */
`;

const Title = styled.h2`
  color: var(--brand);
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
  color: var(--font-info);
  font-weight: 600;
`;

const Writer = styled.p`
  display: flex;
  margin: 0.9em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const MainInfo = styled.p`
  display: flex;
  margin: 0.3em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const Label = styled.p`
  display: flex;
  margin: 0.6em 0 0 0;
  svg {
    margin-right: 0.3em;
  }
`;

const State = styled.p<{ $open: boolean }>`
  display: flex;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 3px 7px 3px 7px;
  border-radius: 0.7rem;
  border: ${({ $open }) => $open ? '1px solid #00FF7F' : '1px solid #445261'};
  background: ${({ $open }) => $open ? '#334a46' : '#353d44'};
  color: ${({ $open }) => $open ? '#80e5aa' : '#b7c9e1'};
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
  /* border: 1px solid #ffda48; */
  background-color: #fef49c;
  color: #000000;
  /* text-decoration: underline; */
  /* text-decoration-color: #f27373; */
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  /* box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px; */
  padding: 1.1em;
  border-radius: 0.9rem;
  margin-top: 30px;
  margin-bottom: 30px;
  
  min-height: 15em;
  font-size: 1.2em;
  /* font-family: 'DungGeunMo', sans-serif; */
`;

// color: #a6b6e3;