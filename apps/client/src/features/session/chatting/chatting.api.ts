import axios from 'axios';

import { GetChattingListResponseDTO } from '@/features/session/chatting/chatting.dto';

export const getChattingList = (
  token: string,
  sessionId: string,
  chatId?: number,
) =>
  axios
    .get<GetChattingListResponseDTO>(
      `/api/chats${chatId ? `/${chatId}` : ''}`,
      { params: { token, sessionId } },
    )
    .then((res) => res.data);
