import { GetChattingListResponseDTO } from '@/features/session/chatting/chatting.dto';
import axios from 'axios';

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
