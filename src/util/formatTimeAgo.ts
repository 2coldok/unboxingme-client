export function formatTimeAgo(ISO8601: string): string {
  // const createdTime = new Date(createdAt);
  // const now = new Date();
  const date = new Date(new Date(ISO8601).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInSeconds < 60) {
    return '방금전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분전`;
  } else if (diffInHours < 11) {
    return `${diffInHours}시간전`;
  } else {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }
}

export function formatTime(ISO8601: string): string {
  const date = new Date(new Date(ISO8601).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}
