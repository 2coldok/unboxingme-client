import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsX } from "react-icons/bs";
import { TbMail } from "react-icons/tb";

export default function HomeFooter() {
  const navigate = useNavigate();
  const [showEmail, setShowEmail] = useState(false);

  const handleIntroduceClick = () => {
    return navigate('/introduce');
  };

  const handleEmailClick = () => {
    setShowEmail(prev => !prev);
  };

  const handleEmailCancelClick = () => {
    setShowEmail(false);
  }

  return (
    <>
      <DocsLinkWrapper>
        <span onClick={handleIntroduceClick}>사이트 소개</span>
        <span>개인정보처리방침</span>
        <span>이용약관</span>
        <span onClick={handleEmailClick}>문의/제보</span>
        {showEmail && (
          <PopEmailWrapper>
            <span className="mail-icon"><TbMail /></span>
            <span>riddlenote321@gmail.com</span>
            <span onClick={handleEmailCancelClick} className="cancel"><BsX /></span>
          </PopEmailWrapper>
        )}
      </DocsLinkWrapper>
      <CopyrightWrapper>Copyright © 2024 RiddleNote. All rights reserved.</CopyrightWrapper>
    </>
  );
}

const PopEmailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--gray400);
  color: var(--blue100);
  font-weight: bold;
  /* padding: 0.7rem 1rem; */
  border-radius: 0.5rem;
  z-index: 9000;

  span {
    display: flex;
  }

  .mail-icon {
    font-size: 1.2em;
    margin-right: 0;
  }

  .cancel {
    svg {
      font-size: 2em;
    }
  }
`;

const DocsLinkWrapper = styled.div`
  display: flex;
  color: var(--gray100);
  font-size: 0.8rem;
  span {
    margin: 1em;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

const CopyrightWrapper = styled.div`
  font-size: 0.8rem;
  color: var(--gray100);
`;
