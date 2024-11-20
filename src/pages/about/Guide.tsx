import AppFooter from "../../components/AppFooter";
import { 
  DContainer, 
  DSection,
  DContent, 
  DExample, 
  DHead, 
  DList, 
  DSubTitle, 
  DTitle, 
  DExampleWrong,
  DLink,
  DDivder
} from "../../styles/DocStyle";

export default function Guide() {
  return (
    <>
      <DContainer>
        <DHead>수수께끼 노트 작성 가이드</DHead>
        <DSection>
          <DTitle>1. 검색 키워드 설정</DTitle>
          <ul>
            <DList>
              <DSubTitle>• 검색 키워드 용도</DSubTitle>
              <DContent>
                검색 키워드 등록시 리들노트 사이트 내에서 해당 키워드를 통해 등록된 수수께끼를 검색할 수 있습니다.
              </DContent>
            </DList>

            <DList>
              <DSubTitle>• 키워드 설정 시 권장 사항</DSubTitle>
              <DContent>
                키워드는 가급적 실명 대신 열람 대상자의 별칭이나 특정 범위가 넓은 기관 및 소속명(학교, 동아리, 회사 이름 등)을 활용할 것을 권장합니다. 
              </DContent>
            </DList>

            <DList>
              <DSubTitle>• 키워드 설정을 생략하는 경우</DSubTitle>
              <DContent>
                키워드를 설정하지 않을 경우 수수께끼 링크 공유를 통해서만 수수께끼에 접근할 수 있으며
                이는 개인정보 노출을 최소화할 수 있는 가장 안전한 방법입니다.
              </DContent>
            </DList>
  
            <DList>
              <DSubTitle>• 실명 사용 시 주의사항</DSubTitle>
              <DContent>
                실명을 키워드로 사용할 경우 수수께끼 내의 다른 정보화 결합되어
                열람 대상자가 타인에게 특정될 가능성이 있습니다. 
                이로 인해 개인정보 노출 위험이 생길 수 있으므로, 실명 사용시 민감한 정보와의 연관성을 최소화 하세요.
              </DContent>
            </DList>

            
          </ul>
        </DSection>

        <DDivder></DDivder>

        <DSection>
          <DTitle>2. 수수께끼 규칙</DTitle>
          <ul>
            <DList>
              <p>• 이전 질문을 해결한 사용자에게만 다음 질문이 공개됩니다.</p>
            </DList>

            <DList>
              <p>
                • 모든 질문이 최초로 해결되면 해당 게시물이 비공개로 전환됩니다. 게시물이 비공개로 전환되면, 
                모든 질문을 해결한 사용자 이외의 모든 사용자들은 더이상 해당 수수께끼를 검색하거나 풀이를 진행할 수 없습니다.
              </p>
            </DList>

            <DList>
              <p>• 모든 질문을 최초로 해결한 한명의 사용자만 노트 내용을 확인할 수 있습니다.</p>
            </DList>
          </ul>
        </DSection>
      
        <DDivder></DDivder>

        <DSection>
          <DTitle>3. 수수께끼 작성 팁</DTitle>
          <ul>
            <DList>
              <DSubTitle>• 기억이나 상징을 활용하기</DSubTitle>
              <DContent>
                질문은 질문 작성자와 열람 대상자만 아는 기억, 상징, 은어 등을 바탕으로 작성하는 것을 권장합니다. 
                이는 제 3자가 질문에 대한 답을 유추하기 어렵게 만들어, 열람 대상자만 정답을 맞출 가능성을 높여줍니다.
              </DContent>
              <DExample>그날 대화 중에 우리가 계속 헷갈렸던 단어는? (O)</DExample>
            </DList>
  
            <DList>
              <DSubTitle>• 첫 번째 질문을 신중하게 작성하기</DSubTitle>
              <DContent>
                첫 번째 질문은 게시물에 접근한 사용자라면 누구나 확인하고 풀이를 시도할 수 있기 때문에, 
                구체적인 힌트를 제공하는 질문은 피하는 것이 좋습니다. 
                다소 모호 하면서도 질문 작성자와 열람 대상자만 이해할 수 있는 단서를 활용하여 첫 번째 질문을 설정하세요.
              </DContent>
              <DExample>작년 여름 내가 여행 선물로 받은 것은?  (O)</DExample>
            </DList>

            <DList>
              <DSubTitle>• 질문을 여러개 만들기</DSubTitle>
              <DContent>
                이전 질문을 해결한 사용자에게만 다음 질문이 공개됨으로, 질문을 많이 만들수록 의도하지 않은 제 3자의 접근을 막을 수 있습니다.
              </DContent>
            </DList>

            <DList>
              <DSubTitle>• 힌트 기능 활용하기</DSubTitle>
              <DContent>
                정답의 형식이 여러가지가 가능할 경우 힌트를 통해 예시문을 작성해주세요.
              </DContent>
              <DExample>약속을 잡으면 항상 만나던 장소는?</DExample>
              <DExample>예{')'} 강남역</DExample>
            </DList>

            <DList>
              <DSubTitle>• 논리적 질문은 피하기</DSubTitle>
              <DContent>
                누구나 쉽게 유추할 수 있는 정보나, 논리적으로 추론 가능한 질문은 피해주세요.
              </DContent>
              <DExampleWrong>내 핸드폰 번호 뒷자리 4개의 합은? (X)</DExampleWrong>
            </DList>

            <DList>
              <DSubTitle>• 질문, 힌트 및 정답 속 민감한 정보는 지양하기</DSubTitle>
              <DContent>
                질문, 힌트 또는 정답에 민감한 개인정보(이름, 연락처, 주소)를 포함하지 않도록 주의하세요. 
                이러한 정보는 제3자에 의해 개인 식별 위험을 높일 수 있습니다.
              </DContent>
              <DExampleWrong>우리집 주소 우편번호는? (X)</DExampleWrong>
              <DExample>네가 키우는 반려동물 이름은? (O)</DExample>
            </DList>

            <DList>
              <DSubTitle>• 정답의 가짓수가 적은 질문은 지양하기</DSubTitle>
              <DContent>
                정답이 명확히 한정된 질문은 제3자가 답을 맞출 가능성을 높일 수 있습니다.
                정답의 가지수를 늘리거나 두 사람만 아는 디테일을 추가해주세요.
              </DContent>
              <DExampleWrong>우리 회사 첫 프로젝트 회의 날짜는? (X)</DExampleWrong>
              <DExample>첫 회의에서 우리가 다뤘던 핵심 아이디어는? (O)</DExample>
            </DList>
          </ul>
        </DSection>

        <DDivder></DDivder>
       
        <DSection>
          <DTitle>4. 게시물 수정 제한사항</DTitle>
          <DContent>
            이미 열람된 게시물의 내용이 변경될 경우, 열람자가 경험한 정보의 신뢰성과 고유성이 훼손될 수 있어 
            이를 방지하기 위해  모든 질문이 해결되어 비공개로 전환된 게시물은 수정할 수 없습니다. 
          </DContent>
        </DSection>

        <DDivder></DDivder>

        <DSection>
          <DTitle>5. 수수께끼 진행 상황 모니터링</DTitle>
          <DContent>
            게시물 생성자는 자신이 작성한 게시물의 질문 풀이 진행 상황을 상세 페이지에서 확인할 수 있습니다. 
            상세 페이지에서 제공되는 정보는 다음과 같습니다.
          </DContent>
          <ul>
            <DList>
              <DSubTitle>• 질문 풀이 진행 상황</DSubTitle>
              <DContent>
                자신의 수수께끼에 대해 가장 높은 풀이 진행률(최대 몆 번째 질문까지 해결되었는지)을 확인할 수 있습니다.
              </DContent>
            </DList>

            <DList>
              <DSubTitle>• 진행 상황 업데이트 시간</DSubTitle>
              <DContent>
                자신의 수수께끼에 대해 가장 높은 풀이 진행률의 최근 업데이트 시간을 확인할 수 있습니다.
              </DContent>
            </DList>

            <DList>
              <DSubTitle>• 열람자 별명</DSubTitle>
              <DContent>
                모든 질문을 해결한 사용자는 게시물 생성자가 확인할 수 있는 열람자 별명을 설정할 수 있습니다.<br></br>
                게시물 생성자는 열람자 별명 이외 열람자의 정보는 알 수 없습니다. 
              </DContent>
            </DList>
          </ul>
        </DSection>

        <DDivder></DDivder>

        <DSection>
          <DTitle>6. 열람 완료 게시물 정보 공개 안내</DTitle>
          <DContent>
            <DLink href="https://riddlenote.com" target="_blank" rel="noopener noreferrer">홈 화면</DLink>
            에서 열람이 완료된 게시물의 일부 정보가 일시적으로 노출될 수 있습니다. 
            최근 열람된 10개의 게시물을 리스트 형태로 보여주게 되며
            노출되는 정보는 상세 내용을 알 수 없도록 최소한으로 제한하며, 게시물에 접근할 수 없습니다.<br></br>
            공개되는 정보는 다음과 같습니다.
          </DContent>

          <ul>
            <DList>
              <DSubTitle>•수수께끼 제목</DSubTitle>
              <DContent>
                게시물 제목은 처음 두 글자만 노출되며 나머지는 글자 수에 관계없이 3개의 별표(*)로 음영처리 됩니다
              </DContent>
              <DExample>매화꽃이 필 무렵 --{'>'} 매화***</DExample>
              <DExample>매화꽃 --{'>'} 매화***</DExample>
            </DList>

            <DList>
              <DSubTitle>• 작성자명, 조회수, 생성일, 라벨, 열람 여부</DSubTitle>
              <DContent>
                해당 정보는 음영처리 없이 노출됩니다.<br></br>
                작성자명은 이메일 계정 앞 3자리와 3개의 별표(*)로 음영처리된 문자열입니다.
              </DContent>
            </DList>
          </ul>
        </DSection>     
      </DContainer>
      <AppFooter />
    </>
  );
}

