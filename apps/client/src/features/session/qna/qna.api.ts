import axios from 'axios';

import {
  DeleteQuestionRequestDTO,
  DeleteQuestionRequestSchema,
  DeleteReplyRequestSchema,
  GetQuestionsRequestDTO,
  GetQuestionsRequestSchema,
  GetQuestionsResponseDTO,
  GetQuestionsResponseSchema,
  PatchQuestionBodyRequestDTO,
  PatchQuestionBodyRequestSchema,
  PatchQuestionBodyResponseDTO,
  PatchQuestionBodyResponseSchema,
  PatchQuestionClosedRequestDTO,
  PatchQuestionClosedRequestSchema,
  PatchQuestionClosedResponseDTO,
  PatchQuestionClosedResponseSchema,
  PatchQuestionPinnedRequestDTO,
  PatchQuestionPinnedRequestSchema,
  PatchQuestionPinnedResponseDTO,
  PatchQuestionPinnedResponseSchema,
  PatchReplyBodyRequestDTO,
  PatchReplyBodyRequestSchema,
  PatchReplyBodyResponseDTO,
  PatchReplyBodyResponseSchema,
  PostQuestionLikeRequestDTO,
  PostQuestionLikeRequestSchema,
  PostQuestionLikeResponseDTO,
  PostQuestionLikeResponseSchema,
  PostQuestionRequestDTO,
  PostQuestionRequestSchema,
  PostQuestionResponseDTO,
  PostQuestionResponseSchema,
  PostReplyRequestDTO,
  PostReplyRequestSchema,
  PostReplyResponseDTO,
  PostReplyResponseSchema,
} from '@/features/session/qna/qna.dto';

export const getQuestions = (params: GetQuestionsRequestDTO) =>
  axios
    .get<GetQuestionsResponseDTO>('/api/questions', {
      params: GetQuestionsRequestSchema.parse(params),
    })
    .then((res) => GetQuestionsResponseSchema.parse(res.data));

export const postQuestion = (body: PostQuestionRequestDTO) =>
  axios
    .post<PostQuestionResponseDTO>(
      '/api/questions',
      PostQuestionRequestSchema.parse(body),
    )
    .then((res) => PostQuestionResponseSchema.parse(res.data));

export const patchQuestionBody = (
  questionId: number,
  body: PatchQuestionBodyRequestDTO,
) =>
  axios
    .patch<PatchQuestionBodyResponseDTO>(
      `/api/questions/${questionId}/body`,
      PatchQuestionBodyRequestSchema.parse(body),
    )
    .then((res) => PatchQuestionBodyResponseSchema.parse(res.data));

export const deleteQuestion = (
  questionId: number,
  params: DeleteQuestionRequestDTO,
) =>
  axios
    .delete(`/api/questions/${questionId}`, {
      params: DeleteQuestionRequestSchema.parse(params),
    })
    .then((res) => res.data);

export const patchQuestionPinned = (
  questionId: number,
  body: PatchQuestionPinnedRequestDTO,
) =>
  axios
    .patch<PatchQuestionPinnedResponseDTO>(
      `/api/questions/${questionId}/pinned`,
      PatchQuestionPinnedRequestSchema.parse(body),
    )
    .then((res) => PatchQuestionPinnedResponseSchema.parse(res.data));

export const patchQuestionClosed = (
  questionId: number,
  body: PatchQuestionClosedRequestDTO,
) =>
  axios
    .patch<PatchQuestionClosedResponseDTO>(
      `/api/questions/${questionId}/closed`,
      PatchQuestionClosedRequestSchema.parse(body),
    )
    .then((res) => PatchQuestionClosedResponseSchema.parse(res.data));

export const postQuestionLike = (
  questionId: number,
  body: PostQuestionLikeRequestDTO,
) =>
  axios
    .post<PostQuestionLikeResponseDTO>(
      `/api/questions/${questionId}/likes`,
      PostQuestionLikeRequestSchema.parse(body),
    )
    .then((res) => PostQuestionLikeResponseSchema.parse(res.data));

export const postReply = (body: PostReplyRequestDTO) =>
  axios
    .post<PostReplyResponseDTO>(
      `/api/replies`,
      PostReplyRequestSchema.parse(body),
    )
    .then((res) => PostReplyResponseSchema.parse(res.data));

export const patchReplyBody = (
  replyId: number,
  body: PatchReplyBodyRequestDTO,
) =>
  axios
    .patch<PatchReplyBodyResponseDTO>(
      `/api/replies/${replyId}/body`,
      PatchReplyBodyRequestSchema.parse(body),
    )
    .then((res) => PatchReplyBodyResponseSchema.parse(res.data));

export const deleteReply = (
  replyId: number,
  params: DeleteQuestionRequestDTO,
) =>
  axios
    .delete(`/api/replies/${replyId}`, {
      params: DeleteReplyRequestSchema.parse(params),
    })
    .then((res) => res.data);

export const postReplyLike = (
  replyId: number,
  body: PostQuestionLikeRequestDTO,
) =>
  axios
    .post<PostQuestionLikeResponseDTO>(
      `/api/replies/${replyId}/likes`,
      PostQuestionLikeRequestSchema.parse(body),
    )
    .then((res) => PostQuestionLikeResponseSchema.parse(res.data));
