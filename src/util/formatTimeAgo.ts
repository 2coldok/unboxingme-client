export function formatTimeAgo(createdAt: string): string {
  const createdTime = new Date(createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - createdTime.getTime()) / 1000);

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInSeconds < 60) {
    return '방금전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분전`;
  } else if (diffInHours < 11) {
    return `${diffInHours}시간전`;
  } else {
    const year = createdTime.getFullYear();
    const month = (createdTime.getMonth() + 1).toString().padStart(2, '0');
    const day = createdTime.getDate().toString().padStart(2, '0');
    const hours = createdTime.getHours().toString().padStart(2, '0');
    const minutes = createdTime.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }
}
// TODO
// 서버시간 UTC 고려하기. 클라 현재 컴 시간 시차 적용
