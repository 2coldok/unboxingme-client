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
  csrfToken: string | null | undefined;
  profile: IProfile | null | undefined;
  login: (redirectUri: string) => void;
  logout: () => Promise<void>;
  getTokenStatus: () => Promise<boolean>;
}

interface IAuthProviderProps {
  authService: IAuthService;
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ authService, children }: IAuthProviderProps) {
  const [profile, setProfile] = useState<IProfile | null | undefined>(undefined);
  const [csrfToken, setCsrfToken] = useState<string | null | undefined>(undefined);

  // csrf 토큰 가져오기
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const data = await authService.csrfToken();
        setCsrfToken(data.payload.csrfToken);
      } catch (error) {
        if (error instanceof HttpError) {
          setCsrfToken(null);
          if (error.statusCode === 429) {
            window.location.replace('https://riddlenote.com/rate-limit-info');
          }
        }
      }
    };
    fetchCsrfToken();
  }, [authService]);
  
  // 프로필 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        if (!data.payload) {
          return setProfile(null);
        }
        setProfile(data.payload);
      } catch (error) {
        if (error instanceof HttpError) {
          setProfile(null);
          // 토큰이 유효하지 않는데, rate limit이 된경우 특별 페이지로 이동시킨다.
          if (error.statusCode === 429) {
            window.location.replace('https://riddlenote.com/rate-limit-info');
          }
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
      if (isTokenValid) {
        return true;
      } else {
        setProfile(null);
        return false;
      }
    } catch (error) {
      setProfile(null);
      return false;
    }
  }, [authService]);

  const context = useMemo(() => ({
    csrfToken,
    profile,
    login,
    logout,
    getTokenStatus
  }), [csrfToken, profile, login, logout, getTokenStatus]);

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}
