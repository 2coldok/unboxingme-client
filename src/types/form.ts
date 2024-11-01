export type TFormSubject = 'cover' | 'keywords' | 'riddles' | 'post' | 'preview';

export interface ICover {
  writer: string;
  title: string;
  description: string;
}

export type TKeywords = string[];

export interface IRiddle {
  id: string;
  isQuestionValid: boolean;
  isAnswerValid: boolean;
  question: string;
  hint: string;
  answer: string;
}

export type TPost = string;
