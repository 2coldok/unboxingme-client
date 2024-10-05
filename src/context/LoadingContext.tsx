import { 
  ReactNode, 
  createContext, 
  useCallback, 
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

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
