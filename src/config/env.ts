function getEnv(key: string): string {
  return import.meta.env[key];
}

export const env = {
  url: {
    serverBaseURL: getEnv('VITE_SERVER_BASE_URL'),
    clientBaseURL: getEnv('VITE_CLIENT_BASE_URL'),
    googleSignIn: getEnv('VITE_GOOGLE_SIGN_IN'),
  },
  appStatus: getEnv('VITE_APP_STATUS')
};
