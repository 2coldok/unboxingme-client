import { 
  ReactNode, 
  createContext, 
  useCallback, 
  useEffect, 
  useMemo, 
  useState 
} from "react";
import { IAuthService } from "../service/AuthService";

interface IProfile {
  displayName: string,
  photo: string;
}

export interface IAuthContext {
  profile: IProfile | undefined;
  // getProfile(): Promise<IProfile>;
  signOut: () => Promise<void>;
}

interface IAuthProviderProps {
  authService: IAuthService;
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ authService, children }: IAuthProviderProps) {
  const [profile, setProfile] = useState<IProfile | undefined>(undefined);

  useEffect(() => {
    authService.getProfile().then((profile) => setProfile(profile)).catch((error) => {
      if (error instanceof Error) return console.log(error.message);
      console.log(error);
    });
  }, [authService]);

  const signOut = useCallback(
    async () => 
      authService.signOut().then(() => setProfile(undefined)).catch((error) => {
        if (error instanceof Error) return console.log(error.message);
        console.log(error);
      }),
    [authService]  
  );

  const context = useMemo(() => ({
    profile,
    signOut,
  }), [profile, signOut]);

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}
