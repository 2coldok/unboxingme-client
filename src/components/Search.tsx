import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const maxLengthOfSearchKeyword = parseInt(import.meta.env.VITE_MAX_LENGTH_SEARCH_KEYWORD);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchKeyword = searchKeyword.trim();
    if (trimmedSearchKeyword.length > 0) {
      navigate(`/search?keyword=${encodeURIComponent(trimmedSearchKeyword)}`);
    } else {
      setSearchKeyword('');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= maxLengthOfSearchKeyword) {
      setSearchKeyword(value);
    }
  };

  return (
    <StyledContainer onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search.."
        value={searchKeyword}
        maxLength={maxLengthOfSearchKeyword} // 검색 키워드 최대 20글자
        required
        autoFocus
        onChange={onChange}
      />
      <button type="submit">검색</button>
      <p>{searchKeyword.length} / {maxLengthOfSearchKeyword}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.form`
  & > input {
    width: 300px;
    height: 40px;

  }

  & > button {

  }
`;