import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "react";
import { IQuery } from "./QueryForm";
import { HiPencilSquare } from "react-icons/hi2";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";
import { TPandoraFormSubject } from "../../types/form";

interface ICreatePandoraProps {
  mode: { id: string | null, type: 'new' | 'edit' };
  setFormSubject: Dispatch<React.SetStateAction<TPandoraFormSubject>>;
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  queries: IQuery[];
  message: string;
  pandoraService: IPandoraService;
}

export default function CreatePandora({ mode, setFormSubject, writer, title, description, keywords, queries, message, pandoraService }: ICreatePandoraProps) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // form 유효성 검 사 TODO

    const newPandoraForm = {
      writer: writer,
      title: title,
      description: description,
      keywords: keywords,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      problems: queries.map(({ id, ...rest }) => rest),
      /* eslint-enable @typescript-eslint/no-unused-vars */
      cat: message,
    };

    try {
      // 판도라 생성 성공
      if (!mode.id && mode.type === 'new') {
        const data = await pandoraService.createPandora(newPandoraForm);
        if (data.success) {
          return navigate('/dashboard');
        }
      }
      // 판도라 수정 성공
      if (mode.id && mode.type === 'edit') {
        const data = await pandoraService.replaceMyPandora(mode.id, newPandoraForm);
        if (data.success) {
          return navigate('/dashboard');
        }
      }
    } catch (error) {
      return navigate('/fallback/error', { state: { error: error } });
    }
  }

  return (
    <>
      <HiPencilSquare onClick={() => setFormSubject('cover')} />
      <p>writer: {writer}</p>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <Divider />
      
      <HiPencilSquare onClick={() => setFormSubject('keywords')} />
      <h3>키워드</h3>
      {keywords.map((keyword) => (
        <Keyword key={uuidv4()}>
          <AiOutlineSearch />
          <span>{keyword}</span>
        </Keyword>
      ))}
      <Divider />

      <HiPencilSquare onClick={() => setFormSubject('query')} />
      <h3>질문</h3>
      {queries.map((query) => (
        <Query key={query.id}>
          <p>질문: {query.question}</p>
          <p>힌트: {query.hint}</p>
          <p>정답: {query.answer}</p>
        </Query>
      ))}
      <Divider />
      
      <HiPencilSquare onClick={() => setFormSubject('message')} />
      <p>메세지: {message}</p>
      <Divider />

      <button onClick={handleSubmit}>{mode.type === 'edit' ? '수정 완료하기' : '판도라 만들기'}</button>
    </>
  );  
}

const Divider = styled.div`
  height: 2px;
  background-color: #6d8faf;
`;

const Keyword = styled.li`
  display: flex;
  align-items: center;

  background-color: black;
  margin: 0.3em;
  width: fit-content;
  padding-left: 0.4em;
  padding-right: 1em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  border-radius: 1em;

  & > svg {
    margin-right: 0.4em;
  }
  
  & > span {
    color: white;

  }
`;

const Query = styled.li`
  background-color: black;
  border-radius: 1em;
  margin: 0.3em;  
`;
