import { useContext } from "react";
import { LoadingContext, ILoadingContext } from "../context/LoadingContext";

export function useLoading(): ILoadingContext {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading 훅이 LoadingProvider 범위 밖에서 사용됨');
  }

  return context;
}
