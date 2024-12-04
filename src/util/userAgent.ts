function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isWebView() {
  return /naver/i.test(navigator.userAgent) || /kakaotalk/i.test(navigator.userAgent);
}

function openInExternalBrowserForAndroid(googleLoginUrl: string) {
  const intentUrl = `intent://${googleLoginUrl.replace('https://', '')}#Intent;scheme=https;package=com.android.chrome;end;`;
  window.location.href = intentUrl;
}

function openInExternalBrowserForIOS(googleLoginUrl: string) {
  window.open(googleLoginUrl, '_blank');
}

export function startLogin(googleLoginUrl: string) {
  if (isAndroid() && isWebView()) {
    alert('안전한 Google 로그인을 위해 외부 브라우저로 이동합니다.');
    openInExternalBrowserForAndroid(googleLoginUrl);
  } else if (isIOS() && isWebView()) {
    alert('안전한 Google 로그인을 위해 외부 브라우저로 이동합니다.');
    openInExternalBrowserForIOS(googleLoginUrl);
  } else {
    window.location.href = googleLoginUrl;
  }
}
