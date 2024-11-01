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
    <SearchFormWrapper onSubmit={onSubmit} role="search" action="">
      <SearchIcon />
      <SearchInput
        type="search"
        placeholder="게시물 키워드"
        name="search"
        value={searchKeyword}
        maxLength={SEARCH_KEYWORD.maxLength}
        required
        autoFocus
        onChange={onChange}
        autoComplete="off"
        enterKeyHint="search"
      />
      <SubmitButton className="submit" type="submit"></SubmitButton>
      <CancelButton className="cancel" type='button'onClick={onCancel}><BsX /></CancelButton>
    </SearchFormWrapper>
  );
}

/**
 * 흰색배경에서 shadow
 * 
 * box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
 */

const SearchFormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--search-background);
  border: 1px solid var(--brand);
  
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
`;

const SearchIcon = styled(IoIosSearch)`
  background-color: var(--search-background);
  color: var(--list-info);
  margin-left: 0.5em;
  font-size: 1.7em;
`;

const SearchInput = styled.input`
  background-color: var(--search-background);
  color: var(--font);
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
`;

const CancelButton = styled.button`
  padding-left: 0;
  border: none;
  background-color: var(--search-background);

  & > svg {
    color: var(--list-info);
    font-size: 1.8em;
  }
`;

const SubmitButton = styled.button`
  display: none;
`;
