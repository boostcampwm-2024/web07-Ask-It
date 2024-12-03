export const SOCKET_EVENTS = {
  QUESTION_CREATED: 'questionCreated',
  QUESTION_UPDATED: 'questionUpdated',
  QUESTION_DELETED: 'questionDeleted',
  QUESTION_LIKED: 'questionLiked',

  REPLY_CREATED: 'replyCreated',
  REPLY_UPDATED: 'replyUpdated',
  REPLY_DELETED: 'replyDeleted',
  REPLY_LIKED: 'replyLiked',

  CREATE_CHAT: 'createChat',
  CHAT_MESSAGE: 'chatMessage',
  CHAT_ERROR: 'chatError',

  INVALID_CONNECTION: 'invalidConnection',
  DUPLICATED_CONNECTION: 'duplicatedConnection',
  PARTICIPANT_COUNT_UPDATED: 'participantCountUpdated',

  HOST_CHANGED: 'hostChanged',
  SESSION_ENDED: 'sessionEnded',
} as const;
