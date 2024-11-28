import AppFooter from "../../components/AppFooter";
import { 
  DContainer, 
  DSection,
  DContent, 
  DHead, 
  DTitle,
  DSubTitle,
  DList,
  DEmail
} from "../../styles/DocStyle";

export default function PrivacyPolicy() {
  return (
    <>
      <DContainer>
        <DHead>개인정보처리방침</DHead>
  
        <DSection>
          <DTitle>1. 목적</DTitle>
          <DContent>
          리들노트는 사용자의 개인정보를 소중히 여기며, 이를 안전하게 보호하기 위해 최선을 다하고 있습니다.
          본 방침은 “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 과 “개인정보 보호법” 등 관련 법령을 준수하며,
          사용자 개인정보의 수집, 이용, 관리 방식에 대해 설명하고 있습니다.
          리들노트는 개인정보보호와 관련 법률의 개정이나 내부 정책 변화에 따라 본 방침을 수정할 수 있으며,
          변경 사항은 공지사항을 통해 안내드릴 예정입니다.
          사용자는 서비스 이용 시 정기적으로 본 방침을 확인하여 최신 정보를 숙지하시기 바랍니다.
          </DContent>
        </DSection>
  
        <DSection>
          <DTitle>2. 개인정보 수집 동의</DTitle>
          <DContent>
            사용자는 리들노트에 구글계정을 통해 로그인 함으로써
            서비스 이용을 위해 필요한 개인정보 수집 및 이용에 동의한것으로 간주합니다.
          </DContent>
        </DSection>
  
        <DSection>
          <DTitle>3. 개인정보 수집 항목, 방법 및 목적</DTitle>
          <ul>
            <DList>
              <DSubTitle>(1) Google 계정의 표시 이름, 프로필 아바타, 이메일 주소, 고유 식별자</DSubTitle>
              <DContent>
                Google OAuth 인증 과정을 통해 정보를 수집하며 리들노트 서비스를 이용하기 위한 필수 수집 항목 입니다.
                각각은 웹 화면에 표시, 사용자 경험 개선, 사용자 인증 및 식별 용도로 사용됩니다.
              </DContent>
            </DList>
  
            <DList>
              <DSubTitle>(2) IP주소, 운영 체제 버전, 웹 브라우저 정보</DSubTitle>
              <DContent>
                비정상적인 접근 및 서비스 악용을 방지하기 위해 서비스 이용 중 선택적으로 수집될 수 있습니다.
              </DContent>
            </DList>
          </ul>
        </DSection>
  
        <DSection>
          <DTitle>4. 수집하는 개인정보의 보유 및 이용 기간</DTitle>
          <DContent>리들노트 회원 가입 시점부터 회원 탈퇴 시점까지 사용자의 정보를 보관 및 이용합니다</DContent>
        </DSection>
  
        <DSection>
          <DTitle>5. 개인정보 파기절차 및 방법</DTitle>
          <DContent>
            리들노트는 사용자의 개인정보는 전자적 파일 형태로만 보관되며,
            개인정보의 수집 및 이용목적이 달성되면 기록을 재생할 수 없는 기술적 방법을 사용하여 영구 삭제합니다.
          </DContent>
        </DSection>
  
        <DSection>
          <DTitle>6. 회원 탈퇴</DTitle>
          <DContent>
          리들노트는 사용자가 언제든지 회원 탈퇴를 요청할 권리를 보장합니다.<br></br>
          회원 탈퇴를 원하는 경우, 이메일을 통해 요청시 사용자 인증 절차를 거친 후 탈퇴 처리를 진행합니다.<br></br>
          회원 탈퇴가 완료되면 관련 개인정보는 내부 방침 및 법령에 따라 안전하게 삭제됩니다.
          부정행위 또는 제재 기록이 있는 경우, 회원 탈퇴 이후에도 사용자를 식별할 수 있는 최소한의 정보를 최대 1년간 보관할 수 있습니다.
          </DContent>
        </DSection>
        
        <DSection>
          <DTitle>7. 아동의 개인정보보호</DTitle>
          <DContent>
            리들노트는 만14세 미만 아동의 개인정보 보호를 위하여 만 14세 이상의 사용자에 한하여 회원가입을 허용합니다. 
            만 14세 미만의 아동은 이메일을 통해 법정대리인의 동의를 받아야 하며, 
            이 경우 해당 법정 대리인의 추가 정보를 수집할 수 있습니다.
          </DContent>
        </DSection>
  
        <DSection>
          <DTitle>8. 이용자의 의무</DTitle>
          <ul>
            <DList>
              <p>• 이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.</p>
            </DList>
            <DList>
              <p>• 이용자는 개인정보와 관련한 계정의 보안을 유지할 책임이 있습니다. 특히 구성원 내의 PC가 아닌 외부 공공 PC에서 서비스에 로그인시 각별히 유의하셔야 합니다</p>
            </DList>
            <DList>
              <p>• 타인의 개인정보를 도용하여 서비스를 이용할 경우 관련 개인정보보호 법령에 의해 처벌받을 수 있습니다.</p>
            </DList>
          </ul>
        </DSection>
  
        <DSection>
          <DTitle>9. 리들노트 이메일</DTitle>
          <DContent>
            <p>• 이메일: <DEmail>info@riddlenote.com</DEmail></p>
          </DContent>
        </DSection>
      </DContainer>
      <AppFooter />
    </>
  );
}
