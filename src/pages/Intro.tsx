import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";


export default function Intro() {
  return (
    <StyledContainer>
      <HeroSection>
        <LogoWrapper>
          <img src="/logo.png" alt="logo" />
          <span>RiddleNote</span>
        </LogoWrapper>
        <MainTitle>
          리들노트는 수수께끼로 잠긴 노트를 작성할 수 있는 비공개 게시물 플랫폼입니다.
        </MainTitle>
        <MainTitle>
          당신이 누군가와 공유하는 특별한 기억이나 사건들을 기반으로 질문을 구성하여
        </MainTitle>
        <MainTitle>
          오직 한 사람만이 열람할 수 있는 노트를 작성해보세요.
        </MainTitle>
        <CTAButton href="https://riddlenote.com/">시작하기</CTAButton>
      </HeroSection>

      <FeatureSection>
        <FeatureTextWrapper>
          <FeatureTitle>수수께끼로 열리는 노트</FeatureTitle>
          <FeatureDescription>
            이전 질문을 해결해야 다음 질문을 확인할 수 있으며,
            모든 질문을 해결한 후 노트 내용을 확인할 수 있습니다.
          </FeatureDescription>
          <FeatureTitle>1회성 열람</FeatureTitle>
          <FeatureDescription>
            수수께끼 노트는 한 번 열람되면 비공개로 전환되어,
            열람자와 생성자만 그 내용을 확인할 수 있습니다.
          </FeatureDescription>
        </FeatureTextWrapper>
        <RiddleImage src="/riddle-example.png" alt="riddle" />
      </FeatureSection>

      <FeatureSection>
        <FeatureTextWrapper>
          <FeatureTitle>커스텀 검색어 등록</FeatureTitle>
          <FeatureDescription>
            만든 노트를 검색할 수 있는 검색어를 등록할 수 있습니다.
            검색어를 등록하지 않을 경우 링크 공유를 통해서만 노트에 접근할 수 있습니다.
          </FeatureDescription>
        </FeatureTextWrapper>
        <KeywordsWrapper>
            <li><AiOutlineSearch /><span>홍길동</span></li>
            <li><AiOutlineSearch /><span>물망초</span></li>
            <li><AiOutlineSearch /><span>햇살모아</span></li>
            <li><AiOutlineSearch /><span>한국대학교</span></li>
            <li><AiOutlineSearch /><span>철학과</span></li>
            <li><AiOutlineSearch /><span>독서동아리</span></li>
            <li><AiOutlineSearch /><span>한국전자</span></li>
            <li><AiOutlineSearch /><span>경영지원팀</span></li>
          </KeywordsWrapper>
      </FeatureSection>

      <FeatureSection>
        <FeatureTextWrapper>
          <FeatureTitle>노트 링크 공유</FeatureTitle>
          <FeatureDescription>
            등록한 수수께끼 노트를 웹 링크를 통해 공유할 수 있습니다.
            사용자는 수수께끼를 모두 해결해야 노트 내용을 확인할 수 있습니다.
          </FeatureDescription>
        </FeatureTextWrapper>
        <SNSWrapper>
          <SNSImage src="/sns/x.png" alt="sns" />
          <SNSImage src="/sns/facebook.png" alt="sns" />
          <SNSImage src="/sns/kakao.png" alt="sns" />
          <SNSImage src="/sns/instagram.png" alt="sns" />
       </SNSWrapper>
      </FeatureSection>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  background-color: #30343f;
  color: white;
`;

const HeroSection = styled.section`
  background-color: #181d24;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0.8rem 0 0.8rem;
  font-weight: 500;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  img {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    @media (max-width: 600px) {
      width: 2rem;
      height: 2rem;
    }
  }

  span {
    font-size: 4rem;
    font-family: "Grandstander", cursive;
    font-weight: 600;
    margin-top: 0.3em;
    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }
`;

const MainTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom:0;
`;

const CTAButton = styled.a`
  border: 1px solid #485f88;
  background-color: #324055;
  color: #8ab4f8;
  padding: 0.4em 1.7em;
  border-radius: 0.5rem;
  font-family: inherit;
  font-weight: 700;
  font-size: 25px;
  margin-top: 60px;
  margin-bottom: 50px;
  cursor: pointer;
`;

const FeatureSection = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 100px;

  @media (max-width: 970px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  padding: 2rem;
`;

const FeatureTitle = styled.h2`
  font-weight: 500;
  font-size: 1.5rem;
`;

const FeatureDescription = styled.p`
  margin-top: 0;
  max-width: 500px;
`;

const RiddleImage = styled.img`
  width: 90%;
  max-width: 600px;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  border-radius: 1rem;
  border: 1px solid #3a3a3a;
`;

const KeywordsWrapper = styled.ul`
  display: flex;
  background-color: #252932;
  border: 1px solid #3a3a3a;
  width: 90%;
  max-width: 600px;
  gap: 15px;
  height: auto;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  border-radius: 1rem;
  flex-wrap: wrap;

  li {
    display: flex;
    padding: 0.4em 0.8em 0.4em 0.6em;
    align-items: center;
    margin-bottom: 0.8em;
    
    border: 1px solid #77aaff;
    color: #77aaff;
    border-radius: 1.2rem;
    width: fit-content;
    font-weight: bold;

    svg {
      margin-right: 0.4em;
      font-size: 1.2rem;
    }

    span {
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
`;

const SNSWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #252932;
  border: 1px solid #3a3a3a;
  gap: 30px;
  width: 90%;
  max-width: 600px;
  height: auto;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  @media (max-width: 970px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const SNSImage = styled.img`
  width: 70px;
  @media (max-width: 600px) {
    width: 50px;
  }
`;
