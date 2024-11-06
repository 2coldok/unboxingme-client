interface IStorageData<T> {
  value: T;
  timeStamp: number;
}

// 검색 결과, 판도라 표지의 데이터 신선도. 이 기간동안은 세션스토리지 데이터를 이용함
const EXPIRATION_TIME = 5 * 60 * 1000;

export const saveInSession = <T>(key: string, data: T): void => {
  try {
    console.log(key);
    console.log(data);
    const now = Date.now();
    const storageData: IStorageData<T> = {
      value: data,
      timeStamp: now
    };

    sessionStorage.setItem(key, JSON.stringify(storageData));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.log('seesion error');
      sessionStorage.clear();
    }
    // 에러 다이렉트 만들기
  }
}

export const getInSession = <T>(key: string): T | null => {
  try {
    const storedData = sessionStorage.getItem(key);
    
    if (!storedData) {
      return null;
    }
    
    const parsedData: IStorageData<T> = JSON.parse(storedData);
    const now = Date.now();
    if (now - parsedData.timeStamp > EXPIRATION_TIME) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsedData.value;
  } catch (error) {
    return null;
  }
}
