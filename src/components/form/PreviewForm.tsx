import { v4 as uuidv4 } from "uuid";
import { TFormSubject } from "../../pages/NewPandoraForm";
import { Dispatch } from "react";
import { IQuery } from "./QueryForm";
import { HiPencilSquare } from "react-icons/hi2";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { IPandoraService } from "../../service/PandoraService";
import { useNavigate } from "react-router-dom";

interface IPreviewFormProps {
  setFormSubject: Dispatch<React.SetStateAction<TFormSubject>>;

  writer: string;
  title: string;
  description: string;
  keywords: string[];
  queries: IQuery[];
  message: string;
  maxOpen: number | '';

  pandoraService: IPandoraService;
}

export default function PreviewForm({ setFormSubject, writer, title, description, keywords, queries, message, maxOpen, pandoraService }: IPreviewFormProps) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // form 유효성 검 사 TODO

    const newPandoraForm = {
      writer: writer,
      title: title,
      description: description,
      keywords: keywords,
      maxOpen: maxOpen as number,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      problems: queries.map(({ id, ...rest }) => rest),
      /* eslint-enable @typescript-eslint/no-unused-vars */
      cat: message,
    };

    const result = await pandoraService.createPandora(newPandoraForm);
    navigate('/pandora/new/review', { state: { newPandora: result } });
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
      
      <HiPencilSquare onClick={() => setFormSubject('unsealLimit')} />
      <p>최대 오픈 횟수: {maxOpen}</p>
      <Divider />

      <button onClick={handleSubmit}>완료</button>
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
