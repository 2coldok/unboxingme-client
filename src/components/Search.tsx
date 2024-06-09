import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // todo fetch 
    navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <StyledContainer onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search.."
        value={searchKeyword}
        required
        autoFocus
        onChange={onChange}
      />
      <button type="submit">검색</button>
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