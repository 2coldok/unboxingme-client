function getEnv(key: string): string {
  return import.meta.env[`VITE_${key}`];
}

export const env = {
  url: {
    serverBaseURL: getEnv('SERVER_BASE_URL'),
    googleSignIn: getEnv('GOOGLE_SIGN_IN')
  },
  restriction: {
    
  }
}
