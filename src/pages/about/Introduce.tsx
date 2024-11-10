import { IoHelpCircleOutline } from 'react-icons/io5';
// export default function Introduce() {
//   return (
//     <>
      
//       <section>
//         <h1>* 서로의 연결고리를 통해 오직 한 사람만 열람할 수 있는 노트를 작성해 보세요</h1>
//         <p>- 리들노트의 모든 게시물은 게시물을 검색할 수 있는 "키워드" 와 게시물 노트를 열람하기 위한 "질문"으로 이루어져 있습니다.</p>
//         <p>- 당신이 누군가와 공유하는 특별한 기억이나 사건들을 기반으로 "키워드"와 "질문"들을 구성하여 오직 한 사람만이 열람할 수 있는 노트를 작성해보세요.</p>
//       </section>
      
//       <section>
//         <h1>* 게시물 키워드</h1>
//         <p>- 리들노트의 게시물은 게시물 작성자가 설정한 키워드를 검색하여 확인할 수 있습니다.</p>
//         <p>- 상대방이 당신의 게시물을 찾을 수 있도록 그 사람의 이름, 별명 또는 그 사람과 관련된 프로젝트 명,그 사람이 속해있는 기관명 등을 키워드로 설정해보세요</p>
//         <p>- 설정한 키워드 목록은 게시물에 노출되지 않습니다.</p>
//         <p></p>
//       </section>

//       <section>
//         <h1>* 게시물 표지</h1>
//         <p>- 게시물 표지는 제목, 작성자명, 간단한 소개로 이루워져 있습니다.</p>
//         <p>- 상대방이 당신의 질문을 해결하기 전 자신을 위한 게시물임을 알 수 있도록 게시물을 간단하게 소개해보세요</p>
//       </section>

//       <section>
//         <h1>* 게시물 질문</h1>
//         <p>- 키워드를 통해 게시물을 찾은 후에도 게시물의 노트를 확인하기 위해선 열람자는 게시물의 질문들에 답해야 합니다.</p>
//         <p>- 이 질문들은 게시물 작성자가 설정한 질문들로 이루어지며, 이전 질문을 해결해야 다음 질문을 확인할 수 있습니다.</p>
//         <p>- 서로가 공유했던 기억이나 사건들을 토대로 특정인만 답할 수 있는 질문들을 구성해보세요</p>
//       </section>
      
//       <section>
//         <h1>* 노트</h1>
//         <p>- 상대방이 게시물의 모든 질문을 해결했다면 게시물이 열람되어 노트 내용을 확인할 수 있습니다.</p>
//         <p>- 최초로 열람될 시 게시물은 비공개로 전환되어 열람자를 제외하고 게시물에 접근할 수 없으며, 게시물 검색 결과에서 제외됩니다.</p>
//         <p>- 게시물을 열람하기전 상대방은 게시물 작성자가 확인할 수 있는 "열람자 별명"을 설정할 수 있습니다.</p>
//         <p>- 게시물 작성자는 설정한 "열람자 별명" 이외의 열람자 정보를 확인할 수 없습니다.</p>
//       </section>
//     </>
//   );
// }

import { AiFillLock, AiOutlineSearch } from 'react-icons/ai';
import { BsUpc } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { IoPerson } from 'react-icons/io5';
import { LuEye } from 'react-icons/lu';
import styled from 'styled-components';
import AppFooter from '../../components/AppFooter';

