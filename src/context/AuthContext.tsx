import { 
  ReactNode, 
  createContext, 
  useCallback, 
  useEffect, 
  useMemo, 
  useState 
} from "react";
import { IAuthService } from "../service/AuthService";
import { IProfile } from "../types/auth";
import { HttpError } from "../network/HttpClient";

export interface IAuthContext {
  profile: IProfile | null | undefined;
  login: (redirectUri: string) => void;
  logout: () => Promise<void>;
  getTokenStatus: () => Promise<'valid' | 'invalid' | 'none'>;
}

interface IAuthProviderProps {
  authService: IAuthService;
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ authService, children }: IAuthProviderProps) {
  const [profile, setProfile] = useState<IProfile | null | undefined>(undefined);
  
  useEffect(() => { 
    const fetchProfile = async () => {
      console.log('*****AuthContext에서 fetchProfile 실행됨*****');
      try {
        const data = await authService.getProfile();
        console.log('프로필', data.payload);
        setProfile(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          setProfile(null);
          console.error(error);
        }
      }
    }
    
    fetchProfile();
  }, [authService]);

  // 구글 로그인 완료후 서버에서 redirect 시킴으로 useEffect가 다시 터져 profile을 세팅함
  const login = useCallback((redirectUri: string) => {
    authService.login(redirectUri);
  }, [authService]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      if (error instanceof HttpError) {
        alert(error.message);
      }
    } finally {
      setProfile(null);
    }
  }, [authService]);

  const getTokenStatus = useCallback(async () => {
    try {
      const data = await authService.me();
      const isTokenValid = data.payload.isTokenValid;
      if (!isTokenValid) {
        setProfile(null);
        return 'invalid';
      }
      return 'valid';
    } catch (error) {
      // 토큰이 존재하지 않음
      setProfile(null);
      return 'none';
    }
  }, [authService]);

  const context = useMemo(() => ({
    profile,
    login,
    logout,
    getTokenStatus
  }), [profile, login, logout, getTokenStatus]);

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}
