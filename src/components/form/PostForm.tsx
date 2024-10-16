import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { TFormSubject } from '../../types/form';

export interface IPostFormProps {
  setFormSubject: React.Dispatch<React.SetStateAction<TFormSubject>>;
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
}

export default function PostForm({ setFormSubject, post, setPost }: IPostFormProps) {
  
  // useEffect(() => {
  //   if (message.trim().length < 1) {
  //     setValidForm(false);
  //     setFormErrorMessage('판도라의 메세지를 입력해주세요');
  //   } else {
  //     setValidForm(true);
  //     setFormErrorMessage(null);
  //   }
  // }, [message]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  const handleNextButton = () => {
    if (post.length === 0) {
      return alert('게시글 내용을 입력해주세요.');
    }
    setPost((prev) => prev.trim());
    setFormSubject('preview');
  }

  return (
    <StyledContainer>
      <p>* 모든 질문을 최초로 해결한 한명의 사용자만 게시글 내용을 확인할 수 있습니다.</p>
      <textarea 
          name='post'
          maxLength={1000} 
          placeholder="게시글 내용 입력" 
          value={post}
          onChange={onChange}
      />
      <small>{`${post.length}/1000`}</small>
      <ButtonWrapper>
        <button className='previous' onClick={() => setFormSubject('riddles')}>이전</button>
        <button className='next' onClick={handleNextButton}>다음</button>
      </ButtonWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  & > textarea {
    width: 100%;
    height: 20rem;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  & > button {
    background-color: var(--middle-blue);
    color: white;
    font-weight: bold;
    padding: 0.6em 2em 0.6em 2em;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .previous {
    margin-right: 1em;
  }
`;