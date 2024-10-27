import { IoIosSearch } from "react-icons/io";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";
import { SEARCH_KEYWORD } from "../constant/constraints";

interface ISearchProps {
  keyword: string;
  // 검색어 제출시 session에 저장된 현재 페이지를 1로 초기화 한다.
  resetPage?: () => void;
}

export default function Search({ keyword, resetPage }: ISearchProps) {
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= SEARCH_KEYWORD.maxLength) {
      setSearchKeyword(value);
    }
  };

  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSearchKeyword('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchKeyword = searchKeyword.trim();
    if (trimmedSearchKeyword.length > 0) {
      sessionStorage.removeItem('search-currentPage');
      resetPage && resetPage();
      return navigate(`/search?keyword=${encodeURIComponent(trimmedSearchKeyword)}`);
    } else {
      return setSearchKeyword('');
    }
  };

  return (
    <SearchFormContainer onSubmit={onSubmit} role="search" action="">
      <IoIosSearch />
      <input
        type="search"
        placeholder="keyword"
        name="search"
        value={searchKeyword}
        maxLength={SEARCH_KEYWORD.maxLength}
        required
        autoFocus
        onChange={onChange}
        autoComplete="off"
        enterKeyHint="search"
      />
      <button className="submit" type="submit"></button>
      <button className="cancel" type='button'onClick={onCancel}><BsX /></button>
    </SearchFormContainer>
  );
}

const SearchFormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--gray400);
  border: 1.5px solid var(--blue100);

  width: 700px;
  @media (max-width: 768px) {
    width: 85%;
  }

  height: 50px;
  @media (max-width: 760px) {
    height: 40px;
  }

  padding: 0;
  border-radius: 1.6rem;
  overflow: hidden;
  
  & > svg {
    color: var(--gray100);
    margin-left: 0.5em;
    font-size: 1.7em;
  }
  
  & > input {
    background-color: var(--gray400);
    color: var(--white200);
    outline: none;
    border: none;
    font-size: 1.2em;
    @media (max-width: 768px) {
      font-size: 1.1em;
    }
    width: 100%;
    height: 100%;
    padding: 0 0.6em 0 0.6em;
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
    &::-ms-clear {
      display: none;
      width: 0;
      height: 0;
    }
    /* &::-webkit-search-decoration,
    &::-webkit-search-results-decoration, */
    /* &::-webkit-search-results-button {
      display: none;
    } */
  }

  .submit {
    display: none;
  }

  .cancel {
    padding-left: 0;
    border: none;
    background-color: var(--gray400);

    & > svg {
      color: var(--gray100);
      font-size: 1.8em;
    }
  }
`;