// React component
export default function Introduce() {
  return (
    <>
      <HeadWrapper>
        <HeadTitle>
          <IoHelpCircleOutline />
          리들노트 가이드
        </HeadTitle>
        <p>리들노트는 특정 사용자가 맞춤형 질문을 해결한 후 게시물을 열람할 수 있는 비공개 게시물 플랫폼입니다.</p>
        <p>리들노트의 모든 게시물은 게시물을 검색할 수 있는 "키워드"와 노트를 열람하기 위한 "질문"으로 이루어져 있습니다. </p>
        <p>당신이 누군가와 공유하는 특별한 기억이나 사건들을 기반으로 "키워드"와 "질문"들을 구성하여 오직 한 사람만이 열람할 수 있는 특별한 게시물을 작성해보세요</p>
      </HeadWrapper>

      <Section>
        <SectionTitle>1. 게시물 키워드 설정</SectionTitle>
          <SectionIntroduce>상대방이 당신의 게시물을 찾을 수 있도록, 그 사람의 이름, 별명, 관련된 프로젝트명, 혹은 소속 기관명 등을 키워드로 설정해보세요.</SectionIntroduce>
          <AddedKeywords>
            <li><AiOutlineSearch /><span>홍길동</span></li>
            <li><AiOutlineSearch /><span>웃음꽃</span></li>
            <li><AiOutlineSearch /><span>한국초등학교</span></li>
            <li><AiOutlineSearch /><span>한국대학교</span></li>
            <li><AiOutlineSearch /><span>한국전자</span></li>
          </AddedKeywords>
          <p>* 설정한 키워드 목록은 게시물에 노출되지 않습니다.</p>
          <p>* 리들노트의 게시물은 설정된 키워드를 통해 검색할 수 있습니다.</p>
          <p>* 키워드를 설정하지 않을 경우 게시물 링크 공유를 통해 게시물에 접근할 수 있습니다.</p>
      </Section>

      <Section>
        <SectionTitle>2. 게시물 표지</SectionTitle>
        <SectionIntroduce>상대방이 당신의 질문을 해결하기 전 게시물을 특정할 수 있도록 간단히 소개해주세요.</SectionIntroduce>
        <CoverWrapper>
          <Title>제목</Title>
          <InfoWrapper>
            <div>
              <Writer> <IoPerson /> 김철수</Writer>                  
              <MainInfo> 
                <AiFillLock /> 5 ·&nbsp;
                <LuEye /> 3 ·&nbsp;
                2023. 12. 25. 08:00
              </MainInfo>
              <Label><BsUpc /> 가나다라마바</Label>
            </div>
            <div>
              <State $open={false}><GoDotFill/> 미열람</State>
            </div>
          </InfoWrapper>
          <Description>소개 예시</Description>
        </CoverWrapper>
        <p>* 게시물 표지의 제목, 작성자명, 소개 내용은 검색 엔진에 포함되지 않습니다.</p>
      </Section>

      <Section>
        <SectionTitle>3. 게시물 질문</SectionTitle>
        <SectionIntroduce>서로가 공유했던 기억이나 사건들을 토대로 특정인만 대답할 수 있는 질문들을 구성해보세요.</SectionIntroduce>
        <RiddleImage src="/riddle.png" alt="riddle" />
        <p>* 키워드를 통해 게시물을 찾은 후에도 노트 내용을 확인하기 위해서는 게시물에 등록된 모든 질문을 해결해야 합니다.</p> 
        <p>* 이전 질문을 해결해야 다음 질문을 확인할 수 있습니다.</p>
        <p>* 정답은 대소문자 및 띄어쓰기를 구분합니다.</p>
        <p>* 각 질문마다 힌트를 추가할 수 있으며, 정답이 지켜야 할 형식이 있거나 띄어쓰기가 있을 경우 힌트 기능 이용해주세요.</p>
      </Section>

      <Section>
        <SectionTitle>4. 노트</SectionTitle>
        <SectionIntroduce>모든 질문을 해결한 사용자에게 전할 메세지를 노트에 작성해주세요.</SectionIntroduce>
        <p>* 상대방이 게시물의 모든 질문을 해결했다면 게시물이 열람되어 노트 내용을 확인할 수 있습니다.</p>
        <p>* 게시물은 모든 질문을 최초로 해결한 한명의 사용자만 열람할 수 있습니다.</p>
        <p>* 게시물이 열람되면 해당 게시물은 비공개로 전환되어 게시물 검색, 링크 공유 접근이 제한됩니다.</p>  
      </Section>

      <AppFooter />
    </>
  );
}

const HeadWrapper = styled.div`
  padding: 1rem;
  /* border: 1px solid var(--border); */
  margin-bottom: 2rem;
  border-radius: 0.7rem;
  /* background-color: #3d3d3d; */
  
`;

const HeadTitle = styled.h1`
  display: flex;
  /* font-size: 1rem; */
  /* text-align: center; */
  margin-bottom: 1rem;
  color: white;
  svg {
    margin-right: 10px;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  background-color: #2f3033;
  @media (max-width: 768px) {
    margin: 0 0.3rem 3rem 0.3rem;
    padding: 0.1rem 1rem 1rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: var(--blue100);
  margin-bottom: 0.5rem;
  color: white;
`;

const SectionIntroduce = styled.h3`
  font-size: 1rem;
  color: #ececec;
`;

// keyword
const AddedKeywords = styled.ul`
  display: flex;
  flex-direction: column;
  min-height: 5em;
  padding: 1em;
  border-radius: 0.4rem;
  border: 1px dashed var(--border);

  li {
    display: flex;
    padding: 0.4em 0.8em 0.4em 0.6em;
    align-items: center;
    margin-bottom: 0.8em;
    
    border: 1px solid var(--brand);
    color: var(--brand);
    border-radius: 0.9em;
    width: fit-content;
    font-weight: bold;

    svg {
      margin-right: 0.4em;
    }

    
  }
`;

// cover 
const CoverWrapper = styled.main`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  padding: 1.1em;
  background-color: #252932;
`;

const Title = styled.h2`
  color: var(--list-title);
  font-weight: 800;
  font-size: 1.8em;
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  /* color: var(--list-info); */
  /* color: #a5a5a5; */
`;

const Writer = styled.p`
  display: flex;
  /* color: var(--font); */
  font-weight: 600;
  font-size: 0.9em;
  margin: 0.9em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const MainInfo = styled.p`
  display: flex;
  font-size: 0.9em;
  font-weight: 600;
  margin: 0.3em 0 0.2em 0;
  svg {
    margin-right: 0.3em;
  }
`;

const Label = styled.p`
  display: flex;
  margin: 0.6em 0 0 0;
  font-weight: 600;
  font-size: 0.9em;
  svg {
    margin-right: 0.3em;
  }
`;

const State = styled.p<{ $open: boolean }>`
  display: flex;
  font-weight: 600;
  svg {
    margin-right: 0.3em;
    color: ${({ $open }) => $open ? '#4caf50' : '#ffd54f '}
  }
`;

const Description = styled.pre`
  font-size: 1.1em;
  min-height: 10em;
  border-top: 1px solid var(--border);
  padding: 2em 0 0 0;
  border-radius: 0;
  white-space: pre-wrap;
`;

// riddle
const RiddleImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 800px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`