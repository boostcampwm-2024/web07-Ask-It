import axios from 'axios';

import {
  DeleteQuestionRequestDTO,
  GetQuestionsRequestDTO,
  GetQuestionsResponseDTO,
  PatchQuestionBodyRequestDTO,
  PatchQuestionBodyResponseDTO,
  PatchQuestionClosedRequestDTO,
  PatchQuestionClosedResponseDTO,
  PatchQuestionPinnedRequestDTO,
  PatchQuestionPinnedResponseDTO,
  PatchReplyBodyRequestDTO,
  PatchReplyBodyResponseDTO,
  PostQuestionLikeRequestDTO,
  PostQuestionLikeResponseDTO,
  PostQuestionRequestDTO,
  PostQuestionResponseDTO,
  PostReplyRequestDTO,
  PostReplyResponseDTO,
} from '@/features/session/qna/qna.dto';

export const getQuestions = ({ sessionId, token }: GetQuestionsRequestDTO) =>
  axios
    .get<GetQuestionsResponseDTO>('/api/questions', {
      params: { sessionId, token },
    })
    .then((res) => res.data);

export const postQuestion = (body: PostQuestionRequestDTO) =>
  axios
    .post<PostQuestionResponseDTO>(`/api/questions`, body)
    .then((res) => res.data);

export const patchQuestionBody = (
  questionId: number,
  body: PatchQuestionBodyRequestDTO,
) =>
  axios
    .patch<PatchQuestionBodyResponseDTO>(
      `/api/questions/${questionId}/body`,
      body,
    )
    .then((res) => res.data);

export const deleteQuestion = (
  questionId: number,
  { sessionId, token }: DeleteQuestionRequestDTO,
) =>
  axios
    .delete(`/api/questions/${questionId}`, {
      params: {
        sessionId,
        token,
      },
    })
    .then((res) => res.data);

export const patchQuestionPinned = (
  questionId: number,
  body: PatchQuestionPinnedRequestDTO,
) =>
  axios
    .patch<PatchQuestionPinnedResponseDTO>(
      `/api/questions/${questionId}/pinned`,
      body,
    )
    .then((res) => res.data);

export const patchQuestionClosed = (
  questionId: number,
  body: PatchQuestionClosedRequestDTO,
) =>
  axios
    .patch<PatchQuestionClosedResponseDTO>(
      `/api/questions/${questionId}/closed`,
      body,
    )
    .then((res) => res.data);

export const postQuestionLike = (
  questionId: number,
  body: PostQuestionLikeRequestDTO,
) =>
  axios
    .post<PostQuestionLikeResponseDTO>(
      `/api/questions/${questionId}/likes`,
      body,
    )
    .then((res) => res.data);

export const postReply = (body: PostReplyRequestDTO) =>
  axios
    .post<PostReplyResponseDTO>(`/api/replies`, body)
    .then((res) => res.data);

export const patchReplyBody = (
  replyId: number,
  body: PatchReplyBodyRequestDTO,
) =>
  axios
    .patch<PatchReplyBodyResponseDTO>(`/api/replies/${replyId}/body`, body)
    .then((res) => res.data);

export const deleteReply = (
  replyId: number,
  { sessionId, token }: DeleteQuestionRequestDTO,
) =>
  axios
    .delete(`/api/replies/${replyId}`, {
      params: {
        sessionId,
        token,
      },
    })
    .then((res) => res.data);

export const postReplyLike = (
  replyId: number,
  body: PostQuestionLikeRequestDTO,
) =>
  axios
    .post<PostQuestionLikeResponseDTO>(`/api/replies/${replyId}/likes`, body)
    .then((res) => res.data);
