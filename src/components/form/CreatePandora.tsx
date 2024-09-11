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

    if (mode.id && mode.type === 'edit') {
      await pandoraService.replaceMyPandora(mode.id, newPandoraForm)
    }

    if (!mode.id && mode.type === 'new') {
      // 반환값이 있지만 pandora review 페이지를 제거해서 반환값 필요없음
      // 생성하면 바로 대시보드로 이동
      await pandoraService.createPandora(newPandoraForm);
    }

    navigate('/dashboard');
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
