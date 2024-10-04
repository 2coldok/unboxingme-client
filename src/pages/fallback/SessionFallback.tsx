import { useLocation } from "react-router-dom";

export default function SessionFallback() {
  const location = useLocation();
  const type = location.state?.type;

  if (type === 'security') {
    return (
      <div>
        <p>프라이빗 브라우저 모드 또는 크로스 도메인 요청을 지원하지 않습니다.</p>
      </div>
    )
  }

  return (
    <div>
      <p>session storage 오류</p>
    </div>
  );
}


