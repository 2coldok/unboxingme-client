export interface IProfile {
  displayName: string;
  email: string;
  photo: string;
}

export interface IMe {
  isTokenValid: boolean;
}

export interface ICSRF {
  csrfToken: string;
}
