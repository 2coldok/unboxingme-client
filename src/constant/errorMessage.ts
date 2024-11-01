import { PANDORA_FORM } from './constraints';

export const FORM_LENGTH_ERROR_MESSAGE = Object.freeze({
  writer: `${PANDORA_FORM.minWriterLength}글자 이상 입력해주세요.`,
  title: `${PANDORA_FORM.minTitleLength}글자 이상 입력해주세요.`,
  description: `${PANDORA_FORM.minDescriptionLength}글자 이상 입력해주세요.`,
  keywords: `키워드는 최대 ${PANDORA_FORM.maxTotalKeywords}개 까지 등록할 수 있습니다.`,
  question: `질문을 입력해주세요`,
  answer: `정답을 입력해주세요`,
  totalProblems: `질문은 최대 ${PANDORA_FORM.maxTotalProblems}개 까지 등록할 수 있습니다.`,
  note: `노트 내용을 입력해주세요`
});
