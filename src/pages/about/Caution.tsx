import AppFooter from "../../components/AppFooter";
import { 
  DContainer, 
  DSection,
  DContent, 
  DExample, 
  DHead, 
  DList, 
  DSubTitle, 
  DTitle 
} from "../../styles/DocStyle";

export default function Caution() {
  return (
    <>
      <DContainer>
        <DHead>게시물 작성 주의사항</DHead>

        <DSection>
          <DTitle>1. 게시물 내에 개인정보 포함 주의</DTitle>
          <DContent>
            게시물의 모든 내용에는 특정 개인을 직접적으로 식별할 수 있는 실명, 연락처, 이메일, 주소와 같은 민감한 개인정보,
            특정성을 과도하게 좁히는 정보를 포함하지 않도록 주의해야 합니다.
            만약 게시물의 민감한 내용이 의도치 않게 제3자에게 노출될 경우, 열람 대상자나 작성자의 사생활이 침해될 수 있습니다.
            이러한 가능성을 최소화 하기 위해 리들노트는 최초로 게시물이 열람될 시 해당 게시물을 비공개로 전환하여 
            이후 열람자와 생성자를 제외하고 게시물에 접근할 수 없도록 합니다. 
            가급적 게시물 내용을 작성시 두 사람만 이해할 수 있는 단서나 기억, 상징적인 표현을 사용하는 것을 권장합니다.
          </DContent>
        </DSection>

        <DSection>
          <DTitle>2. 키워드 작성 주의사항</DTitle>
          <ul>
            <DList>
              <DSubTitle>(1) 키워드 설정 시 권장 사항</DSubTitle>
              <DContent>
                키워드는 가급적 실명 대신 열람 대상자의 별칭이나 특정 범위가 넓은 기관 및 소속명(학교, 동아리, 회사 이름 등)을 활용할 것을 권장합니다. 
              </DContent>
            </DList>
  
            <DList>
              <DSubTitle>(2) 실명 사용 시 주의사항</DSubTitle>
              <DContent>
                실명을 키워드로 사용할 경우, 게시물의 표지, 질문, 노트 내용에 포함된 다른 정보와 결합되어 
                열람 대상자가 타인에게 특정될 가능성이 있습니다. 
                이로 인해 개인정보 노출 위험이 생길 수 있으므로, 실명 사용시 민감한 정보와의 연관성을 최소화 하세요.
              </DContent>
            </DList>

            <DList>
              <DSubTitle>(3) 키워드 설정을 생략하는 경우</DSubTitle>
              <DContent>
                키워드를 설정하지 않을 경우 게시물 링크 공유를 통해서만 접근할 수 있으며 이는 게시물 접근을 보호하기 위한 가장 안전한 방법입니다.
              </DContent>
            </DList>
          </ul>
        </DSection>

        <DSection>
          <DTitle>3. 질문 작성 주의사항</DTitle>
          <ul>
            <DList>
              <DSubTitle>(1) 기억이나 상징을 활용하기</DSubTitle>
              <DContent>
                질문은 질문 작성자와 열람 대상자만 아는 기억, 상징, 은어 등을 바탕으로 작성하는 것을 권장합니다. 
                이는 제 3자가 질문에 대한 답을 유추하기 어렵게 만들어, 열람 대상자만 정답을 맞출 가능성을 높여줍니다.
              </DContent>
              <DExample>“그날 대화 중에 우리가 계속 헷갈렸던 단어는?”(O)</DExample>
            </DList>
  
            <DList>
              <DSubTitle>(2) 첫 번째 질문을 신중하게 작성하기</DSubTitle>
              <DContent>
                게시물에 등록된 질문은 기본적으로 이전 질문을 해결해야 다음 질문을 확인할 수 있습니다. 
                하지만 첫 번째 질문은 게시물에 접근한 사용자라면 누구나 확인하고 풀이를 시도할 수 있기 때문에, 
                구체적인 힌트를 제공하는 질문은 피하는 것이 좋습니다. 
                다소 모호 하면서도 질문 작성자와 열람 대상자만 이해할 수 있는 단서를 활용하여 첫 번째 질문을 설정하세요.
              </DContent>
              <DExample>“작년 여름 내가 여행 선물로 받은 것은?”(O)</DExample>
            </DList>

            <DList>
              <DSubTitle>(3) 논리적 질문은 피하기</DSubTitle>
              <DContent>
                누구나 쉽게 유추할 수 있는 정보나, 논리적으로 추론 가능한 질문은 피해주세요.
              </DContent>
              <DExample>“내 핸드폰 번호 뒷자리 4개의 합은?” (X)</DExample>
            </DList>

            <DList>
              <DSubTitle>(4) 질문, 힌트 및 정답 속 민감한 정보는 지양하기</DSubTitle>
              <DContent>
                질문, 힌트 또는 정답에 민감한 개인정보(이름, 연락처, 주소)를 포함하지 않도록 주의하세요. 
                이러한 정보는 제3자에 의해 개인 식별 위험을 높일 수 있습니다.
              </DContent>
              <DExample>“우리집 주소 우편번호는?” (X)</DExample>
              <DExample>“네가 키우는 반려동물 이름은?” (O)</DExample>
            </DList>

            <DList>
              <DSubTitle>(5) 정답의 가짓수가 적은 질문은 지양하기</DSubTitle>
              <DContent>
                정답이 명확히 한정된 질문은 제3자가 답을 맞출 가능성을 높일 수 있습니다.
                이를 피하기 위해, 정답의 가지수를 늘리거나 두 사람만 아는 디테일을 추가해주세요.
              </DContent>
              <DExample>“처음 회의한 날짜는 언제일까?” (X)</DExample>
              <DExample>“첫 회의에서 우리가 다뤘던 핵심 아이디어는?”(O)</DExample>
            </DList>
          </ul>
        </DSection>
       
        <DSection>
          <DTitle>4. 게시물 수정 제한사항</DTitle>
          <DContent>
            열람자가 열람한 게시물의 내용이 사후에 변경될 경우, 열람자가 경험한 정보의 신뢰성과 고유성이 훼손될 수 있어 
            이를 방지하기 위해  모든 질문이 해결되어 비공개로 전환된 게시물은 수정할 수 없습니다. 
            질문이 완료되지 않은 게시물을 수정할 경우, 패널티 기록을 포함하여 게시물에 접근했던 모든 사용자의 기록이 초기화 됩니다.
          </DContent>
        </DSection>

        <DSection>
          <DTitle>5. 게시물 진행 상황 모니터링</DTitle>
          <DContent>
            게시물 생성자는 자신이 작성한 게시물의 질문 풀이 진행 상황을 게시물 상세 페이지에서 확인할 수 있습니다. 
            상세 페이지에서 제공되는 정보는 다음과 같습니다.
          </DContent>
          <ul>
            <DList>
              <DSubTitle>(1) 질문 풀이 진행 상황</DSubTitle>
              <DContent>
                자신의 게시물에서 가장 높은 질문 풀이 진행률(최대 몆 번째 질문까지 해결되었는지)을 확인할 수 있습니다.
              </DContent>
            </DList>

            <DList>
              <DSubTitle>(2) 진행 상황 업데이트 시간</DSubTitle>
              <DContent>
                가장 높은 질문 풀이 진행률의 최근 업데이트 시간을 확인할 수 있습니다.
              </DContent>
            </DList>

            <DList>
              <DSubTitle>(3) 열람자 별명</DSubTitle>
              <DContent>
                게시물의 모든 질문이 해결되어 게시물이 열람 될 경우, 해당 게시물의 열람자 별명을 확인할 수 있습니다.
              </DContent>
            </DList>
          </ul>
        </DSection>

        <DSection>
          <DTitle>6. 열람 완료 게시물 정보 공개 안내</DTitle>
          <DContent>
            홈 화면(https://riddlenote.com)에서 열람이 완료된 게시물의 일부 정보가 일시적으로 노출될 수 있습니다. 
            최근 열람된 5개의 게시물을 리스트 형태로 보여주게 되며 5분 간격으로 업데이트 됩니다. 
            노출되는 정보는 게시물 및 작성자의 상세 내용을 알 수 없도록 최소한으로 제한합니다.
            공개되는 정보는 다음과 같습니다.
          </DContent>

          <ul>
            <DList>
              <DSubTitle>(1) 게시물 제목</DSubTitle>
              <DContent>
                게시물 제목은 처음 두 글자만 노출되며 나머지는 글자 수에 관계없이 3개의 별표(*)로 음영처리 됩니다
              </DContent>
              <DExample>수수께끼 게시물 제목 --{'>'} 수수***</DExample>
              <DExample>사과 --{'>'} 사과***</DExample>
            </DList>

            <DList>
              <DSubTitle>(2) 작성자명</DSubTitle>
              <DContent>
                작성자명은 첫 글자만 노출되며, 나머지는 글자 수에 관계 없이 2개의 별표(**)로 음영처리 됩니다.
              </DContent>
              <DExample>가느다란물방울 --{'>'} 가**</DExample>
              <DExample>홍길동 --{'>'} 홍**</DExample>
            </DList>

            <DList>
              <DSubTitle>(3) 조회수, 생성일, 라벨, 열람 여부</DSubTitle>
              <DContent>
                해당 정보는 그대로 노출됩니다.
              </DContent>
            </DList>
          </ul>
        </DSection>
          
      </DContainer>
      <AppFooter />
    </>
  );
}

