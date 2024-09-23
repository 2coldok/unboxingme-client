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
  profile: IProfile | undefined;
  login: (redirectUri: string) => void;
  logout: () => Promise<void>;
  me: () => Promise<boolean>;
}

interface IAuthProviderProps {
  authService: IAuthService;
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ authService, children }: IAuthProviderProps) {
  const [profile, setProfile] = useState<IProfile | undefined>(undefined);
  
  useEffect(() => { 
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        if (data.success && data.payload) {
          setProfile(data.payload);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          alert(error.message);
        }
      }
    }
    
    fetchProfile();
  }, [authService]);

  const logout = useCallback(
    async () => 
      authService.logout().then((data) => {
        if (data.success) {
          return alert('로그아웃 되었습니다.');
        }
      }).catch((error) => {
        if (error instanceof HttpError) {
          return alert(error.message);
        }
      }),
    [authService]  
  );

  const login = useCallback(
    (redirectUri: string) => {
      authService.login(redirectUri);
    },
    [authService]
  );

  const me = useCallback(
    async () =>
      authService.me().then((data) => {
        return data.payload.isTokenValid;
      }).catch((error) => {
        if (error instanceof HttpError) {
          alert(error.message);
        }
        return false;
      }),
    [authService]
  );

  const context = useMemo(() => ({
    profile,
    login,
    logout,
    me
  }), [profile, login, logout, me]);

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}
