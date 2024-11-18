import axios from 'axios';

export const getQuestions = (sessionId: string, userToken?: string) =>
  axios.get('/api/questions', { params: { sessionId, userToken } });
