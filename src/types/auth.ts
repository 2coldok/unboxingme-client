export interface IProfile {
  displayName: string;
  email: string;
  photo: string;
  nickname: string | null;
}

export interface IMe {
  isTokenValid: boolean;
}
