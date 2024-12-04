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
  console.log(`webview? : ${isWebView()}`);
  if (isAndroid() && isWebView()) {
    openInExternalBrowserForAndroid(googleLoginUrl);
  } else if (isIOS() && isWebView()) {
    openInExternalBrowserForIOS(googleLoginUrl);
  } else {
    window.location.href = googleLoginUrl;
  }
}
