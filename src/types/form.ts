// form title 타입
export type TFormSubject = 'cover' | 'keywords' | 'riddles' | 'post' | 'preview';

// 표지 타입
export interface ICover {
  title: string;
  description: string;
}

// 키워드 타입
export type TKeywords = string[];

// 수수께끼 타입
export interface IRiddle {
  id: string;
  isQuestionValid: boolean;
  isHintValid: boolean;
  isAnswerValid: boolean;
  question: string;
  hint: string;
  answer: string;
}

// 노트 타입
export type TNote = string;
