import { useContext } from "react";
import { AuthContext, IAuthContext } from "../context/AuthContext";

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 훅이 AuthProvider 범위 밖에서 사용됨');
  }

  return context;
}
