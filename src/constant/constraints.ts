export const SEARCH_KEYWORD = Object.freeze({
  minLength: 1,
  maxLength: 30
});

export const SUBMIT_ANSWER = Object.freeze({
  minAnswerLength: 1,
  maxAnswerLength: 32
});

export const SOLVERALIAS = Object.freeze({
  minLength: 1,
  maxLength: 40,
  default: '익명'
});

export const PANDORA_FORM = Object.freeze({
  // 작성자
  minWriterLength: 2,
  maxWriterLength: 15,
  defaultWriter: '익명',

  // 제목
  minTitleLength: 5,
  maxTitleLength: 60,

  // 설명
  minDescriptionLength: 5,
  maxDescriptionLength: 300,

  // 키워드
  minTotalKeywords: 0,
  maxTotalKeywords: 10,
  minKeywordLength: 1,
  maxKeywordLength: 30,

  // 문제
  minTotalProblems: 1,
  maxTotalProblems: 10,
  minQuestionLength: 1,
  maxQuestionLength: 100,
  minHintLegnth: 0,
  maxHintLegnth: 32,
  minAnswerLength: 1,
  maxAnswerLength: 32,

  // 노트
  minNoteLength: 5,
  maxNoteLength: 1000
});
