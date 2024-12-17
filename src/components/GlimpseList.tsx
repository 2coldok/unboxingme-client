import styled from "styled-components";
// import { BsUpc } from "react-icons/bs"; 
import RiddleProgress from "../util/RiddleProgress";
import { BiSolidUser } from "react-icons/bi"; // person

interface IGlimpseListProps {
  glimpses: {
    username: string;
    totalProblems: number;
    unsealedQuestionIndex: number;
    unboxing: boolean;
    updatedAt: string; // 서버에서 이미 가공된 날짜. 시간 정보는 제외
  }[]
}

export default function GlimpseList({ glimpses }: IGlimpseListProps) {
  return (
    <PandorasContainer>
      {glimpses.map((glimpse, index) => (
        <PandoraWrapper key={index}>
          <Avatar><BiSolidUser /></Avatar>
          <Record>
            <Solver>{glimpse.username}</Solver>


            <RiddleProgressWrapper>
              <LeftWrapper>
                <ProgressSizeControl>
                  <RiddleProgress 
                    totalSteps={glimpse.totalProblems} 
                    currentStep={glimpse.unboxing ? glimpse.unsealedQuestionIndex + 1 : glimpse.unsealedQuestionIndex} 
                  />
                </ProgressSizeControl>
              </LeftWrapper>
  
              <RightWrapper>
                <State $state={glimpse.unboxing}>
                  {glimpse.unboxing ? '메시지 열람' : '진행중...'}
                </State>
              </RightWrapper>
            </RiddleProgressWrapper>

            


            <UpdatedAtWrapper>
              <UpdatedAt>
              {glimpse.updatedAt}              
              </UpdatedAt>
            </UpdatedAtWrapper>   
          </Record>
        </PandoraWrapper>
      ))}
    </PandorasContainer>
  );
}

const PandorasContainer = styled.ul`
  margin: 0;
`;

const PandoraWrapper = styled.li`
  display: flex;
  border-bottom: 1px solid var(--border);
  padding: 1em;
  @media (max-width: 768px) {
    padding: 0.5em 0.1em 1em 0.1em;
    margin-bottom: 0.7em;
  }
`;

// 왼쪽 박스
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  border-radius: 50%;
  padding: 0.6em 0.5em 0.4em 0.5em;
  border: 1px solid var(--border);
  background-color: #242a39;
  background-color: var(--brand);
  svg {
    font-size: 1.8em;
    @media (max-width: 768px) {
      font-size: 1.3em;
    }
  }
`;

// 오른쪽 박스
const Record = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* flex-grow: 1; */
  padding-left: 0.7em;
  @media (max-width: 768px) {
    padding-left: 0.5em;
  }
`;

// 요소1
const Solver = styled.span`
  font-size: 1.1em;
  font-weight: 600;
`;

// 요소2
const RiddleProgressWrapper = styled.div`
  display: flex;
  position: relative; /* RightWrapper의 위치 기준 */
  justify-content: space-between;
  width: 100%;
  font-size: 0.9em;
  margin-top: 0.6em;
  background-color: #373b49;
  background-color: #252834;
  background-color: var(--background-riddle);
  padding: 1.2em 0.5em 3em 1.2em;
  border-radius: 0.5rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
    font-size: 0.6em;
  }
`;

const ProgressSizeControl = styled.div`
  @media (max-width: 900px) {
    font-size: 1.5em;
  }
  @media (max-width: 700px) {
    font-size: 1.2em;
  }
  @media (max-width: 600px) {
    font-size: 1.1em;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0.5em;
  right: 0.4em;
  z-index: 1;
`;

const State = styled.span<{ $state: boolean }>`
  font-weight: 700;
  font-size: 1em;
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
  padding: 5px 12px 5px 12px;
  /* border-radius: 0.5rem; */
  border-radius: 0.4rem;

  /* border: ${({ $state }) => $state ? '1px solid var(--border)' : '1px solid #3d444d'}; */
  /* background: ${({ $state }) => $state ? 'var(--background-riddle)' : '#353d44'}; */
  /* background-color: ${({ $state }) => $state ? '#112733' : '#212830'}; */
  color:  ${({ $state }) => $state ? '#34d058' : '#9198a1'};
`;

// 요소 3
const UpdatedAtWrapper = styled.div`
  display: flex;
  padding-top: 0.5em;
  margin-right: 0.1em;
  justify-content: flex-end;
`;

const UpdatedAt = styled.span`
  color: var(--font-info);
  font-weight: 600;
  font-size: 0.9em;
  @media (max-width: 768px) {
    font-size: 0.7em;
  }
`;
