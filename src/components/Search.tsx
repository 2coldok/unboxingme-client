import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

interface ISearchProps {
  keyword: string;
  onChangeCurrentPage?: () => void;
}

export default function Search({ keyword, onChangeCurrentPage }: ISearchProps) {
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const maxLengthOfSearchKeyword = parseInt(import.meta.env.VITE_MAX_LENGTH_SEARCH_KEYWORD);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchKeyword = searchKeyword.trim();

    if (trimmedSearchKeyword.length > 0) {
      sessionStorage.removeItem('search-currentPage');
      onChangeCurrentPage && onChangeCurrentPage();
      return navigate(`/search?keyword=${encodeURIComponent(trimmedSearchKeyword)}`);
    } else {
      return setSearchKeyword('');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= maxLengthOfSearchKeyword) {
      setSearchKeyword(value);
    }
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <SearchWrapper>
        <input
          type="search"
          placeholder="Keyword..."
          name="searchKeyword"
          value={searchKeyword}
          maxLength={maxLengthOfSearchKeyword} // 검색 키워드 최대 20글자
          required
          autoFocus
          onChange={onChange}
          autoComplete="off"
        />
        <button type="submit"><IoIosSearch /></button>
     </SearchWrapper>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  width: 100%;
`

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0;
  background-color: #181b1d;
  
  border-radius: 1.5rem;

  & > input {
    background-color: #181b1d;
    color: #A6B5E3;
    /* color: #40A822; */
    outline: none;
    border: none;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
    font-size: 1.5em;
    width: 100%;
    height: 100%;
    padding: 0 0 0 0.5em;

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
    &::-ms-clear {
      display: none;
      width: 0;
      height: 0;
    }
    &::-webkit-search-decoration,
    &::-webkit-search-results-decoration,
    &::-webkit-search-results-button {
      display: none;
    }
  }

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    padding-right: 0.7em;
    padding-left: 0.4em;
    padding-top: 0.5em;
    border: none;
    /* background-color: red; */

    & > svg {
      /* display: flex; */
      color: #A6B5E3;
      font-size: 1.8em;
    }
  }

  &:focus-within {
    border: 2px solid #A6B5E3;
  }

  &:hover {
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.75);
  }

  
  
`;