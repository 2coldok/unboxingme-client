import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsX } from "react-icons/bs";
import { TbMail } from "react-icons/tb";

export default function AppFooter() {
  const navigate = useNavigate();
  const [showEmail, setShowEmail] = useState(false);

  const handleIntroduce = () => {
    window.open("https://riddlenote.com/intro", "_blank", "noopener,noreferrer");
  };

  const handlePrivacyPolicy = () => {
    return navigate('/about/privacy-policy');
  }

  const handleTermsOfService = () => {
    return navigate('/about/terms-of-service');
  };

  const handleCaution = () => {
    return navigate('/about/guide');
  }

  const handleEmailClick = () => {
    setShowEmail(prev => !prev);
  };

  const handleEmailCancelClick = () => {
    setShowEmail(false);
  }

  return (
    <FooterContainer>
      <DocsLinkWrapper>
        <span onClick={handleIntroduce}>사이트 소개</span>
        <span onClick={handleCaution}>리들노트 가이드</span>
        <span onClick={handlePrivacyPolicy}>개인정보처리방침</span>
        <span onClick={handleTermsOfService}>이용약관</span>
        <span onClick={handleEmailClick}>오류/건의</span>
        {showEmail && (
          <PopEmailWrapper>
            <span className="mail-icon"><TbMail /></span>
            <span>info@riddlenote.com</span>
            <span onClick={handleEmailCancelClick} className="cancel"><BsX /></span>
          </PopEmailWrapper>
        )}
      </DocsLinkWrapper>
      <CopyrightWrapper>Copyright © 2024 RiddleNote. All rights reserved.</CopyrightWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 0;
`;

const PopEmailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--background-riddle);
  color: var(--brand);
  font-weight: bold;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  z-index: 9000;

  span {
    display: flex;
  }

  .mail-icon {
    font-size: 1.2em;
    margin-right: 0.5rem;
  }

  .cancel {
    svg {
      margin-left: 0.8rem;
      font-size: 1.9rem;
    }
  }
`;

const DocsLinkWrapper = styled.div`
  display: flex;
  font-size: 0.8rem;
  flex-wrap: wrap;
  gap: 25px;
  padding: 1rem;
  span {
    /* margin: 1em; */
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 600px) {
    align-items: center;
    justify-content: center;
  }
`;

const CopyrightWrapper = styled.div`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;
