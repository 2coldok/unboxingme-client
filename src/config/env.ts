function getEnv(key: string): string {
  return import.meta.env[`VITE_${key}`];
}

export const env = {
  url: {
    serverBaseURL: getEnv('VITE_SERVER_BASE_URL'),
    googleSignIn: getEnv('VITE_GOOGLE_SIGN_IN')
  },
  restriction: {
    
  }
}
