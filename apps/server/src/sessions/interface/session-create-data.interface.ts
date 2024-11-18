import { CreateSessionDto } from '@sessions/dto/create-session.dto';

export interface SessionCreateData extends CreateSessionDto {
  expiredAt: Date;
  user: {
    connect: {
      userId: number;
    };
  };
}
