import { 
  ReactNode, 
  createContext, 
  useCallback, 
  useEffect, 
  useMemo, 
  useState 
} from "react";

// 로딩 상태를 관리할 인터페이스 정의
export interface ILoadingContext {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

interface ILoadingProviderProps {
  children: ReactNode;
}

export const LoadingContext = createContext<ILoadingContext | undefined>(undefined);

export function LoadingProvider({ children }: ILoadingProviderProps) {
  const [isFetching, setIsFetching] = useState<boolean>(false); //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const LOADING_DELAY = 1000;
  
  const startLoading = useCallback(() => {
    setIsFetching(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsFetching(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let delayTimeout: ReturnType<typeof setTimeout> | null = null;

    if (isFetching) {
      delayTimeout = setTimeout(() => {
        setIsLoading(true);
      }, LOADING_DELAY);
    } else {
      setIsLoading(false);
    }

    return () => {
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
    };
  }, [isFetching, LOADING_DELAY]);

  const context = useMemo(() => ({
    isLoading,
    startLoading,
    stopLoading
  }), [isLoading, startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={context}>
      { children }
    </LoadingContext.Provider>
  );
}
