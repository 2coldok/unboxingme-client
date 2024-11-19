export const SEARCH_KEYWORD = Object.freeze({
  minLength: 1,
  maxLength: 30
});

export const SUBMIT_ANSWER = Object.freeze({
  maxAnswerLength: 32
});

export const SOLVERALIAS = Object.freeze({
  maxLength: 40,
});

export const PANDORA_FORM = Object.freeze({
  // 키워드
  maxTotalKeywords: 10,
  maxKeywordLength: 30,

  // 제목
  minTitleLength: 5,
  maxTitleLength: 60,

  // 설명
  maxDescriptionLength: 300,

  // 수수께끼
  minQuestionLength: 1,
  minAnswerLength: 1,
  minTotalProblems: 1,
  maxTotalProblems: 10,
  
  maxQuestionLength: 100,
  maxHintLegnth: 32,
  maxAnswerLength: 32,

  // 노트
  minNoteLength: 1,
  maxNoteLength: 1000
});
