import { useParams } from '@tanstack/react-router';

function QnA() {
  const sessionId = useParams({
    from: '/session/$sessionId',
    select: (params) => params.sessionId,
    strict: true,
  });

  return <>SessionId: {sessionId}</>;
}

export default QnA;
