
function required(key: string, defaultValue?: string | number): string {
  const value = import.meta.env[`VITE_${key}`] || defaultValue;
  if (value === null || value === undefined) {
    throw new Error('env key값 또는 defaultValue 재확인 요망');
  }

  return value as string;
}

export const env = {
  url: {
    serverBaseURL: required('SERVER_BASE_URL'),
    GoogleSignIn: required('GOOGLE_SIGN_IN'),
    clientBaseURL: required('CLIENT_BASE_URL'),
  },
  restriction: {
    maxSearchLength: parseInt(required('MAX_SEARCH_LENGTH')),
  }
}
