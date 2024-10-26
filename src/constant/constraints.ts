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
  maxLength: 20,
  default: '익명'
});

export const PANDORA_FORM = Object.freeze({
  // 작성자
  minWriterLength: 1,
  maxWriterLength: 15,
  defaultWriter: '익명',

  // 제목
  minTitleLength: 3,
  maxTitleLength: 60,

  // 설명
  minDescriptionLength: 3,
  maxDescriptionLength: 300,

  // 키워드
  minTotalKeywords: 0,
  maxTotalKeywords: 10,
  minKeywordLength: 1,
  maxKeywordLength: 30,

  // 문제
  minTotalProblems: 1,
  maxTotalProblems: 10,
  minQuestionLength: 3,
  maxQuestionLength: 60,
  minHintLegnth: 1,
  maxHintLegnth: 32,
  defaultHint: '힌트 없음',
  minAnswerLength: 1,
  maxAnswerLength: 32,

  // 노트
  minNoteLength: 3,
  maxNoteLength: 1000
});
