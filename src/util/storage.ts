interface IStorageData<T> {
  value: T;
  timeStamp: number;
}

type TSaveItemInSession = 'success' | 'security' | 'unknown';

// 검색 결과, 판도라 표지의 데이터 신선도. 이 기간동안은 세션스토리지 데이터를 이용함
const EXPIRATION_TIME = 1 * 60 * 1000;

export const saveInSession = <T>(key: string, data: T): TSaveItemInSession => {
  try {
    const now = Date.now();
    const storageData: IStorageData<T> = {
      value: data,
      timeStamp: now
    };

    sessionStorage.setItem(key, JSON.stringify(storageData));
    return 'success';
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'QuotaExceededError') {
        sessionStorage.clear();
      }
      if (error.name === "SecurityError") {
        return 'security';
      }
      return 'unknown';
    }
    return 'unknown';
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
